import React, {FC} from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import Paperbase from './components/Paperbase';
// layouts
//import DashboardLayout from './layouts/dashboard';
//import SimpleLayout from './layouts/simple';
//
//import BlogPage from './pages/BlogPage';
//import UserPage from './pages/UserPage';
import AuthPage from './pages/AuthPage';
//import Page404 from './pages/Page404';
//import ProductsPage from './pages/ProductsPage';
//import DashboardAppPage from './pages/DashboardAppPage';

// ----------------------------------------------------------------------
const Router: FC = () => {
const routers = useRoutes([
    {
      path: '/point',
      element: <Paperbase />,
      children: [
        //{ element: <Navigate to="/dashboard/app" />, index: true },
        //{ path: 'app', element: <DashboardAppPage /> },
        { path: 'create_point', element: <div>TEST</div> },
        //{ path: 'products', element: <ProductsPage /> },
        //{ path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'auth/:typePage/:id?',
      element: <AuthPage />,
    }
    /*{
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },*/
  ]);

  return routers
}

export default Router