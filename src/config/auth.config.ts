import { UserManagerSettings, WebStorageStateStore } from 'oidc-client';

export default {
  authority: 'https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_OBy0Tdo8C/',
  client_id: '5rpe2d0il1u7doifu2pfqgm1o',
  response_type: 'token',
  response_mode: 'query',
  scope: 'openid profile email',
  prompt: 'login',
  automaticSilentRenew: false,
  redirect_uri: `${window.location.origin}/callback/signin`,
  silent_redirect_uri: `${window.location.origin}/callback/signin/silent`,
  post_logout_redirect_uri: `${window.location.origin}/admin/signin`,
  loadUserInfo: false,
  includeIdTokenInSilentRenew: true,
  metadata: {
    authorization_endpoint: 'https://eventboks.auth.eu-central-1.amazoncognito.com/oauth2/authorize',
    end_session_endpoint: 'https://eventboks.auth.eu-central-1.amazoncognito.com/logout',
    userinfo_endpoint: 'https://eventboks.auth.eu-central-1.amazoncognito.com/oauth2/userInfo'
  }
} as UserManagerSettings;