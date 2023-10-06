import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ArticleForm from '../../components/article-form';
import { createArticle } from '../../api/articles-api';
import './create-article-page.scss';

export default function CreateArticlePage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmitArticle = async (data, tagList) => {
    setIsLoading(true);
    const token = JSON.parse(localStorage.getItem('currentUser'));
    try {
      console.log(data, tagList);
      const response = await createArticle({ article: { ...data, tagList } }, token);
      navigate(`/articles/${response.article.slug}`);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ArticleForm
      articleTitle="Create new article"
      isLoading={isLoading}
      onSubmitArticle={onSubmitArticle}
      tagList={[]}
    />
  );
}
