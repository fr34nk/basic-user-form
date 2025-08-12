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
  Paper
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";

import { setStep } from '../../store/user/form/slice';

import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../store/index'


export function UserList () {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const userData = (state as any).userForm;

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
          <img src="/logo.png" alt="Flugo" width={30} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Flugo
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
            Colaboradores
          </Typography>
          <Avatar alt="User" src="/avatar.png" />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant="contained"
            onClick={() => { 
              dispatch(setStep(1));
              navigate('/user-info')
            }}
            sx={{
              backgroundColor: "#00C853",
              borderRadius: 2,
              px: 3,
              "&:hover": { backgroundColor: "#00B248" }
            }}
          >
            Novo Colaborador
          </Button>
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 3,
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Nome</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Departamento</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/*@ts-ignore*/}
              {(userData.users||[]).map((user, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Avatar src={user.avatar} alt={user.firstName} />
                      {user.firstName}
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>
                    <Chip
                      label={user?.enabled ? 'Ativo' : 'Inativo'}
                      sx={{
                        backgroundColor:
                          user?.enabled === true
                            ? "rgba(0,200,83,0.1)"
                            : "rgba(244,67,54,0.1)",
                        color:
                          user?.enabled === true ? "#00C853" : "#F44336",
                        fontWeight: 600
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
