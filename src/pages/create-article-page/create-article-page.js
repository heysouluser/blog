import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ArticleForm from '../../components/article-form';
import { createArticle } from '../../api/articles-api';
import './create-article-page.scss';

export default function CreateArticlePage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmitNewArticle = async (data, tags) => {
    setIsLoading(true);
    const token = JSON.parse(localStorage.getItem('currentUser'));
    try {
      console.log(data, tags);
      const response = await createArticle({ article: { ...data, tagList: tags } }, token);
      navigate(`/articles/${response.article.slug}`);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return <ArticleForm title="Create new article" isLoading={isLoading} onSubmitNewArticle={onSubmitNewArticle} />;
}
