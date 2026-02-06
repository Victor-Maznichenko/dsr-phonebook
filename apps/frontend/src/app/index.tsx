import { AppShell } from '@mantine/core';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';
import { ROUTES, useAuth } from '@/shared/lib';
import { HomePage, LoginPage, NotFoundPage, ProfilePage, RegisterPage, UserPage } from '@/pages';
import { Header } from '@/widgets';
import { Footer } from '@/shared/ui';
import { ProtectedRoute } from './protected-route';

const Layout = () => (
  <AppShell>
    <Header />
    <Outlet />
    <Footer />
  </AppShell>
);

const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <HomePage /> },
          { path: ROUTES.USER, element: <UserPage /> },
          { path: ROUTES.PROFILE, element: <ProfilePage /> }
        ]
      },
      { path: ROUTES.LOGIN, element: <LoginPage /> },
      { path: ROUTES.REGISTER, element: <RegisterPage /> },
      { path: ROUTES.ADMIN_LOGIN, element: <LoginPage isAdmin /> }
    ]
  }
]);

export const App = () => {
  useAuth();

  return <RouterProvider router={router} />;
};
