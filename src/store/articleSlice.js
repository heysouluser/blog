import { createSlice } from '@reduxjs/toolkit';

import { fetchArticles, fetchArticle } from '../api/async-actions';

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

export const { addArticles, setOffset } = articleSlice.actions;
export default articleSlice.reducer;