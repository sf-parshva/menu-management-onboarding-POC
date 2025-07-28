import AuthPage from '../features/auth/AuthPage';
import RegisterPage from '../features/auth/RegisterPage';

const publicRoutes = [
  {
    path: '/login',
    element: <AuthPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
];
export default publicRoutes;
