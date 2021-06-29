import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './redux/store';
import ErrorBoundary from './components/ErrorBoundary';
import './index.scss';

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root'),
);
