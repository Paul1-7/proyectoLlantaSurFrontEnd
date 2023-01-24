import { configureStore } from '@reduxjs/toolkit';
import { FLUSH, persistReducer, persistStore, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productsSlice from '~/redux/slices/productsShop';
import { apiSlice } from './api/apiSlice';

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
  blacklist: [apiSlice.reducerPath],
};

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    products: persistReducer(productPersistConfig, productsSlice),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] },
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

export default store;
