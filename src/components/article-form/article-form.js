import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import uniqid from 'uniqid';
import { Spin } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import './article-form.scss';
import ErrorPage from '../../pages/error-page';

export function ArticleForm({ articleTitle, isLoading, onSubmitArticle, body, tagList, title, description }) {
  const { isLogIn } = useSelector((state) => state.userSlice);

  const articleSchema = yup.object().shape({
    title: yup.string().required('Поле обязательно к заполнению'),
    description: yup.string().required('Поле обязательно к заполнению'),
    body: yup.string().required('Поле обязательно к заполнению'),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(articleSchema),
    mode: 'onBlur',
  });

  const [newTags, setNewTags] = useState(tagList);

  const addTag = (tag) => {
    if (!tag.trim()) {
      return;
    }
    setNewTags((prevTags) => {
      const updatedTags = [...prevTags, tag];
      return updatedTags;
    });
  };

  const onSubmitTag = (e) => {
    e.preventDefault();
    const tagValue = e.target.tag.value;
    addTag(tagValue);
    // eslint-disable-next-line no-param-reassign
    e.target.tag.value = '';
  };

  const deleteTag = (i) => {
    const updatedTags = newTags.filter((_, index) => i !== index);
    setNewTags(updatedTags);
  };

  const validateErr = (inputType) => (
    <div style={{ color: 'red' }}>{errors?.[inputType] && <p>{errors?.[inputType]?.message || 'Error!'}</p>}</div>
  );

  const spin = <div className="spin-container">{isLoading && <Spin />}</div>;

  if (isLogIn) {
    return (
      <>
        {spin}
        <div className="blog__form form article-form">
          <h2 className="form__title">{articleTitle}</h2>
          <form className="form__form" id="send-form" onSubmit={handleSubmit((data) => onSubmitArticle(data, newTags))}>
            <label className="form__label">
              Title
              <input
                type="text"
                placeholder="Title"
                className={`form__input ${errors?.title ? ' error' : ''}`}
                {...register('title')}
                defaultValue={title}
              />
              {validateErr('title')}
            </label>
            <label className="form__label">
              Short description
              <input
                type="text"
                placeholder="Description"
                className={`form__input ${errors?.description ? ' error' : ''}`}
                {...register('description')}
                defaultValue={description}
              />
              {validateErr('description')}
            </label>
            <label className="form__label">
              Text
              <textarea
                className={`form__textarea ${errors?.body ? ' error' : ''}`}
                placeholder="Text"
                {...register('body', {
                  required: 'Поле обязательно к заполнению',
                })}
                defaultValue={body}
              />
              {validateErr('body')}
            </label>
          </form>
          <form className="form__tags" onSubmit={onSubmitTag}>
            <label className="form__label form__label-tags">
              Tags
              <input type="text" className="form__input form__input-short" name="tag" />
            </label>
            <input className="form__button form__button-tag" type="submit" value="Add tag" disabled={isLoading} />
          </form>
          {newTags.map((item, index) => (
            <div className="tags" key={uniqid()}>
              <div className="form__input new-tag">{item}</div>
              <button className="form__button tag__button" type="button" onClick={() => deleteTag(index)}>
                Delete
              </button>
            </div>
          ))}
          <input className="form__button" type="submit" value="Send" form="send-form" disabled={isLoading} />
        </div>
      </>
    );
  }

  return <ErrorPage />;
}
