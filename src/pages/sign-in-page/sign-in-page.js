import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import './sign-in-page.scss';

import { loginUser } from '../../api/user-api';
import { logIn } from '../../store/userSlice';

export default function SignInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmitLogin = async (data) => {
    setIsLoading(true);
    const fetchLogin = await loginUser({ user: data });
    console.log(fetchLogin);
    const { user } = fetchLogin;
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user.token));
      dispatch(logIn(true));
      setIsError(false);
      navigate('/');
    }
    setIsError(true);
    setIsLoading(false);
  };

  const validateErr = (inputType) => (
    <div style={{ color: 'red' }}>{errors?.[inputType] && <p>{errors?.[inputType]?.message || 'Error!'}</p>}</div>
  );

  const isErr = isError && <div className="form__err">Email or password is invalid.</div>;

  const spin = <div className="spin-container">{isLoading && <Spin />}</div>;

  return (
    <>
      {spin}
      <div className="blog__form form">
        <h2 className="form__title">Sign In</h2>
        <form className="form__form" onSubmit={handleSubmit(onSubmitLogin)}>
          <label className="form__label">
            Email address
            <input
              {...register('email', {
                required: 'Поле обязательно к заполнению',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Введите корректный email-адрес',
                },
              })}
              className={`form__input ${errors?.email ? ' error' : ''}`}
              type="email"
              placeholder="Email address"
              onChange={() => setIsError(false)}
            />
            {validateErr('email')}
          </label>
          <label className="form__label last-label">
            Password
            <input
              {...register('password', {
                required: 'Поле обязательно к заполнению',
                minLength: {
                  value: 6,
                  message: 'Должно быть минимум 6 символов',
                },
                maxLength: {
                  value: 40,
                  message: 'Должно быть максимум 40 символов',
                },
              })}
              className={`form__input ${errors?.password ? ' error' : ''}`}
              type="password"
              placeholder="Password"
              onChange={() => setIsError(false)}
            />
            {validateErr('password')}
          </label>
          {isErr}
          <input className="form__button" type="submit" value={isLoading ? 'Loading' : 'Login'} disabled={isLoading} />
        </form>
        <div className="form__sign-in">
          Don’t have an account?
          <Link to="/sign-up">
            <span> Sign Up.</span>
          </Link>
        </div>
      </div>
    </>
  );
}
