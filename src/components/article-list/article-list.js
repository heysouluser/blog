import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Pagination, Spin } from 'antd';

import Article from '../article';
import { fetchArticles, setOffset } from '../../store/articleSlice';
import './article-list.scss';

export default function ArticleList() {
  const dispatch = useDispatch();
  const { articles, articlesCount, articleListOffset, status } = useSelector((state) => state.articleSlice);

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
