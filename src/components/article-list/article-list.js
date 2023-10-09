import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Pagination, Spin, Alert } from 'antd';

import Article from '../article';
import { fetchArticles } from '../../api/async-actions';
import { setOffset } from '../../store/articleSlice';
import './article-list.scss';

export default function ArticleList() {
  const dispatch = useDispatch();
  const { articles, articlesCount, articleListOffset, status, error } = useSelector((state) => state.articleSlice);

  const token = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    dispatch(fetchArticles({ token, offset: (articleListOffset - 1) * 5 }));
  }, [dispatch, token, articleListOffset]);

  if (status === 'loading') {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div>
        <Alert message={error} type="error" />
      </div>
    );
  }

  if (status === 'succeeded') {
    return (
      <div className="blog__main-block">
        <ul className="blog__article-list">
          {articles.map((article) => (
            <Article key={article.slug} article={article} />
          ))}
        </ul>
        <Pagination
          className="blog__pagination"
          current={articleListOffset}
          total={articlesCount * 2}
          showSizeChanger={false}
          onChange={(newPage) => dispatch(setOffset(newPage))}
        />
      </div>
    );
  }
}
