import { FC } from 'react';

import StyledDataGridWarehouse from '../../../components/styled/StyledDataGridWarehouse';
import { pointAPI } from '../../../services/PointService';
import { warehouseAPI } from '../../../services/WarehouseService';

const Content: FC = () => {
  const { data, error, isLoading } =
    warehouseAPI.useGetWarehouseItemsByCompanyIdQuery(undefined);

  const { data: points } = pointAPI.useGetPointsQuery(undefined);

  return (
    <StyledDataGridWarehouse
      warehouse={data}
      points={points}
      error={error}
      isLoading={isLoading}
    />
  );
};

export default Content;
