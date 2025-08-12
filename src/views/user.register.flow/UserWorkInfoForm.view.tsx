
import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Stepper,
  Step,
  StepLabel,
  LinearProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { resetForm, updateField } from "../../store/user/form/slice";
import { addUser } from "../../store/user/form/slice";

const steps = ["Infos Básicas", "Infos Profissionais"];

export function UserWorkInfo () {
  const dispatch = useDispatch();
  const formData = useSelector((state) => (state as any).userForm);

  const navigate = useNavigate();
  const location = useLocation();

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
          {/* @ts-ignore */}
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
            alignItems: "center"
          }}
        >
          <Typography color="text.secondary">
            Colaboradores • Cadastrar Colaborador
          </Typography>
          <Avatar alt="User" src="/avatar.png" />
        </Box>

        {/* Progress */}
        <Box sx={{ mt: 2 }}>
          <LinearProgress
            variant="determinate"
            value={50}
            sx={{
              height: 3,
              borderRadius: 2,
              "& .MuiLinearProgress-bar": { backgroundColor: "#00C853" }
            }}
          />
        </Box>

        {/* Stepper e Form */}
        <Box sx={{ mt: 4, display: "flex", gap: 4 }}>
          {/* Stepper */}
          <Stepper activeStep={1} orientation="vertical">
            <Step completed>
              {/*@ts-ignore */}
              <StepLabel StepIconComponent={CheckCircleIcon}>
                Infos Básicas
              </StepLabel>
            </Step>
            <Step>
              <StepLabel>Infos Profissionais</StepLabel>
            </Step>
          </Stepper>

          {/* Form */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              Informações Profissionais
            </Typography>

            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel>Selecione um departamento</InputLabel>
              <Select
                value={formData.data.department}
                onChange={(e) => dispatch(updateField({ field: 'department', value: e.target.value }))}
              >
                <MenuItem value="Design">Design</MenuItem>
                <MenuItem value="TI">TI</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="Produto">Produto</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button 
                variant="text" 
                onClickCapture={() => navigate('/user-info')}
                sx={{ fontWeight: 600 }}>
                Voltar
              </Button>
              <Button
                variant="contained"
                onClickCapture={(e) => {
                  dispatch(addUser(formData.data))
                  dispatch(resetForm())
                  navigate('/');
                }}
                sx={{
                  backgroundColor: "#00C853",
                  "&:hover": { backgroundColor: "#00B248" }
                }}
              >
                Concluir
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
