import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Paper,
  TableSortLabel
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";

import translate from '../../config/translate.config';

import { nextStep } from '../../store/user/form/slice';

import { useSelector } from "react-redux";
import { RootState } from '../../store/index'
import { useCallback, useEffect, useState } from "react";
import {  getUserListAsync } from "../../store/user/form/thunks/user.async";

import { useAppDispatch } from "../../store/user/form/thunks/user.async";
import { firebaseHttpTransport } from "../../services/firebase.http";
import { getRandomAvatar } from "../../../src/utils/avatar";
import { TableComponent } from "./Table/Table.component";


export function UserList () {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch();

  const state = useSelector((state: RootState) => state);
  const { users, loading, error } = (state as any).userForm;

  useEffect(function () {
    dispatch(getUserListAsync({}));
  }, [dispatch])

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            borderRight: "1px solid #eee"
          }
        }}
      >
        <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <img src="/logos/generic_logo.png" alt="Flugo" width={60} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Brand 
          </Typography>
        </Box>
        <List>
          {/*@ts-ignore */}
          <ListItem button>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Colaboradores" />
          </ListItem>
        </List>
      </Drawer>

      {/* Conteúdo */}
      <Box sx={{ flex: 1, p: 4 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            { translate.user.colaborators }
          </Typography>
          <Avatar alt="User" src={"avatars/avatar_female_01.png"}/>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant="contained"
            onClick={() => { 
              nextStep()
              navigate('/user-info')
            }}
            sx={{
              backgroundColor: "#00C853",
              borderRadius: 2,
              px: 3,
              "&:hover": { backgroundColor: "#00B248" }
            }}
          >
            { translate.user.new_employee }
          </Button>
        </Box>

        {/* <EnhancedTable></EnhancedTable> */}
        <TableComponent
            as={TableContainer}
            users={users}
          component={Paper}
            
          sx={{
              flex: 1,
            borderRadius: 3,
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
          }}
        ></TableComponent>

      </Box>
    </Box>
  );
}
