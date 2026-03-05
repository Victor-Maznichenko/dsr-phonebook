import ReactDOM from 'react-dom/client';
import { App } from './app';
import '@/shared/api/setup';
import '@/shared/styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
