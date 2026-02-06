import type { PropsWithChildren } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import { USER_ROLES } from '@/shared/lib';
import { useProfileStore } from '../shared/store';

interface ProtectedRouteProps extends PropsWithChildren {
  isAdmin?: boolean;
}

export const ProtectedRoute = ({ isAdmin }: ProtectedRouteProps) => {
  const location = useLocation();
  const { profile } = useProfileStore();
  const accessToken = localStorage.getItem('access_token');
  const isAdminRole = profile?.role === USER_ROLES.Admin;

  if (!accessToken) {
    return <Navigate state={{ from: location }} to='/login' />;
  }

  if (isAdmin && !isAdminRole) {
    return <Navigate state={{ from: location }} to='/admin/login' />;
  }

  return <Outlet />;
};
