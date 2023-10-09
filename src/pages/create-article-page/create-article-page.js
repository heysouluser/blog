import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'antd';

import ArticleForm from '../../components/article-form';
import { createArticle } from '../../api/articles-api';
import './create-article-page.scss';

export default function CreateArticlePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [responseError, setRepsonseError] = useState(null);
  const navigate = useNavigate();

  const onSubmitArticle = async (data, tagList) => {
    setIsLoading(true);
    const token = JSON.parse(localStorage.getItem('currentUser'));
    try {
      const response = await createArticle({ article: { ...data, tagList } }, token);
      navigate(`/articles/${response.article.slug}`);
    } catch (error) {
      setRepsonseError(error.message);
    } finally {
      setIsLoading(false);
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
    <ArticleForm
      articleTitle="Create new article"
      isLoading={isLoading}
      onSubmitArticle={onSubmitArticle}
      tagList={[]}
    />
  );
}
