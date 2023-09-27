import { Routes, Route } from 'react-router-dom';

import ArticlePage from '../pages/article-page';
import ErrorPage from '../pages/error-page';
import HomePage from '../pages/home-page';
import SignInPage from '../pages/sign-in-page';
import SignUpPage from '../pages/sign-up-page';

import Layout from '../components/layout';

import './app.scss';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/article" element={<ArticlePage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </div>
  );
}

