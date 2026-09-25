import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import './styles/global.css';
import './styles/base/functional.css';
import './styles/base/theme.css';
import './styles/base/reference.css';
import './styles/base/professional.css';
import './styles/base/product.css';
import './styles/base/polish.css';
import './styles/components/hiresense-header.css';

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);
const themeRoot = document.createElement('div');
document.body.append(themeRoot);
createRoot(themeRoot).render(<StrictMode><ThemeToggle /></StrictMode>);
