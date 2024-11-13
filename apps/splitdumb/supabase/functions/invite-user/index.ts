// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

console.log(`Function "invite-user" up and running!`);

interface InvitationParams {
    email: string;
    username: string;
}

const supabaseFunctionUrl = Deno.env.get('SPLITDUMB_SUPABASE_FUNCTION_URL')!;
const supabaseUrl = Deno.env.get('SPLITDUMB_SUPABASE_FUNCTION_URL')!;
const supabaseAnonKey = Deno.env.get('SPLITDUMB_SUPABASE_ANON_KEY')!;
const supabaseServiceRoleKey = Deno.env.get('SPLITDUMB_SUPABASE_SERVICE_ROLE_KEY')!;

Deno.serve(async (req: Request) => {
    // This is needed if you're planning to invoke your function from a browser.
    if (req.method === 'OPTIONS') {
        return new Response('ok', {headers: corsHeaders});
    }

    try {
        const requestData: InvitationParams = await req.json();
        const {email, username} = requestData;
        const authHeader = req.headers.get('Authorization');

        if (authHeader) {
            const supabaseAuthClient = createClient(
                supabaseFunctionUrl ?? '',
                supabaseAnonKey ?? '',
                {global: {headers: {Authorization: authHeader}}},
            );
            const supabaseClient = createClient(
                supabaseUrl ?? '',
                supabaseAnonKey ?? '',
                {global: {headers: {Authorization: authHeader}}},
            );
            const token = authHeader.replace('Bearer ', '');
            const {data} = await supabaseAuthClient.auth.getUser(token);

            if (!data.user) {
                return new Response(JSON.stringify({error: 'User not logged in'}), {
                    headers: {...corsHeaders, 'Content-Type': 'application/json'},
                    status: 403,
                });
            }

            const supabaseAdmin = createClient(supabaseUrl ?? '', supabaseServiceRoleKey ?? '');

            const {data: invitedUser, error: invitedUserError} = await supabaseAdmin.auth.admin.inviteUserByEmail(
                email,
                {data:{username}}
            );

            if (invitedUserError) {
                console.log('invitation error:' + JSON.stringify(invitedUserError));
                throw invitedUserError;
            }

            const {error: newFriendError} = await supabaseClient
                .from('user_friends')
                .insert({
                    user_id: data.user.id,
                    friend_id: invitedUser.user.id,
                })
            ;

            if (newFriendError) {
                console.log('new friend error:' + JSON.stringify(newFriendError));
                throw newFriendError;
            }

            const response = {friend: JSON.stringify({id: invitedUser.user.id, email: invitedUser.user.email, username: username})};
            return new Response(
                JSON.stringify(response, null, 2),
                {
                    headers: {...corsHeaders, 'Content-Type': 'application/json'},
                    status: 200,
                });
        } else {
            throw new Error('Auth header unavailable');
        }
    } catch (error) {
        return new Response(
            JSON.stringify({error: error.message}),
            {
                headers: {...corsHeaders, 'Content-Type': 'application/json'},
                status: 400,
            });
    }
});
