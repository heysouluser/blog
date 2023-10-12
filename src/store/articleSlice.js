import { createSlice } from '@reduxjs/toolkit';

import { fetchArticles, fetchArticle } from './async-actions';

const initialState = {
  articles: [],
  articlesCount: 0,
  articleListOffset: 1,
  article: {},
  status: false,
  error: null,
};

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    addArticles(state, action) {
      state.articles.push(action.payload);
    },
    setOffset(state, action) {
      state.articleListOffset = action.payload;
    },
    toggleFavorite(state, action) {
      const { slug } = action.payload;
      const updatedArticles = state.articles.map((article) => {
        if (article.slug === slug) {
          return {
            ...article,
            favorited: !article.favorited,
            favoritesCount: article.favorited ? article.favoritesCount - 1 : article.favoritesCount + 1,
          };
        }
        return article;
      });

      return {
        ...state,
        articles: updatedArticles,
      };
    },
    toggleFavoriteSingle(state) {
      state.article = {
        ...state.article,
        favorited: !state.article.favorited,
        favoritesCount: state.article.favorited ? state.article.favoritesCount - 1 : state.article.favoritesCount + 1,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload.articles;
        state.articlesCount = action.payload.articlesCount;
        state.article = action.payload.article;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(fetchArticle.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.article = action.payload.article;
      })
      .addCase(fetchArticle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { addArticles, setOffset, toggleFavorite, toggleFavoriteSingle } = articleSlice.actions;
export default articleSlice.reducer;
