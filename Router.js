import { createRouter } from '@exponent/ex-navigation';
import HomePage from './HomePage';
import TestPage from './TestPage';



 const Router = createRouter(() => ({
  home: () => HomePage,
  test: () => TestPage,
}));

export default Router;
