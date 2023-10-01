import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { Spin } from 'antd';
import uniqid from 'uniqid';
import ReactMarkdown from 'react-markdown';

import './article-page.scss';
import like from '../../images/heart.svg';
import { fetchArticle } from '../../api/async-actions';

export default function ArticlePage() {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { article, status } = useSelector((state) => state.articleSlice);

  const token = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    dispatch(fetchArticle({ token, slug }));
  }, [dispatch, slug, token]);

  if (status === 'loading') {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  if (status === 'succeeded' && article) {
    const { body, createdAt, tagList, title, author, favoritesCount } = article;
    const articleDate = format(parseISO(createdAt), 'MMMM d, y');

    return (
      <li className="blog__article article">
        <div className="article__header">
          <div className="article__info">
            <div className="article__row">
              <div className="article__column">
                <div className="article__title">{title}</div>
                <div className="article__likes">
                  <img src={like} alt="like" />
                  <div className="article__quantity-likes">{favoritesCount}</div>
                </div>
              </div>
              <div className="article__author">{author.username}</div>
            </div>
            <div className="article__row">
              <div className="article__tag-box">
                {tagList.map((tag) => {
                  if (tag.trim()) {
                    return (
                      <span className="article__tag" key={uniqid()}>
                        {tag}
                      </span>
                    );
                  }
                  return '';
                })}
              </div>
              <div className="article__date">{articleDate}</div>
            </div>
          </div>
          <div className="article__author-pic">
            <img src={author.image} alt="author" />
          </div>
        </div>
        <div className="article__body">
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      </li>
    );
  }
}
