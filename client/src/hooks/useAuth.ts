import NEXT_ROUTES from '@/constants/routes';
import {
  SignupCredentialsDTO,
  signupWithEmailAndPassword,
} from '@/features/auth';
import {
  LoginCredentialsDTO,
  loginWithEmailAndPassword,
} from '@/features/auth/api/login';
import { api } from '@/lib/api';
import type { Client, Components } from '@/types/openapi';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

export const useAuth = ({
  middleware = [],
  redirectIfAuthenticated = NEXT_ROUTES.HOME,
  roles = [],
} = {}) => {
  const router = useRouter();
  const clientPromise = api.getClient<Client>();

  const {
    data: user,
    error,
    mutate,
  } = useSWR(
    '/api/v1/auth/user',
    async () => {
      try {
        const client = await clientPromise;
        return client.auth_user_retrieve();
      } catch (error) {
        if (error.response.status !== 409) throw error;
        router.push(NEXT_ROUTES.LOGIN);
      }
    },
    {
      revalidateOnFocus: false,
      errorRetryCount: 1,
    }
  );

  const csrf = async () => {
    // TODO: is this necessary?
    // const client = await clientPromise;
    // client.api_v1_auth_set_csrf_retrieve();
  };

  const signup = async (data: SignupCredentialsDTO) => {
    await csrf();
    await signupWithEmailAndPassword(data);
    mutate();
  };

  const login = async (data: LoginCredentialsDTO) => {
    await csrf();
    await loginWithEmailAndPassword(data);
    mutate();
  };

  const logout = async () => {
    if (!error) {
      const client = await clientPromise;
      await client.auth_logout_create();
      mutate();
    }

    // TODO: change to NEXT_ROUTES.HOME once we have a home page for guests
    window.location.pathname = NEXT_ROUTES.LOGIN;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const userHasRole = (rol = roles) => {
    // TODO: implement by returning a "roles" array from the API
    // if (user && rol) {
    //   const hasRole = rol.some((r) => user?.roles?.includes(r));
    //   return hasRole;
    // }
    return false;
  };

  useEffect(() => {
    if (middleware.includes('auth') && error) {
      logout();
    }
    if (middleware.includes('guest') && redirectIfAuthenticated && user) {
      router.replace(redirectIfAuthenticated);
    }
    // if (middleware.includes('verified') && user && !user?.email_verified_at) {
    //   router.push('/verify-email')
    // }
    // if (
    //   window.location.pathname === '/verify-email' &&
    //   user?.email_verified_at
    // ) {
    //   router.push(redirectIfAuthenticated);
    // }
    // TODO: implement by returning a "roles" array from the API
    // if (middleware.includes('role') && user && user?.roles && !userHasRole()) {
    //   router.push(redirectIfAuthenticated);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, error]);

  return {
    user: user as unknown as Components.Schemas.UserDetails | undefined,
    signup,
    login,
    logout,
    mutateUser: mutate,
    userHasRole,
  };
};
