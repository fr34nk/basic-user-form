
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Switch,
  Button,
  Avatar,
  LinearProgress,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, updateField } from "../../store/user/form/slice";

const steps = ["Infos Básicas", "Infos Profissionais"];

export function UserInfo () {
  const dispatch = useDispatch();
  const formData  = useSelector((state) => (state as any).userForm);

  const navigate = useNavigate();
  const location = useLocation();

  // @ts-ignore
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
            borderRight: "1px solid #eee",
          },
        }}
      >
        <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <img src="/logo.png" alt="Flugo" width={30} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Flugo
          </Typography>
        </Box>
        <List>
        {/*//@ts-ignore */} 
          <ListItem button>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Colaboradores" />
          </ListItem>
        </List>
      </Drawer>

      {/* Content */}
      <Box sx={{ flex: 1, p: 4 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
            value={(formData.step / (steps.length - 1)) * 100}
            sx={{
              height: 3,
              borderRadius: 2,
              "& .MuiLinearProgress-bar": { backgroundColor: "#00C853" },
            }}
          />

        </Box>

        <Box sx={{ mt: 4, display: "flex", gap: 4, flexDirection: 'column' }}>
          <Box  sx={{ display: 'flex', flex: 1, padding: '1em', flexDirection: 'row' }}>
            <Box sx={{flex: 1, flexDirection: 'column' }}>
              <Stepper 
                activeStep={formData.step} orientation="vertical"
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          
            {/* Form */}
            <Box sx={{ flex: 4 }}>
              <Typography variant="h6" gutterBottom>
                Informações Básicas
              </Typography>
              <TextField
                fullWidth
                label="Name"
                value={formData.data.firstName}
                onChange={(e) => dispatch(updateField({ field: 'firstName', value: e.target.value })) }
                variant="outlined"
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                    borderColor: "#00C853",
                  },
                }}
              />
              <TextField
                fullWidth
                label="E-mail"
                placeholder="e.g. john@gmail.com"
                value={formData.data.email}
                onChange={(e) => dispatch(updateField({ field: 'email', value: e.target.value })) }
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 4 }}>
                <Switch
                  checked={formData.data.enabled ? true : false}
                  onChange={(e) => {
                    return dispatch(updateField({ field: 'enabled', value: !!!formData.data.enabled }))
                  }}
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#fff",
                      "& + .MuiSwitch-track": {
                        backgroundColor: "#00C853",
                      },
                    },
                  }}
                />
                <Typography>Ativar ao criar</Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button 
              onClickCapture={()=> navigate('/')}
              variant="text">Voltar</Button>
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{ backgroundColor: "#00C853", "&:hover": { backgroundColor: "#00B248" } }}
              onClick={() => { 
                dispatch(nextStep())
                navigate('/user-work-info')
              }}
            >
              Próximo
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
