import { Route, RouterProvider } from 'atomic-router-react';
import { appStarted, router, routes } from '@/shared/config';
import { LoginPage } from '@/pages';
import { Footer, Header } from '@/widgets';
import styles from './styles.module.scss';
import '@/shared/styles/index.scss';

appStarted();
export const App = () => (
  <div className={styles.app}>
    <RouterProvider router={router}>
      <Header />
      <main className={styles.main}>
        <Route route={routes.login} view={LoginPage} />
      </main>
      <Footer />
    </RouterProvider>
    <div className='noise' />
  </div>
);
