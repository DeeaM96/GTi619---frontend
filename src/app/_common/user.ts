export type Roles = "ROLE_ADMIN" | "ROLE_USER" | "ROLE_PREP_AFF" | "ROLE_PREP_RES";

export interface User {
  id: number;
  uid: string;
  username?: string;
  email: string;
  displayName?: string;
  emailVerified: boolean;
  password?: string;
  avatarUrl?: string;
  roles?: any[];
  role?: Roles;
  customerId: string;
  hasActiveSubscription: boolean;
}
