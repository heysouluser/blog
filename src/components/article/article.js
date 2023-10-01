import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import uniqid from 'uniqid';
import ReactMarkdown from 'react-markdown';

import './article.scss';
import like from '../../images/heart.svg';

export default function Article({ article }) {
  const { body, createdAt, tagList, title, author, favoritesCount, slug } = article;
  const articleDate = format(parseISO(createdAt), 'MMMM d, y');

  return (
    <li className="blog__article article">
      <div className="article__header">
        <div className="article__info">
          <div className="article__row">
            <div className="article__column">
              <Link to={`articles/${slug}`}>
                <div className="article__title">{title}</div>
              </Link>
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
