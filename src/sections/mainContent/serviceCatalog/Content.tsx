import { FC } from 'react';

import StyledDataGridServiceCatalog from '../../../components/styled/dataGrid/StyledDataGridServiceCatalog';
import { serviceCatalogAPI } from '../../../services/ServiceCatalogService';

const Content: FC = () => {
  const {
    data: serviceItems,
    error,
    isLoading,
  } = serviceCatalogAPI.useGetServiceItemsByCompanyIdQuery(undefined);

  return (
    <StyledDataGridServiceCatalog
      data={serviceItems}
      error={error}
      isLoading={isLoading}
    />
  );
};

export default Content;
