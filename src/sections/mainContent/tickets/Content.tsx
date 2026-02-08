import { FC, useEffect } from 'react';

import StyledDataGridtTckets from '../../../components/styled/dataGrid/StyledDataGridTckets';
import { ticketAPI } from '../../../services/TicketService';
import { TNewTicketsCreatedByOtherUser } from './types';

const Content: FC<{
  newTicketsCreatedByOtherUser: TNewTicketsCreatedByOtherUser[];
}> = ({ newTicketsCreatedByOtherUser }) => {
  const {
    data: tickets,
    error,
    isLoading,
    refetch: refetchTickets,
  } = ticketAPI.useGetAllItemsTicketsQuery('');

  useEffect(() => {
    if (newTicketsCreatedByOtherUser.length > 0) {
      refetchTickets();
    }
  }, [newTicketsCreatedByOtherUser, refetchTickets]);

  return (
    <StyledDataGridtTckets
      tickets={tickets}
      error={error}
      isLoading={isLoading}
    />
  );
};

export default Content;
