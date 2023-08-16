import { FC, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Container, Stack, Box, Typography, IconButton, Tooltip } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

import AlertDialog from "../../../components/AlertDialog";

import {pointAPI} from "../../../services/PointService"

import {
  useNavigate,
} from 'react-router-dom';


const Content: FC = () => {

  const [deletePoint, {isError, error:errorDeletePoint}] = pointAPI.useDeletePointMutation();

  const {data: points, error, isLoading} = pointAPI.useGetPointsQuery('');

  const [openAlertDelete, setOpenAlertDelete] = useState(false);

  const [pointIdForDelete, setPointIdForDelete] = useState('');

  const handleClose = () => {
    setOpenAlertDelete(false);
  };

  const handleClickAgreeDelete = () => {
    deletePoint({point_id: pointIdForDelete})
  };

  const navigate = useNavigate();
  return <>
    <AlertDialog 
      handleClose={handleClose}
      handleClickOk={handleClickAgreeDelete}
      isOpen={openAlertDelete} 
      title={'Are you sure you want to delete this Point?'} />

    { points && !isLoading && !_.isEmpty(points) ? (
      points.map((point) => (
        <Box 
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
              setOpenAlertDelete(true); 
              setPointIdForDelete(point.point_id); 
            }}
            title="Delete">
            <IconButton>
              <DeleteIcon sx={{ fontSize: 14 }}/>
            </IconButton>
          </Tooltip>
        </Box>
      ))
    ) : isLoading ? (
      <p>Loading...</p>
    ) : (
      <p>No items available.</p>
    )}
  </>
};

export default Content;












