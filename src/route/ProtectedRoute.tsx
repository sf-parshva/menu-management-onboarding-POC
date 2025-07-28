import Dashboard from '../features/dashboard/Dashboard';
import CategoryPage from '../features/category/CategoryPage';
import MenuPage from '../features/menu/MenuPage';

const protectedRoutes = [
  {
    path: '/categories',
    element: <CategoryPage />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/menu',
    element: <MenuPage />,
  },
];
export default protectedRoutes;
