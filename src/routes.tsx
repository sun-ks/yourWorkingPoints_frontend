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
import Points from './sections/mainContent/points/layout/Points';
import TicketsByPoints from './sections/mainContent/ticketsByPoints/layout/TicketsByPoints';
import CreateNewPoint from './sections/mainContent/createNewPoint/layout/CreateNewPoint';
import CreateNewTiket from './sections/mainContent/createNewTicket/layout/CreateNewTicket'
import EditPoint from './sections/mainContent/editPoint/layout/EditPoint';
import Ticket from './sections/mainContent/ticket/layout/Ticket';
import Tickets from './sections/mainContent/tickets/layout/Tickets';

const Router: FC = () => {
const routers = useRoutes([
    /* protected routes */
    {
      //path: '/point',
      element: <RequireAuth />,
      children: [
        { path: '/', element: <Paperbase/>,
        children: [
          { element: <Points/>, index: true },
          { path: ':point_id', element: <TicketsByPoints/> },
          { path: '/createNewPoint', element: <CreateNewPoint/> },
          { path: '/editPoint/:point_id', element: <EditPoint/> },
          { path: '/createTicket/:point_id?', element: <CreateNewTiket /> },
          { path: '/tickets', element: <Tickets/> },
          { path: '/items/:ticket_id/:point_id?', element: <Ticket /> },
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