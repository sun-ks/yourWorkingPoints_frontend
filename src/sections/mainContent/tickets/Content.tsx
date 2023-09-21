import { FC } from "react";
import {ticketAPI} from "../../../services/TicketService";
import StyledDataGridtTckets from "../../../components/styled/StyledDataGridTckets";

const Content: FC = () => {

  const {data: tickets, error, isLoading} = ticketAPI.useGetAllItemsTicketsQuery('')

  return <StyledDataGridtTckets tickets={tickets} error={error} isLoading={isLoading} />
};

export default Content;