import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import React, { FC, useEffect, useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';

import AlertDialog from '../../../components/AlertDialog/';
import { pointAPI } from '../../../services/PointService';
import { IPoint } from '../../../types/IPoint';

const Content: FC = () => {
  const [deletePoint] = pointAPI.useDeletePointMutation();

  const [pointsWithHaveTickets] =
    pointAPI.useGetPointsWithHaveTicketsMutation();

  const [openAlertDelete, setOpenAlertDelete] = useState<{
    open: boolean;
    title?: string;
    showSubmitBtn?: boolean;
  }>({
    open: false,
  });

  const { t } = useTranslation();

  const [pointIdForDelete, setPointIdForDelete] = useState('');

  const navigate = useNavigate();

  const [pointsHasTickets, setPointsHasTickets] = useState<IPoint[] | []>([]);

  async function fetchPoints() {
    const { data } = (await pointsWithHaveTickets('')) as {
      data: IPoint[] | [];
    };
    const points = await data;

    setPointsHasTickets(points);
  }

  const DEFAULT_TITLE_ALERT = t('point.delete_title_default');
  const HAS_TICKETS_TITLE_ALERT = t('point.delete_title_has_ticket');

  useEffect(() => {
    fetchPoints();
  }, []);

  const handleClose = () => {
    setOpenAlertDelete((prev) => ({ ...prev, open: false }));
  };

  const handleClickAgreeDelete = async () => {
    await deletePoint({ point_id: pointIdForDelete });
    fetchPoints();
  };

  return (
    <>
      <AlertDialog
        handleClose={handleClose}
        handleClickOk={handleClickAgreeDelete}
        isOpen={openAlertDelete.open}
        showSubmitBtn={openAlertDelete.showSubmitBtn}
        title={
          openAlertDelete.title ? openAlertDelete.title : DEFAULT_TITLE_ALERT
        }
      />

      {pointsHasTickets ? (
        pointsHasTickets.map((point, i) => {
          return (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              data-testid="content-point"
              key={`point-id-${i}`}
              sx={{
                padding: 1,
              }}
            >
              <Typography
                sx={{ cursor: 'pointer', marginRight: 1 }}
                onClick={() => navigate(`/${point.point_id}`)}
              >
                {point.name}
              </Typography>

              <Tooltip
                onClick={() => navigate(`/editPoint/${point.point_id}`)}
                title={t(`point.edit`)}
              >
                <IconButton>
                  <EditIcon sx={{ fontSize: 14 }} />
                </IconButton>
              </Tooltip>

              <Tooltip
                onClick={() => {
                  const alertModalTitle = point.hastickets
                    ? HAS_TICKETS_TITLE_ALERT
                    : undefined;
                  const showSubmitBtn = !point.hastickets;

                  setOpenAlertDelete({
                    open: true,
                    title: alertModalTitle,
                    showSubmitBtn,
                  });
                  setPointIdForDelete(point.point_id);
                }}
                title={t(`point.delete`)}
              >
                <IconButton>
                  <DeleteIcon sx={{ fontSize: 14 }} />
                </IconButton>
              </Tooltip>
            </Box>
          );
        })
      ) : (
        <p>No items available.</p>
      )}
    </>
  );
};

export default Content;
