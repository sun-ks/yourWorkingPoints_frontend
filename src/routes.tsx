import { Navigate, useRoutes } from 'react-router-dom';

import React, { FC } from 'react';

import Paperbase from './components/Paperbase';
import AddFirstPoint from './pages/AddFirstPoint';
// layouts
//import DashboardLayout from './layouts/dashboard';
//import SimpleLayout from './layouts/simple';
//
//import BlogPage from './pages/BlogPage';
//import UserPage from './pages/UserPage';
import AuthPage from './pages/AuthPage';
import Page404 from './pages/Page404';
import RequireAuth from './pages/RequireAuth';
import AddInventoryItem from './sections/mainContent/addInventoryItem/layout';
import EditInventoryItem from './sections/mainContent/editInventoryItem/layout';
import AddNewClient from './sections/mainContent/addNewClient/layout/AddNewClient';
import AddNewWorker from './sections/mainContent/addNewWorker/layout/AddNewWorker';
import Client from './sections/mainContent/client/layout/Client';
import Clients from './sections/mainContent/clients/layout/Clients';
import CreateNewPoint from './sections/mainContent/createNewPoint/layout/CreateNewPoint';
import CreateNewTiket from './sections/mainContent/createNewTicket/layout/CreateNewTicket';
import СompanySettings from './sections/mainContent/editCompany/layout/СompanySettings';
import EditPoint from './sections/mainContent/editPoint/layout/EditPoint';
import Ticket from './sections/mainContent/editTicket/layout/Ticket';
//import ProductsPage from './pages/ProductsPage';
//import DashboardAppPage from './pages/DashboardAppPage';
import Points from './sections/mainContent/points/layout/Points';
import Tickets from './sections/mainContent/tickets/layout/Tickets';
import TicketsByPoints from './sections/mainContent/ticketsByPoints/layout/TicketsByPoints';
import Warehouse from './sections/mainContent/warehouse/layout';
import Worker from './sections/mainContent/worker/layout/Worker';
import Workers from './sections/mainContent/workers/layout/Workers';

const Router: FC = () => {
  const routers = useRoutes([
    /* protected routes */
    {
      //path: '/point',
      element: <RequireAuth />,
      children: [
        {
          path: '/',
          element: <Paperbase />,
          children: [
            { element: <Points />, index: true },
            { path: ':point_id', element: <TicketsByPoints /> },
            {
              path: '/createNewPoint',
              element: <CreateNewPoint />,
            },
            { path: '/addNewWorker', element: <AddNewWorker /> },
            { path: '/addInventoryItem', element: <AddInventoryItem /> },
            { path: '/inventoryItem/:warehouse_id', element: <EditInventoryItem /> },
            {
              path: '/editPoint/:point_id',
              element: <EditPoint />,
            },
            { path: '/settings', element: <СompanySettings /> },
            {
              path: '/createTicket/:point_id?',
              element: <CreateNewTiket />,
            },
            { path: '/tickets', element: <Tickets /> },
            { path: '/workers', element: <Workers /> },
            {
              path: '/items/:ticket_id/:point_id?',
              element: <Ticket />,
            },
            { path: '/workers/:user_id', element: <Worker /> },
            { path: '/clients/:client_id', element: <Client /> },
            { path: '/clients', element: <Clients /> },
            { path: '/addClient', element: <AddNewClient /> },
            { path: '/warehouse', element: <Warehouse /> },
            
          ],
        },
      ],
    },
    {
      path: 'createFirstPoint',
      element: <AddFirstPoint />,
    },
    /* public routes */
    {
      path: 'auth/:typePage/:token?',
      element: <AuthPage />,
    },
    {
      path: '*',
      element: <Page404 />,
    },
    /*{
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },*/
  ]);

  return routers;
};

export default Router;
