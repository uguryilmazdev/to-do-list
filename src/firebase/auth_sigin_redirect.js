import { getAuth, signInWithRedirect } from 'firebase/auth';
import { provider } from './auth_google_provider_create';

const auth = getAuth();
signInWithRedirect(auth, provider);
