import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app/App';

import './style/style.scss';

const container = document.querySelector('#root');
const root = createRoot(container);

root.render(
    <App />
);

