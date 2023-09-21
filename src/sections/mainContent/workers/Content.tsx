import { FC } from "react";
import {ticketAPI} from "../../../services/TicketService";
import StyledDataGridUsers from "../../../components/styled/StyledDataGridUsers";
import { userAPI } from "../../../services/UserService";

const Content: FC = () => {

  const {data: tickets, error, isLoading} = ticketAPI.useGetAllItemsTicketsQuery('')
  const {data: users, error:www, isLoading:eee} = userAPI.useGetAllUsersQuery('');

  console.log(users)

  return <StyledDataGridUsers users={users} error={error} isLoading={isLoading} />
};

export default Content;