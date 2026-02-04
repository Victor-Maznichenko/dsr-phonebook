import { PropsWithChildren } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import { useProfileStore } from '../shared/store';
import { USER_ROLES } from '@/shared/lib';

interface ProtectedRouteProps extends PropsWithChildren {
  isAdmin?: boolean;
}

export const ProtectedRoute = ({ isAdmin }: ProtectedRouteProps) => {
  const location = useLocation();
  const { profile } = useProfileStore();
  const accessToken = localStorage.getItem('access_token');
  const isAdminRole = profile?.role === USER_ROLES.Admin;

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (isAdmin && !isAdminRole) {
    return <Navigate to="/admin/login" state={{ from: location }} />;
  }

  return <Outlet />;
};
