import { FC, useState, useEffect } from "react";
import {pointAPI} from "../../../services/PointService";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../../store/reducers/AuthSlice";
import getAuthorizationHeaders from "../../../utils/api/getAuthorizationHeaders";
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Container, Stack, Box, Typography, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  useNavigate,
} from 'react-router-dom';

const Content: FC = () => {
  const accessToken = useSelector(selectAccessToken);
  const {data: points, error, isLoading} = pointAPI.useGetPointsQuery(getAuthorizationHeaders(accessToken));

  const navigate = useNavigate();
  return <>
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
          <Tooltip title="Delete">
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