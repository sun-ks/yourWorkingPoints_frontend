import { FC, useState, useEffect } from "react";
import {pointAPI} from "../../../services/PointService";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../../store/reducers/AuthSlice";
import getAuthorizationHeaders from "../../../utils/api/getAuthorizationHeaders";
import { Link } from 'react-router-dom';
import _ from 'lodash';

const Content: FC = () => {
  const accessToken = useSelector(selectAccessToken);
  const {data: points, error, isLoading} = pointAPI.useGetPointsQuery(getAuthorizationHeaders(accessToken));

  return <>
    { points && !isLoading && !_.isEmpty(points) ? (
      points.map((point) => (
        <p>
          <Link to={`/${point.point_id}`}>{point.name}</Link>
        </p>
      ))
    ) : isLoading ? (
      <p>Loading...</p>
    ) : (
      <p>No items available.</p>
    )}
  </>
};

export default Content;