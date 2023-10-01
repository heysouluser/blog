import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './sign-up-page.scss';

export default function SignUpPage() {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });

  const [isChecked, setIsChecked] = useState(false);

  const onSubmitReg = (data) => {
    console.log(data);
  };

  return (
    <div className="blog__form form">
      <h2 className="form__title">Create new account</h2>
      <form className="form__form" onSubmit={handleSubmit(onSubmitReg)}>
        <label className="form__label">
          Username
          <input
            {...register('userName', {
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
            className={`form__input ${errors?.userName ? ' error' : ''}`}
            type="text"
            placeholder="Username"
          />
          <div style={{ color: 'red' }}>{errors?.userName && <p>{errors?.userName?.message || 'Error!'}</p>}</div>
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
            type="text"
            placeholder="Email address"
          />
          <div style={{ color: 'red' }}>{errors?.email && <p>{errors?.email?.message || 'Error!'}</p>}</div>
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
          <div style={{ color: 'red' }}>{errors?.password && <p>{errors?.password?.message || 'Error!'}</p>}</div>
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
          <div style={{ color: 'red' }}>{errors?.passRepeat && <p>{errors?.passRepeat?.message || 'Error!'}</p>}</div>
        </label>
        <label className="form__label-checkbox">
          <input className="form__checkbox" type="checkbox" onChange={(e) => setIsChecked(e.target.checked)} />
          <div>I agree to the processing of my personal information</div>
        </label>
        <input className="form__button" type="submit" value="Create" disabled={!isChecked} />
      </form>
      <div className="form__sign-in">
        Already have an account?
        <Link to="/sign-in">
          <span> Sign In.</span>
        </Link>
      </div>
    </div>
  );
}
