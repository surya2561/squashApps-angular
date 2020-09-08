// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  key: '123456$#@$^@1ERF'
};

const port = "http://localhost:8080";

export const api = {
  signin: port + '/api/squash/users/signin',
  signUp: port + '/api/squash/users/signUp',
  getOtp: port + '/api/squash/otp/sendOtp',
  verifyOtp: port + '/api/squash/otp/verifyOtp',
  saveCompany: port + '/api/squash/company/saveCompany',
  saveAnnouncement: port + '/api/squash/announcement/saveAnnouncement',
  getAnnouncements: port + '/api/squash/announcement/getAnnouncements',
  saveComments: port + '/api/squash/announcement/saveComments',
  getComments: port + '/api/squash/announcement/getComments'
};
