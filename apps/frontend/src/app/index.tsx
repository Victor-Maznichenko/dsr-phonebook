import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';
import { HomePage, LoginPage, NotFoundPage, RegisterPage, UserPage, ProfilePage } from '@/pages';
import { ProtectedRoute } from './protected-route';
import { Footer } from '@/shared/ui';
import { Header } from '@/widgets';
import { useAuth, ROUTES } from '@/shared/lib';
import { AppShell } from '@mantine/core';

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
          { path: ROUTES.PROFILE, element: <ProfilePage /> },
        ],
      },
      { path: ROUTES.LOGIN, element: <LoginPage /> },
      { path: ROUTES.REGISTER, element: <RegisterPage /> },
      { path: ROUTES.ADMIN_LOGIN, element: <LoginPage isAdmin /> },
    ],
  },
]);

export const App = () => {
  useAuth();

  return <RouterProvider router={router} />;
};
