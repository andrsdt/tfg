import { ROLES } from '@/constants/roles';
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
        return await client.auth_user_retrieve();
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

  const signup = async (data: SignupCredentialsDTO) => {
    await signupWithEmailAndPassword(data);
    mutate();
  };

  const login = async (data: LoginCredentialsDTO) => {
    await loginWithEmailAndPassword(data);
    mutate();
  };

  const logout = async () => {
    if (!error) {
      const client = await clientPromise;
      await client.auth_logout_create();
      mutate();
    }

    window.location.pathname = NEXT_ROUTES.LOGIN;
  };

  const userIsProducer = () => {
    // NOTE: sometimes this is an axios response, some others, it's the user object
    // I have to look into it, but for the moment we will just check both as it's only
    // relevant here (it's casted to User when exposed to other components, in the hook's return)

    // NOTE: also allowing !user for the moment, there are sometimes in which user is still undefined.
    // To be handled in the future
    return (
      user === undefined ||
      user?.data?.is_producer ||
      (user as any)?.is_producer
    );
  };

  useEffect(() => {
    if (roles.includes(ROLES.AUTHENTICATED) && error) {
      logout();
    }
    if (roles.includes(ROLES.GUEST) && redirectIfAuthenticated && user) {
      router.replace(redirectIfAuthenticated);
    }
    if (roles.includes(ROLES.PRODUCER) && !userIsProducer()) {
      router.replace(NEXT_ROUTES.BECOME_PRODUCER);
    }
    if (roles.includes(ROLES.NOT_PRODUCER) && userIsProducer()) {
      router.back();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, error]);

  return {
    user: user as unknown as Components.Schemas.CustomUserDetails | undefined,
    signup,
    login,
    logout,
    mutateUser: mutate,
  };
};
