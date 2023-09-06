import * as postAPI from './PostService';
import * as userAPI from './UserService';
import * as pointAPI from './PointService';
import * as ticketAPI from './TicketService';
import * as companyAPI from './CompanyService';

export default{
  ...postAPI,
  ...userAPI,
  ...pointAPI,
  ...ticketAPI,
  ...companyAPI
}