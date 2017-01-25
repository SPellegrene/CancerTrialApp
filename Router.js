import { createRouter } from '@exponent/ex-navigation';
import HomePage from './HomePage';
import TestPage from './TestPage';
import MapPage from './MapPage';
import InfoPage from './InfoPage';
import MapWrapper from './MapWrapper';


 const Router = createRouter(() => ({
  home: () => HomePage,
  test: () => TestPage,
  info: () => InfoPage,
  map: () => MapWrapper
}));

export default Router;
