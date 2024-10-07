import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'io.ionic.starter',
    appName: 'splitdumb',
    webDir: '../../dist/apps/splitdumb',
    server: {
        androidScheme: 'https',
    },
};

export default config;
