import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Spin } from 'antd';

import './sign-up-page.scss';
import { setUser, logIn } from '../../store/userSlice';
import { registerUser, loginUser } from '../../api/user-api';

export default function SignUpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
  });

  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleSuccessfulSignUp = (data, fetchReg) => {
    dispatch(
      setUser({
        username: data.username,
        email: data.email,
        bio: 'I work at State Farm.',
        image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
      })
    );

    loginUser({
      user: {
        email: data.email,
        password: data.password,
      },
    });
    console.log(fetchReg.user);
    localStorage.setItem('currentUser', JSON.stringify(fetchReg.user.token));

    dispatch(logIn(true));
  };

  const onSubmitReg = async (data) => {
    setIsLoading(true);

    try {
      const { passRepeat, ...formData } = data;

      const fetchReg = await registerUser({ user: formData });
      console.log(fetchReg);
      if (fetchReg.errors) {
        if (fetchReg.errors.username) {
          setUsernameError('Имя пользователя уже занято.');
        } else if (fetchReg.errors.email) {
          setEmailError('Email уже занят');
        }
      }

      handleSuccessfulSignUp(data, fetchReg);
      reset();
      navigate('/');
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateErr = (inputType) => (
    <div style={{ color: 'red' }}>{errors?.[inputType] && <p>{errors?.[inputType]?.message || 'Error!'}</p>}</div>
  );

  const serverErr = (errType) =>
    errType && (
      <div className="error-message" style={{ color: 'red' }}>
        {errType}
      </div>
    );

  const spin = <div className="spin-container">{isLoading && <Spin />}</div>;

  return (
    <>
      {spin}
      <div className="blog__form form">
        <h2 className="form__title">Create new account</h2>
        <form className="form__form" onSubmit={handleSubmit(onSubmitReg)}>
          <label className="form__label">
            Username
            <input
              {...register('username', {
                required: 'Поле обязательно к заполнению',
                minLength: {
                  value: 3,
                  message: 'Должно быть минимум 3 символа',
                },
                maxLength: {
                  value: 20,
                  message: 'Должно быть максимум 20 символов',
                },
              })}
              className={`form__input ${errors?.username ? ' error' : ''}`}
              type="text"
              placeholder="Username"
              onChange={() => {
                setUsernameError('');
              }}
            />
            {validateErr('username')}
            {serverErr(usernameError)}
          </label>
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
              onChange={() => {
                setEmailError('');
              }}
            />
            {validateErr('email')}
            {serverErr(emailError)}
          </label>
          <label className="form__label">
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
            />
            {validateErr('password')}
          </label>
          <label className="form__label last-label">
            Repeat Password
            <input
              {...register('passRepeat', {
                validate: (value) => value === watch('password') || 'Пароли не совпадают',
              })}
              className={`form__input ${errors?.passRepeat ? ' error' : ''}`}
              type="password"
              placeholder="Repeat Password"
            />
            {validateErr('passRepeat')}
          </label>
          <label className="form__label-checkbox">
            <input className="form__checkbox" type="checkbox" onChange={(e) => setIsChecked(e.target.checked)} />
            <div>I agree to the processing of my personal information</div>
          </label>
          <input
            className="form__button"
            type="submit"
            value={isLoading ? 'Loading' : 'Create'}
            disabled={!isChecked || isLoading}
          />
        </form>
        <div className="form__sign-in">
          Already have an account?
          <Link to="/sign-in">
            <span> Sign In.</span>
          </Link>
        </div>
      </div>
    </>
  );
}
