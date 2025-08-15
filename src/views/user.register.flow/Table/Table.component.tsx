import { ComponentType, ComponentProps, ElementType } from 'react';
import { getRandomAvatar } from '../../../utils/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Paper,
  TableSortLabel,
  Box,
  Avatar
 } from '@mui/material';

 // Define props type
type TProps<T extends  ElementType> = {
  as: ElementType<any>;
  users: any[];
} & ComponentProps<any>

// Define state type
interface MyComponentState {
}

export function TableComponent <TProps, MyComponentState> ({
    as, 
    users,
    ...props
}: any) {
    const defaultUser = []

    const Component = as || "div";

    return (
        <Component
            {...props}
        >
            <Table>
                <TableHead>
                <TableRow sx={{ bgcolor: 'whitesmoke'}}>
                    <TableCell sx={{ fontWeight: 600 }}>Nome</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Departamento</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {/*@ts-ignore*/}
                {(users||[]).map((user, idx) => (
                    <TableRow key={idx}>
                    <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Avatar src={getRandomAvatar()} alt={user.firstName} />
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
        {/* </TableContainer> */}
        </Component>
    )
}