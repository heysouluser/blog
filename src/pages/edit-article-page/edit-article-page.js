import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Spin, Alert } from 'antd';

import { fetchArticle } from '../../store/async-actions';
import { updateArticle } from '../../api/articles-api';
import { ArticleForm } from '../../components/article-form/article-form';
import './edit-article-page.scss';

export default function EditArticlePage() {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { article, status } = useSelector((state) => state.articleSlice);
  const [isLoading, setIsLoading] = useState();
  const [responseError, setRepsonseError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchArticle({ slug }));
  }, [dispatch, slug]);

  const onSubmitArticle = async (data, tagList) => {
    setIsLoading(true);
    const token = JSON.parse(localStorage.getItem('currentUser'));
    try {
      await updateArticle({ article: { ...data, tagList } }, token, slug);
      navigate(`/articles/${slug}`);
    } catch (error) {
      setRepsonseError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  if (responseError) {
    return (
      <div>
        <Alert message={responseError} type="error" />
      </div>
    );
  }

  if (status === 'succeeded' && article) {
    const { body, tagList, title, description } = article;
    return (
      <ArticleForm
        articleTitle="Edit article"
        body={body}
        tagList={tagList}
        title={title}
        description={description}
        isLoading={isLoading}
        onSubmitArticle={onSubmitArticle}
      />
    );
  }
}
