import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
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
  const { user } = useSelector((state) => state.userSlice);

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
    const { body, createdAt, tagList, title, author, favoritesCount, description } = article;
    const articleDate = format(parseISO(createdAt), 'MMMM d, y');
    const isAuth = user.username === author.username;

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
        <div className="article__description">
          <div className="article__description-box">{description}</div>
          {isAuth && (
            <div>
              <button type="button" className="article__btn article__btn-delete">
                Delete
              </button>
              <Link to={`/articles/${slug}/edit`}>
                <button type="button" className="article__btn">
                  Edit
                </button>
              </Link>
            </div>
          )}
        </div>
        <div className="article__body">
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      </li>
    );
  }
}
