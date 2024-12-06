import React, { FC } from 'react';

import StyledDataGridtTckets from '../../../components/styled/StyledDataGridTckets';
import { ticketAPI } from '../../../services/TicketService';

const Content: FC<{ point_id: string | undefined }> = ({ point_id }) => {
  const {
    data: tickets,
    error,
    isLoading,
  } = ticketAPI.useGetTicketsByPointQuery({ point_id });

  return (
    <StyledDataGridtTckets
      tickets={tickets}
      error={error}
      isLoading={isLoading}
    />
  );
};

export default Content;
