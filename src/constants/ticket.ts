export const getTicketStatuses = (t: (key: string) => string) => [
  { value: 'inbox', text: t('statuses.inbox') },
  { value: 'in progress', text: t('statuses.in_progress') },
  { value: 'ask client', text: t('statuses.ask_client') },
  { value: 'done', text: t('statuses.done') },
  { value: 'paid', text: t('statuses.paid') },
  { value: 'cancelled', text: t('statuses.cancelled') },
  { value: 'hold', text: t('statuses.hold') },
];

export const getTicketPriorities = (t: (key: string) => string) => [
  { value: 'low', text: t('priorities.low') },
  { value: 'high', text: t('priorities.high') },
  { value: 'medium', text: t('priorities.medium') },
];
