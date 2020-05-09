export const AppConfig = {
  production: false,
  environment: 'LOCAL',
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
