import { createAsyncThunk } from '@reduxjs/toolkit';

import { getArticles, getArticle } from './articles-api';

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async ({ token, offset }, { rejectWithValue }) => {
    try {
      const articles = await getArticles(token, offset);
      return articles;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchArticle = createAsyncThunk('articles/fetchArticle', async ({ token, slug }, { rejectWithValue }) => {
  try {
    const article = await getArticle(token, slug);
    return article;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
