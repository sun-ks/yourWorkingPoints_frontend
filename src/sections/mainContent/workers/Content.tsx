import { FC } from "react";
import StyledDataGridUsers from "../../../components/styled/StyledDataGridUsers";
import { userAPI } from "../../../services/UserService";

const Content: FC = () => {
  const {data: users, error, isLoading} = userAPI.useGetAllUsersQuery('');

  return <StyledDataGridUsers users={users} type={"workers"} error={error} isLoading={isLoading} />
};

export default Content;