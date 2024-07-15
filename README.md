# Applications

Set of applications crafted for my needs:
 * [ProperTea](https://maxailloud.github.io/applications/propertea): Manage your properties as simple as making a tea

## Start an application

Run `npm start APPLICATION_NAME` to start the development server of the application located in the `apps/APPLICATION_NAME` folder.

## Build for production

Create a `.env.build` from the `.env` file (`cp apps/APPLICATION_NAME/.env apps/APPLICATION_NAME/.env.build`) and replace the environment variables by the one from Supabase.

Run `npm run build APPLICATION_NAME` to build the application. The build artifacts are stored in the `dist/APPLICATION_NAME` folder.

## Deploy to production

Run `npm run deploy APPLICATION_NAME` to deploy the application. It will simply push the content of the dist folder to the `gh-pages` branch.
