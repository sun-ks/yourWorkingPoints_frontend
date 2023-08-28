import { FC } from "react";
import {ticketAPI} from "../../../services/ITicketService";
import StyledDataGrid from "../../../components/styled/StyledDataGrid";

const Content: FC<{point_id: string | undefined}> = ({point_id}) => {

  const {data: tickets, error, isLoading} = ticketAPI.useGetTicketsByPointQuery({point_id});

  return <StyledDataGrid tickets={tickets} error={error} isLoading={isLoading} />
};

export default Content;