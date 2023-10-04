import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logIn } from '../../store/userSlice';

import './header.scss';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLogIn, user } = useSelector((state) => state.userSlice);

  const logOut = () => {
    dispatch(logIn(false));
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <header className="blog__header">
      <NavLink to="/">
        <div className="blog__logo">Realworld Blog</div>
      </NavLink>
      <div className="blog__nav-buttons">
        {isLogIn && (
          <>
            <NavLink to="/new-article">
              <button type="button" className="blog__sign-up-btn create-btn">
                Create Article
              </button>
            </NavLink>
            <NavLink to="/profile">
              <button type="button" className="blog__sign-up-btn profile-btn">
                <div>{user.username}</div>
                <img src={user.image} alt="user-pic" />
              </button>
            </NavLink>
            <NavLink to="/" onClick={logOut}>
              <button type="button" className="blog__sign-up-btn log-out-btn">
                Log Out
              </button>
            </NavLink>
          </>
        )}
        {!isLogIn && (
          <>
            <NavLink to="/sign-in">
              <button type="button" className="blog__sign-in-btn">
                Sign In
              </button>
            </NavLink>
            <NavLink to="/sign-up">
              <button type="button" className="blog__sign-up-btn">
                Sign Up
              </button>
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
}
