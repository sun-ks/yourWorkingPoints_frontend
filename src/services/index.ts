import * as postAPI from './PostService'
import * as userAPI from './UserService'

export default{
  ...postAPI,
  ...userAPI
}