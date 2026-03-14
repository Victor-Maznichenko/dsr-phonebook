import { RouterProvider } from 'atomic-router-react';
import { appStarted, router } from '@/shared/config';
import { ThemeProvider } from '@/shared/lib';
import { Pages } from '@/pages';
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
          <Pages />
        </main>
        <Footer />
      </RouterProvider>
      <div className='noise' />
    </ThemeProvider>
  </div>
);
