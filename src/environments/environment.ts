// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false  ,
  firebase: {
    apiKey: 'AIzaSyDCO9bkwRU9sn0Szg--aOfzLz1tUIhFNRs',
    authDomain: 'familyphotosharingapp.firebaseapp.com',
    databaseURL: 'https://familyphotosharingapp.firebaseio.com',
    projectId: 'familyphotosharingapp',
    storageBucket: 'familyphotosharingapp.appspot.com',
    messagingSenderId: '911429408168'
  }
};
