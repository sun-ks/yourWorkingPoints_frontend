import { FC } from "react";
import StyledDataGridClients from "../../../components/styled/StyledDataGridClients";
import { clientAPI } from "../../../services/ClientService";

const Content: FC = () => {

  const {data: clients, error, isLoading} = clientAPI.useGetClientsByCompanyIdQuery('');

  return <StyledDataGridClients clients={clients} type={"workers"} error={error} isLoading={isLoading} />
};

export default Content;