import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './sign-in-page.scss';

export default function SignInPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmitLogin = (data) => {
    console.log(data);
  };

  return (
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
            type="text"
            placeholder="Email address"
          />
          <div style={{ color: 'red' }}>{errors?.email && <p>{errors?.email?.message || 'Error!'}</p>}</div>
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
          />
          <div style={{ color: 'red' }}>{errors?.password && <p>{errors?.password?.message || 'Error!'}</p>}</div>
        </label>
        <input className="form__button" type="submit" value="Login" />
      </form>
      <div className="form__sign-in">
        Don’t have an account?
        <Link to="/sign-up">
          <span> Sign Up.</span>
        </Link>
      </div>
    </div>
  );
}
