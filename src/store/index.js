import { configureStore } from '@reduxjs/toolkit';

import articleSlice from './articleSlice';

export const store = configureStore({
  reducer: {
    articleSlice,
  },
});
