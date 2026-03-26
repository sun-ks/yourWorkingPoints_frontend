import { useRoutes } from 'react-router-dom';

import React, { FC } from 'react';

import Paperbase from './components/Paperbase';
import AddFirstPoint from './pages/AddFirstPoint';
import AuthPage from './pages/AuthPage';
import Page404 from './pages/Page404';
import RequireAuth from './pages/RequireAuth';
import AddInventoryItem from './sections/mainContent/addInventoryItem/layout';
import AddNewClient from './sections/mainContent/addNewClient/layout/AddNewClient';
import AddNewWorker from './sections/mainContent/addNewWorker/layout/AddNewWorker';
import AddService from './sections/mainContent/addService/layout';
import Client from './sections/mainContent/client/layout/Client';
import Clients from './sections/mainContent/clients/layout/Clients';
import ContactUs from './sections/mainContent/contactUs/index';
import CreateNewPoint from './sections/mainContent/createNewPoint/layout/CreateNewPoint';
import CreateNewTiket from './sections/mainContent/createNewTicket/layout/CreateNewTicket';
import СompanySettings from './sections/mainContent/editCompany/layout/СompanySettings';
import EditInventoryItem from './sections/mainContent/editInventoryItem/layout';
import EditPoint from './sections/mainContent/editPoint/layout/EditPoint';
import EditService from './sections/mainContent/editService/layout';
import Ticket from './sections/mainContent/editTicket/layout/Ticket';
import Points from './sections/mainContent/points/layout/Points';
import ServiceCatalog from './sections/mainContent/serviceCatalog/layout';
import Tickets from './sections/mainContent/tickets/layout/Tickets';
import TicketsByPoints from './sections/mainContent/ticketsByPoints/layout/TicketsByPoints';
import Warehouse from './sections/mainContent/warehouse/layout';
import Worker from './sections/mainContent/worker/layout/Worker';
import Workers from './sections/mainContent/workers/layout/Workers';

const Router: FC = () => {
  const routers = useRoutes([
    /* protected routes */
    {
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
            { path: '/add-service', element: <AddService /> },
            { path: '/edit-service/:id', element: <EditService /> },
            {
              path: '/inventoryItem/:warehouse_id',
              element: <EditInventoryItem />,
            },
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
            { path: '/service-catalog', element: <ServiceCatalog /> },
            { path: '/contact-us', element: <ContactUs /> },
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
