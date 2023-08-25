import { FC, useState, useEffect } from "react";

import { Box, Typography, IconButton, Tooltip } from '@mui/material';

import {isEmpty} from "lodash"

import {
  useNavigate,
} from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete';

import AlertDialog from "../../../components/AlertDialog";

import {pointAPI} from "../../../services/PointService";

import {IPoint} from "../../../types/IPoint";

const Content: FC = () => {
  const [deletePoint, {isError, error:errorDeletePoint}] = pointAPI.useDeletePointMutation();

  const {data: points, error, isLoading} = pointAPI.useGetPointsQuery('');

  const [pointsWithHaveTickets] = pointAPI.useGetPointsWithHaveTicketsMutation();

  const [openAlertDelete, setOpenAlertDelete] = useState<{
    open: boolean;
    title?: string;
    showSubmitBtn?: boolean;
  }>({
    open:false,
  });

  const [pointIdForDelete, setPointIdForDelete] = useState('');

  const navigate = useNavigate();

  const [pointsHasTickets, setPointsHasTickets] = useState<IPoint[] | []>([]);

  async function fetchPoints() {
    const { data } = await pointsWithHaveTickets('') as { data: IPoint[] | [] };

    const points = await data;

    setPointsHasTickets(points);
  }

  const DEFAULT_TITLE_ALERT = 'Are you sure you want to delete this Point?';
  const HAS_TICKETS_TITLE_ALERT = 'Only empty Points available for deletion';
  const TOOLTIP_TXT = 'Delete'

  useEffect(() => {
    fetchPoints();
  }, []);

  const handleClose = () => {
    setOpenAlertDelete((prev)=>({...prev, open:false}));
  };

  const handleClickAgreeDelete = async () => {
    await deletePoint({point_id: pointIdForDelete});
    fetchPoints();
  };

  return <>
    <AlertDialog 
      handleClose={handleClose}
      handleClickOk={handleClickAgreeDelete}
      isOpen={openAlertDelete.open} 
      showSubmitBtn={openAlertDelete.showSubmitBtn}
      title={openAlertDelete.title ? openAlertDelete.title : DEFAULT_TITLE_ALERT} />

    { pointsHasTickets && !isLoading && !isEmpty(points) ? (
      pointsHasTickets.map((point) =>  {
        return (<Box 
          display="flex" 
          alignItems="center"
          justifyContent="center"
          sx={{
            padding: 1
          }}>
          <Typography 
            sx={{ cursor: 'pointer', marginRight: 1 }}
            onClick={() => navigate(`/${point.point_id}`)}>
            {point.name}
          </Typography>
          <Tooltip 
            onClick={()=>{
              const alertModalTitle = point.hastickets ? HAS_TICKETS_TITLE_ALERT : undefined;
              const showSubmitBtn = !point.hastickets;

              setOpenAlertDelete({open: true, title: alertModalTitle, showSubmitBtn}); 
              setPointIdForDelete(point.point_id); 
            }}
            title={TOOLTIP_TXT}>
            <IconButton >
              <DeleteIcon sx={{ fontSize: 14 }}/>
            </IconButton>
          </Tooltip>
        </Box>
      )
    })
    ) : isLoading ? (
      <p>Loading...</p>
    ) : (
      <p>No items available.</p>
    )}
  </>
};

export default Content;












