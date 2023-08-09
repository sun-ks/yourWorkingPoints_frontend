import * as postAPI from './PostService';
import * as userAPI from './UserService';
import * as pointAPI from './PointService';
import * as itemAPI from './ItemService';

export default{
  ...postAPI,
  ...userAPI,
  ...pointAPI,
  ...itemAPI
}