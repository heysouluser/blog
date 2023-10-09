import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'antd';

import { updateUser } from '../../store/userSlice';
import { updateCurrentUser } from '../../api/user-api';
import './edit-profile-page.scss';

export default function EditProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userSlice);
  const token = JSON.parse(localStorage.getItem('currentUser'));
  const [responseError, setRepsonseError] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    shouldUnregister: false,
  });

  const onSubmitProfile = async (data) => {
    try {
      const fetchUpdate = await updateCurrentUser({ user: data }, token);
      console.log(fetchUpdate);
      dispatch(updateUser(fetchUpdate.user));
      navigate('/');
    } catch (error) {
      setRepsonseError(error.message);
    }
  };

  if (responseError) {
    return (
      <div>
        <Alert message={responseError} type="error" />
      </div>
    );
  }

  return (
    <div className="blog__form form">
      <h2 className="form__title">Edit Profile</h2>
      <form className="form__form" onSubmit={handleSubmit(onSubmitProfile)}>
        <label className="form__label">
          Username
          <input
            defaultValue={user.username}
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
          />
          <div style={{ color: 'red' }}>{errors?.username && <p>{errors?.username?.message || 'Error!'}</p>}</div>
        </label>
        <label className="form__label">
          Email address
          <input
            defaultValue={user.email}
            {...register('email', {
              required: 'Поле обязательно к заполнению',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Введите корректный email-адрес',
              },
            })}
            className={`form__input ${errors?.email ? ' error' : ''}`}
            type="email"
            placeholder="Email"
          />
          <div style={{ color: 'red' }}>{errors?.email && <p>{errors?.email?.message || 'Error!'}</p>}</div>
        </label>
        <label className="form__label">
          Bio
          <input defaultValue={user.bio} {...register('bio')} type="text" className="form__input" placeholder="Bio" />
        </label>
        <label className="form__label last-label">
          Avatar image (url)
          <input
            defaultValue={user.image}
            {...register('image', {
              required: 'Поле обязательно к заполнению',
            })}
            className={`form__input ${errors?.image ? ' error' : ''}`}
            type="text"
            placeholder="Avatar image"
          />
          <div style={{ color: 'red' }}>{errors?.image && <p>{errors?.image?.message || 'Error!'}</p>}</div>
        </label>
        <input className="form__button" type="submit" value="Save" />
      </form>
    </div>
  );
}
