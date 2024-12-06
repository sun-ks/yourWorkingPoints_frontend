import { FC } from 'react';

import StyledDataGridtTckets from '../../../components/styled/StyledDataGridTckets';
import { ticketAPI } from '../../../services/TicketService';

const Content: FC = () => {
  const {
    data: tickets,
    error,
    isLoading,
  } = ticketAPI.useGetAllItemsTicketsQuery('');

  return (
    <StyledDataGridtTckets
      tickets={tickets}
      error={error}
      isLoading={isLoading}
    />
  );
};

export default Content;
