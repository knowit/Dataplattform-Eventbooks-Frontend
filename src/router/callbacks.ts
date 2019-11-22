import { NavigationGuard, Route } from 'vue-router';
import { registerSigninCallback, registerSilentSigninCallback } from '@/services/authentication.service';

const hashToQueryParam = (to: Route) => 
  `${window.origin}?${to.hash.substr(1)}`;

export const signinSilentCallbackGuard: NavigationGuard = async (to, from, next) => {
  await registerSilentSigninCallback(hashToQueryParam(to));
  next();
};

export const signinCallbackGuard: NavigationGuard = async (to, from, next) => {
  next();
  try {
    await registerSigninCallback(hashToQueryParam(to));
    next({ name: 'admin' });
  } catch (error) {
    next({ name: 'signin', query: { error: (error as Error).message } });
  }  
};