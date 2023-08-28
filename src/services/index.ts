import * as postAPI from './PostService';
import * as userAPI from './UserService';
import * as pointAPI from './PointService';
import * as ticketAPI from './ITicketService';

export default{
  ...postAPI,
  ...userAPI,
  ...pointAPI,
  ...ticketAPI
}