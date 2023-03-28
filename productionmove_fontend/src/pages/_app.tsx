import '../style/login.css';
import '../style/main.css';
import '../style/BDH.css';
import '../style/DLPP.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistStore } from 'redux-persist';
import store from '../redux';
import Auth from '../components/Auth';

export default function App({ Component, pageProps }: AppProps) {
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer />
        <Auth>
          <Component {...pageProps} />
        </Auth>
      </PersistGate>
    </Provider>
  );
}
