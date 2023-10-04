import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ArticlePage from '../pages/article-page';
import ErrorPage from '../pages/error-page';
import HomePage from '../pages/home-page';
import SignInPage from '../pages/sign-in-page';
import SignUpPage from '../pages/sign-up-page';
import Layout from '../components/layout';
import EditProfilePage from '../pages/edit-profile-page';
import CreateArticlePage from '../pages/create-article-page';
import { getCurrentUser } from '../api/user-api';
import { logIn, setUser } from '../store/userSlice';

import './app.scss';

export default function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userSlice);

  useEffect(() => {
    const tokenAuth = JSON.parse(localStorage.getItem('currentUser'));

    const getCurrentUserHandler = async () => {
      if (tokenAuth) {
        const currentUser = await getCurrentUser(tokenAuth);
        if (currentUser) {
          dispatch(logIn(true));

          const updatedUser = { ...currentUser.user };
          console.log(updatedUser);
          dispatch(setUser(updatedUser));
        }
      }
    };

    if (Object.keys(user).length === 0) {
      getCurrentUserHandler();
    }
  }, [dispatch, user]);

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
          <Route path="/new-article" element={<CreateArticlePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </div>
  );
}
