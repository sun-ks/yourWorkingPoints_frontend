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
import Page404 from './pages/Page404';
import AddFirstPoint from './pages/AddFirstPoint';
//import ProductsPage from './pages/ProductsPage';
//import DashboardAppPage from './pages/DashboardAppPage';
import PointList from './sections/mainContent/pointList/layout/PointList';
import Point from './sections/mainContent/itemList/layout/ItemList';
import CreateNewPoint from './sections/mainContent/createNewPoint/layout/CreateNewPoint';
import CreateNewTiket from './sections/mainContent/createNewTicket/layout/CreateNewTicket'
import Item from './sections/mainContent/item/layout/Item';

const Router: FC = () => {
const routers = useRoutes([
    /* protected routes */
    {
      //path: '/point',
      element: <RequireAuth />,
      children: [
        { path: '/', element: <Paperbase/>,
        children: [
          { element: <PointList/>, index: true },
          { path: ':point_id', element: <Point/> },
          { path: '/createNewPoint', element: <CreateNewPoint/> },
          { path: '/createTicket/:point_id', element: <CreateNewTiket /> },
          { path: '/items/:point_id/:ticket_id', element: <Item /> },
        ]},
        //{ element: <Navigate to="/dashboard/app" />, index: true },
        //{ path: 'products', element: <ProductsPage /> },
        //{ path: 'blog', element: <BlogPage /> },
      ],
    },
    { 
      path: 'createFirstPoint', 
      element: <AddFirstPoint /> 
    },
    /* public routes */
    {
      path: 'auth/:typePage/:ressetPassToken?',
      element: <AuthPage />,
    },
    {
      path: '*',
      element: <Page404 />,
    }
    /*{
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },*/
  ]);

  return routers
}

export default Router