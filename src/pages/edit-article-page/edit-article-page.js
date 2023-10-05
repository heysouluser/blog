// import { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// import { fetchArticle, updateArticle } from '../../api/articles-api';
import './edit-article-page.scss';

export default function EditArticlePage() {
  // const [updateArticle, setUpdateArticle] = useState();
  // const [tags, setTags] = useState([]);
  // const [isLoading, setIsLoading] = useState();
  // const { slug } = useParams();
  // const history = useNavigate();

  // useEffect(() => {
  //   const fetchArticleData = async () => {
  //     try {
  //       const body = await fetchArticle(slug);
  //       setUpdateArticle(body);
  //       setTags([...body.article.tagList]);
  //     } catch (error) {
  //       console.error('Error fetching article:', error);
  //     }
  //   };

  //   fetchArticleData();
  // }, [slug]);

  return <div>edit-article-page</div>;
}
