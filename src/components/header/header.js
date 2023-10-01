import { NavLink } from 'react-router-dom';

import './header.scss';

export default function Header() {
  return (
    <header className="blog__header">
      <NavLink to="/">
        <div className="blog__logo">Realworld Blog</div>
      </NavLink>
      <div className="blog__nav-buttons">
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
      </div>
    </header>
  );
}
