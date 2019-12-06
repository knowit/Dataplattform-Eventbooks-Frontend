import Auth from '@aws-amplify/auth';
import { plainToClass } from 'class-transformer';
import { EventEmitter } from 'events';
import { UserManager, WebStorageStateStore, User as OidcUser } from 'oidc-client';
import { isNullOrUndefined } from 'util';
import jwtDecode from 'jwt-decode';

import User from '@/models/user.model';
import oidcConf from '@/config/auth.config';



const emitter = new EventEmitter();

const store = new WebStorageStateStore({ store: localStorage, prefix: 'eventboks.' });

const authManager = new UserManager({
  ...oidcConf,
  userStore: store
});

let renewingToken = false;

export const signIn = async () => {
  try {
    await authManager.signinRedirect(getSignInParams('Google')); // TODO: replace Google with Microsoft.
  } catch (error) {
    console.error(error);
  }
};

export const signOut = async () => {
  try {
    await authManager.removeUser();
    window.location.href = `${oidcConf.metadata.end_session_endpoint}?client_id=${oidcConf.client_id}&redirect_uri=${oidcConf.post_logout_redirect_uri}`;
  } catch (error) {
    console.error(error);
  }
};

const waitForRenew = async (): Promise<any> =>
  await new Promise((resolve, reject) => {
    emitter.on('userLoaded', resolve);
    authManager.events.addSilentRenewError(reject);
  });

export const getUserSession = async () => {
  const session = await authManager.getUser();

  if (!isNullOrUndefined(session) && !session.expired) {
    return session;
  } else if (renewingToken) {
    try {
      await waitForRenew();
    } catch (error) {
      return null;
    }
  }

  return await authManager.getUser();
};

export const getCurrentUser = async () => {
  const session = await getUserSession();

  if (isNullOrUndefined(session)) return null;

  return plainToClass(User, session.profile, { excludeExtraneousValues: true });
};

export const getToken = async () => {
  const session = await getUserSession();

  if (isNullOrUndefined(session)) throw new Error('Could not get jwtToken');

  return session.id_token;
};

export const isAuthenticated = async () => {
  const session = await getUserSession();
  return !isNullOrUndefined(session) && !session.expired;
};

const getUserFromToken = (token: string) => {
  const { email, name, family_name, given_name } = jwtDecode(token);
  return { email, name, family_name, given_name };
};

export const registerSigninCallback = async (url: string) => {
  const parsedUrl = new URL(url);
  const id_token = parsedUrl.searchParams.get('id_token');
  parsedUrl.searchParams.delete('id_token');

  await authManager.signinCallback(parsedUrl.toString());

  const session = await authManager.getUser();
  if (session) {
    const newSession = new OidcUser({
      ...session,
      id_token: id_token as string,
      // state: parsedUrl.searchParams.get('state'),
      profile: getUserFromToken(id_token as string)
    });

    await authManager.storeUser(newSession);
    emitter.emit('userLoaded');
  }
};

export const registerSilentSigninCallback = async (url: string) => {
  const parsedUrl = new URL(url);

  const id_token = parsedUrl.searchParams.get('id_token');
  parsedUrl.searchParams.delete('id_token');

  store.set('tmp_token_storage', id_token);

  await authManager.signinSilentCallback(parsedUrl.toString());
};

const setIdToken = async () => {
  const id_token = await store.get('tmp_token_storage');
  if (id_token) {
    const session = await authManager.getUser();
    if (session) {
      const newSession = new OidcUser({
        ...session,
        id_token: id_token as string,
        // state: parsedUrl.searchParams.get('state'),
        profile: getUserFromToken(id_token as string)
      });
  
      await authManager.storeUser(newSession);

      emitter.emit('userLoaded');
    }
    await store.remove('tmp_token_storage');
  }
};

authManager.events.addUserLoaded(setIdToken);

const refreshTokens = async () => {
  renewingToken = true;
  try {
    await authManager.signinSilent(getSignInParams('Google'));
  } catch (error) {
    // do something
  } finally {
    renewingToken = false;
  }
};

authManager.events.addAccessTokenExpiring(refreshTokens);
authManager.events.addAccessTokenExpired(refreshTokens);

const getSignInParams = (idp: string): object => ({
  extraQueryParams: {
    identity_provider: idp
  }
});

// const getSignOutParams = (): object => ({
//   extraQueryParams: {
    
//   }
// });
