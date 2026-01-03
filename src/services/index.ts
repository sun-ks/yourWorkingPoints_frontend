import * as clientAPI from './ClientService';
import * as companyAPI from './CompanyService';
import * as pointAPI from './PointService';
import * as postAPI from './PostService';
import * as refreshTokenAPI from './RefreshTokenService';
import * as ticketAPI from './TicketService';
import * as userAPI from './UserService';
import * as warehouseAPI from './WarehouseService';

export default {
  ...postAPI,
  ...userAPI,
  ...pointAPI,
  ...ticketAPI,
  ...companyAPI,
  ...clientAPI,
  ...warehouseAPI,
  ...refreshTokenAPI,
};
