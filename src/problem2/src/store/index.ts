import { configureStore } from '@reduxjs/toolkit';
import { combineReducers, MiddlewareAPI } from 'redux';
import tokenReducer from './reducers/tokens';

export const reducers = combineReducers({
    token: tokenReducer,
});


export const store = configureStore({
    reducer: reducers,
});

// Infer the `RootState` an d `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type Store = MiddlewareAPI<AppDispatch, RootState>



export default store;
