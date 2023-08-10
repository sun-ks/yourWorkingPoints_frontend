import { FC, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import {itemAPI} from "../../../services/ItemService";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../../store/reducers/AuthSlice";
import getAuthorizationHeaders from "../../../utils/api/getAuthorizationHeaders";
import _ from 'lodash';

const Content: FC = () => {
  const { point_id } = useParams<{point_id: string}>();

  const accessToken = useSelector(selectAccessToken);
  const {data: items, error, isLoading} = itemAPI.useGetItemsQuery({...getAuthorizationHeaders(accessToken), point_id});

  return <>
    {items && !isLoading && !_.isEmpty(items) ? (
      items.map((item) => (
        <p key={item.item_id}>{item.name}</p>
      ))
    ) : isLoading ? (
      <p>Loading...</p>
    ) : (
      <p>No items available.</p>
    )}
  </>
};

export default Content;