import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import { styled } from "@mui/material/styles";

// Custom styled component using MUI's styled function
const StyledRouterLink = styled(RouterLink)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.main,
  "&:hover": {
    textDecoration: "underline",
  },
}));

export default StyledRouterLink;