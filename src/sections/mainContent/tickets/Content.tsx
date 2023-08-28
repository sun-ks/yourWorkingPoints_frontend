import { FC } from "react";
import {itemAPI} from "../../../services/ITicketService";
import StyledDataGrid from "../../../components/styled/StyledDataGrid";

const Content: FC = () => {

  const {data: tickets, error, isLoading} = itemAPI.useGetAllItemsTicketsQuery('')

  return <StyledDataGrid tickets={tickets} error={error} isLoading={isLoading} />
};

export default Content;