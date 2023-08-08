import React, {FC} from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import Paperbase from './components/Paperbase';
import RequireAuth from './pages/RequireAuth'
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
    /* protected routes */
    {
      //path: '/point',
      element: <RequireAuth />,
      children: [
        { path: 'dashboard', element: <Paperbase/> ,
        children: [
          { path: 'points', element: <div>12345 TEST</div>, index: true },
        ]},
        //{ element: <Navigate to="/dashboard/app" />, index: true },
        
        //{ path: 'products', element: <ProductsPage /> },
        //{ path: 'blog', element: <BlogPage /> },
      ],
    },
    /* public routes */
    {
      path: 'auth/:typePage/:ressetPassToken?',
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