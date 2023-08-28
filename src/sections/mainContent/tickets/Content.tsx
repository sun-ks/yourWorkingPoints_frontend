import { FC } from "react";
import {ticketAPI} from "../../../services/ITicketService";
import StyledDataGrid from "../../../components/styled/StyledDataGrid";

const Content: FC = () => {

  const {data: tickets, error, isLoading} = ticketAPI.useGetAllItemsTicketsQuery('')

  return <StyledDataGrid tickets={tickets} error={error} isLoading={isLoading} />
};

export default Content;