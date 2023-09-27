import { NavLink } from 'react-router-dom';

import './header.scss';

export default function Header() {
  return (
    <header>
      <NavLink to="/">Realworld Blog</NavLink>
      <NavLink to="/sign-in">
        <button type='button'>
          Sign In
        </button>
      </NavLink>
      <NavLink to="/sign-up">
        <button type='button'>
          Sign Up
        </button>
      </NavLink>
    </header>
  )
}
