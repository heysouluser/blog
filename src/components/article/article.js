import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import uniqid from 'uniqid';

import './article.scss';
import { favoriteArticle, unfavoriteArticle } from '../../api/articles-api';
import { toggleFavorite } from '../../store/articleSlice';

export default function Article({ article }) {
  const dispatch = useDispatch();
  const { isLogIn } = useSelector((state) => state.userSlice);
  const { createdAt, tagList, title, author, favorited, favoritesCount, slug, description } = article;
  const articleDate = format(parseISO(createdAt), 'MMMM d, y');

  const handleFavoriteClick = () => {
    const token = JSON.parse(localStorage.getItem('currentUser'));
    if (isLogIn) {
      if (favorited) {
        unfavoriteArticle(token, slug).then(() => {
          dispatch(toggleFavorite({ slug }));
        });
      } else {
        favoriteArticle(token, slug).then(() => {
          dispatch(toggleFavorite({ slug }));
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
              <Link to={`articles/${slug}`}>
                <div className="article__title">{title}</div>
              </Link>
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
      <div className="article__description">{description}</div>
    </li>
  );
}
