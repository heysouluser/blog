import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Spin, Alert } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import './sign-up-page.scss';
import { setUser, logIn } from '../../store/userSlice';
import { registerUser, loginUser } from '../../api/user-api';

export default function SignUpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signUpSchema = yup.object().shape({
    username: yup
      .string()
      .required('Поле обязательно к заполнению')
      .min(3, 'Должно быть минимум 3 символа')
      .max(20, 'Должно быть максимум 20 символов'),
    email: yup.string().email('Введите корректный email-адрес').required('Поле обязательно к заполнению'),
    password: yup
      .string()
      .required('Поле обязательно к заполнению')
      .min(6, 'Должно быть минимум 6 символов')
      .max(40, 'Должно быть максимум 40 символов'),
  });

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(signUpSchema),
    mode: 'onBlur',
  });

  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responseError, setRepsonseError] = useState(null);

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
    localStorage.setItem('currentUser', JSON.stringify(fetchReg.user.token));

    dispatch(logIn(true));
  };

  const onSubmitReg = async (data) => {
    setIsLoading(true);

    try {
      const { passRepeat, ...formData } = data;

      const fetchReg = await registerUser({ user: formData });

      handleSuccessfulSignUp(data, fetchReg);
      reset();
      navigate('/');
    } catch (error) {
      setRepsonseError(`${error.message} - Вы ввели уже существующее имя или почту, попробуйте снова.`);
    } finally {
      setIsLoading(false);
    }
  };

  const validateErr = (inputType) => (
    <div style={{ color: 'red' }}>{errors?.[inputType] && <p>{errors?.[inputType]?.message || 'Error!'}</p>}</div>
  );

  const spin = <div className="spin-container">{isLoading && <Spin />}</div>;

  if (responseError) {
    return (
      <div>
        <Alert message={responseError} type="error" />
      </div>
    );
  }

  return (
    <>
      {spin}
      <div className="blog__form form">
        <h2 className="form__title">Create new account</h2>
        <form className="form__form" onSubmit={handleSubmit(onSubmitReg)}>
          <label className="form__label">
            Username
            <input
              {...register('username')}
              className={`form__input ${errors?.username ? ' error' : ''}`}
              type="text"
              placeholder="Username"
            />
            {validateErr('username')}
          </label>
          <label className="form__label">
            Email address
            <input
              {...register('email')}
              className={`form__input ${errors?.email ? ' error' : ''}`}
              type="email"
              placeholder="Email address"
            />
            {validateErr('email')}
          </label>
          <label className="form__label">
            Password
            <input
              {...register('password')}
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
