import { Routes, Route, Navigate } from 'react-router-dom';

import ArticlePage from '../pages/article-page';
import ErrorPage from '../pages/error-page';
import HomePage from '../pages/home-page';
import SignInPage from '../pages/sign-in-page';
import SignUpPage from '../pages/sign-up-page';
import Layout from '../components/layout';
import EditProfilePage from '../pages/edit-profile-page';

import './app.scss';

export default function App() {
  return (
    <div className="blog">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/articles" element={<Navigate to="/" replace />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/profile" element={<EditProfilePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </div>
  );
}
