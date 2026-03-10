import { Table, TableBody, TableCell, TableRow } from '@mui/material';

import { ITicket_change } from '../../../types/IItem';

export const ChangesTable = ({
  change,
  t,
  ticketStatuses,
  ticketPriorities,
}: {
  change: ITicket_change;
  t(a: string): string;
  isLast: boolean;
  ticketStatuses: { value: string; text: string }[];
  ticketPriorities: { value: string; text: string }[];
}) => (
  <Table size="small" sx={{ marginBottom: 4 }}>
    <TableBody>
      <TableRow>
        <TableCell align="left">
          {t('editTicket.changed_by')}
          {change.changed_at &&
            ` ${new Date(change.changed_at).toLocaleDateString()}`}
        </TableCell>
        <TableCell align="right">
          {change.changed_by?.name && `${change.changed_by?.name}`}
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
