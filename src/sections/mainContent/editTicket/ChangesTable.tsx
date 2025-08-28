import { Table, TableBody, TableCell, TableRow } from '@mui/material';

import { ITicket_change } from '../../../types/IItem';

export const ChangesTable = ({
  change,
  t,
  isLast,
  ticketStatuses,
  ticketPriorities,
}: {
  change: ITicket_change;
  t(a: string): string;
  isLast: boolean;
  ticketStatuses: { value: string; text: string }[];
  ticketPriorities: { value: string; text: string }[];
}) => (
  <Table size="small" sx={{ marginBottom: !isLast ? 4 : 6 }}>
    <TableBody
      sx={{
        '& .MuiTableRow-root:nth-of-type(even)': {
          backgroundColor: '#f5f5f5',
        },
        '& .MuiTableRow-root:nth-of-type(odd)': {
          backgroundColor: '#ffffff',
        },
      }}
    >
      <TableRow>
        <TableCell align="left">
          {t('editTicket.changed_by')}{' '}
          {change.changed_by?.name && `${change.changed_by?.name} /`}{' '}
          {change.changed_by?.email}
        </TableCell>
        <TableCell align="right">
          {change.changed_at &&
            ` ${new Date(change.changed_at).toLocaleDateString()}`}
        </TableCell>
      </TableRow>

      {change.priority && (
        <TableRow>
          <TableCell align="left">
            {t('editTicket.changed_priority')}:
          </TableCell>
          <TableCell align="right">
            {' '}
            {
              ticketPriorities?.find((item) => item.value === change.priority)
                ?.text
            }
          </TableCell>
        </TableRow>
      )}
      {change.assigned_at && (
        <TableRow>
          <TableCell align="left">
            {t('editTicket.changed_assigned_at')}:
          </TableCell>
          <TableCell align="right">
            {change.assigned_at?.name && `${change.assigned_at?.name} /`}{' '}
            {change.assigned_at?.email}
          </TableCell>
        </TableRow>
      )}
      {change.status && (
        <TableRow>
          <TableCell align="left">{t('editTicket.changed_status')}:</TableCell>
          <TableCell align="right">
            {' '}
            {ticketStatuses?.find((item) => item.value === change.status)?.text}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
);
