import { useNavigate } from 'react-router-dom';

import React, { FC } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

export const UsedInventoryItems: FC<{
  t: (key: string) => string;
  quantityUsed: number;
  usedInTickets?: any[];
}> = ({ t, quantityUsed, usedInTickets }) => {
  const navigate = useNavigate();
  return (
    <div>
      <Accordion sx={{ color: 'text.secondary' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">
            {t('warehouse.field_used_quantity')}: {quantityUsed}
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{ textAlign: 'left', fontSize: 14, color: 'text.secondary' }}
        >
          <Typography sx={{ marginBottom: 2 }} component="div">
            {t('warehouse.used_in_tickets')}
          </Typography>
          <Typography
            sx={{ maxHeight: '200px', overflow: 'auto' }}
            component="div"
          >
            {usedInTickets &&
              usedInTickets.map((ticket, index) => (
                <Typography
                  sx={{ fontSize: 14, cursor: 'pointer' }}
                  onClick={() => navigate(`/items/${ticket.ticket_id}`)}
                  key={index}
                  component="div"
                >
                  {ticket.ticket_name} / {t('warehouse.quantity')}:{' '}
                  {ticket.used_count_this_ticket}{' '}
                </Typography>
              ))}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
