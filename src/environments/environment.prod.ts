export const AppConfig = {
  production: true,
  environment: 'PROD',
  lockfileRefresh: {
    file: 5000,
    guards: 2000,
  },
  websockets: {
    refresh: 5000,
    host: 'localhost',
    port: 8080,
    debug: false
  }
};
