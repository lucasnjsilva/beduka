import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './auth';

const PublicRoute = ({ component: Component, restricted, ...rest }) => (
  <Route {...rest} render={props => (
      isAuthenticated() && restricted ?
          <Redirect to="/dashboard" />
      : <Component {...props} />
  )} />
);

export default PublicRoute;