import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Spin, Modal } from 'antd';
import uniqid from 'uniqid';
import ReactMarkdown from 'react-markdown';

import './article-page.scss';
import { fetchArticle } from '../../api/async-actions';
import { deleteArticle, favoriteArticle, unfavoriteArticle } from '../../api/articles-api';
import { toggleFavoriteSingle } from '../../store/articleSlice';

export default function ArticlePage() {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const navigate = useNavigate();
  const { article, status } = useSelector((state) => state.articleSlice);
  const { user, isLogIn } = useSelector((state) => state.userSlice);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    dispatch(fetchArticle({ token, slug }));
  }, [dispatch, slug, token]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    deleteArticle(token, slug);
    setIsModalOpen(false);
    navigate('/');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (status === 'loading') {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  if (status === 'succeeded' && article) {
    const { body, createdAt, tagList, title, author, favorited, favoritesCount, description } = article;
    const articleDate = format(parseISO(createdAt), 'MMMM d, y');
    const isAuth = user.username === author.username;

    const handleFavoriteClick = () => {
      if (isLogIn) {
        if (favorited) {
          unfavoriteArticle(token, slug).then(() => {
            dispatch(toggleFavoriteSingle());
          });
        } else {
          favoriteArticle(token, slug).then(() => {
            dispatch(toggleFavoriteSingle());
          });
        }
      }
    };

    return (
      <li className="blog__article article">
        <div className="article__header">
          <div className="article__info">
            <div className="article__row">
              <div className="article__column">
                <div className="article__title">{title}</div>
                <button type="button" className="article__likes" onClick={handleFavoriteClick}>
                  {favorited ? <div className="article__like">❤️️</div> : <div className="article__like">🤍</div>}
                  <div className="article__quantity-likes">{favoritesCount}</div>
                </button>
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
              <button type="button" className="article__btn article__btn-delete" onClick={showModal}>
                Delete
              </button>

              <Link to={`/articles/${slug}/edit`}>
                <button type="button" className="article__btn">
                  Edit
                </button>
              </Link>
              <Modal
                title="Are you sure you want to delete this article?"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              />
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
