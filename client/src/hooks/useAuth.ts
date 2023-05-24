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
import { getApiClient } from '@/lib/api';
import type { Components } from '@/types/openapi';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

export const useAuth = ({
  redirectIfAuthenticated = NEXT_ROUTES.HOME,
  roles = [],
} = {}) => {
  const router = useRouter();
  const clientPromise = getApiClient();

  const {
    data: user,
    error,
    mutate,
  } = useSWR(
    '/api/v1/auth/user',
    async () => {
      try {
        const client = await clientPromise;
        const response = await client.auth_user_retrieve();
        return (response.data ??
          response) as Components.Schemas.CustomUserDetails;
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

  const userIsProducer = async () => {
    const currentUser = user || (await mutate());
    return currentUser?.is_producer;
  };

  const userHasCompletedOnboarding = async () => {
    const currentUser = user || (await mutate());
    return currentUser?.has_completed_onboarding;
  };

  useEffect(() => {
    const checkRoles = async () => {
      if (roles.includes(ROLES.AUTHENTICATED) && error) {
        logout();
      }
      if (roles.includes(ROLES.GUEST) && redirectIfAuthenticated && user) {
        router.replace(redirectIfAuthenticated);
      }
      if (roles.includes(ROLES.PRODUCER) && !(await userIsProducer())) {
        router.replace(NEXT_ROUTES.BECOME_PRODUCER);
      }
      if (roles.includes(ROLES.NOT_PRODUCER) && (await userIsProducer())) {
        router.back();
      }
      if (
        roles.includes(ROLES.HAS_NOT_COMPLETED_ONBOARDING) &&
        (await userHasCompletedOnboarding())
      ) {
        router.back();
      }
    };
    checkRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, error]);

  return {
    user,
    signup,
    login,
    logout,
    mutateUser: mutate,
  };
};
