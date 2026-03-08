import { Route, RouterProvider } from 'atomic-router-react';
import { appStarted, router, routes } from '@/shared/config';
import { ThemeProvider } from '@/shared/lib';
import { LoginPage, RegisterPage } from '@/pages';
import { Footer, Header } from '@/widgets';
import styles from './styles.module.scss';
import '@/shared/styles/index.scss';

appStarted();
export const App = () => (
  <div className={styles.app}>
    <ThemeProvider>
      <RouterProvider router={router}>
        <Header />
        <main className={styles.main}>
          <Route route={routes.login} view={LoginPage} />
          <Route route={routes.register} view={RegisterPage} />
        </main>
        <Footer />
      </RouterProvider>
      <div className='noise' />
    </ThemeProvider>
  </div>
);
