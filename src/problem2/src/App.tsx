import { useEffect } from 'react';
import s from './App.module.scss'
import { getTokensPrice } from './services/api';
import { tokenActions } from './store/reducers/tokens';
import { useDispatch } from 'react-redux';
import SwapForm from './components/SwapForm/SwapForm';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getTokensPrice().then(res => {
      dispatch(tokenActions.addItems(res.data));
    });
  }, [dispatch]);

  return (
    <main className={s.main}>
      <SwapForm />
    </main>
  )
}

export default App
