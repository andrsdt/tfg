import { Components } from '@/types/openapi';

export type User = Components.Schemas.User;
export type BasicUser = Components.Schemas.BasicUser;
export type AuthenticatedUser = Components.Schemas.CustomUserDetails;

// Type with the fields they have in common
export type AnyUser = User | BasicUser | AuthenticatedUser;
