import { useForm } from 'react-hook-form';
import './edit-profile-page.scss';

export default function EditProfilePage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmitProfile = (data) => {
    console.log(data);
  };

  return (
    <div className="blog__form form">
      <h2 className="form__title">Edit Profile</h2>
      <form className="form__form" onSubmit={handleSubmit(onSubmitProfile)}>
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
          />
          <div style={{ color: 'red' }}>{errors?.email && <p>{errors?.email?.message || 'Error!'}</p>}</div>
        </label>
        <label className="form__label">
          New password
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
            placeholder="New password"
          />
          <div style={{ color: 'red' }}>{errors?.password && <p>{errors?.password?.message || 'Error!'}</p>}</div>
        </label>
        <label className="form__label last-label">
          Avatar image (url)
          <input
            {...register('avatar', {
              required: 'Поле обязательно к заполнению',
            })}
            className={`form__input ${errors?.avatar ? ' error' : ''}`}
            type="text"
            placeholder="Avatar image"
          />
          <div style={{ color: 'red' }}>{errors?.avatar && <p>{errors?.avatar?.message || 'Error!'}</p>}</div>
        </label>
        <input className="form__button" type="submit" value="Save" />
      </form>
    </div>
  );
}
