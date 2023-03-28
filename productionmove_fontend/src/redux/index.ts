import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import authSlice from './authSlice';
import logger from 'redux-logger';
import productSlice from './productSlice';
const reducers = combineReducers({
  authSlice,
  productSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  timeout: 100,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, logger],
});

export default store;
