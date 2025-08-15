import { i } from "react-router/dist/development/index-react-server-client-CMphySRb";

interface Data  {
    key: number,
    enabled: boolean,
    firstName: string,
    lastName: string,
    email: string,
    avatar: string,
    department: string
}

function createData(
    key: number,
    enabled: boolean,
    firstName: string,
    lastName: string,
    email: string,
    avatar: string,
    department: string
): Data {
  return {
    key,
    enabled,
    firstName,
    lastName,
    email,
    avatar,
    department,
  };
}

export const rows: Data[] = [
  {
    key: 1,
    enabled: true,
    firstName: "Cupcake",
    lastName: "Smith",
    email: "cupcake.smith@example.com",
    avatar: "https://i.pravatar.cc/150?img=1",
    department: "Marketing",
  },
  {
    key: 2,
    enabled: false,
    firstName: "Donut",
    lastName: "Johnson",
    email: "donut.johnson@example.com",
    avatar: "https://i.pravatar.cc/150?img=2",
    department: "Sales",
  },
  {
    key: 3,
    enabled: true,
    firstName: "Eclair",
    lastName: "Williams",
    email: "eclair.williams@example.com",
    avatar: "https://i.pravatar.cc/150?img=3",
    department: "Engineering",
  },
  {
    key: 4,
    enabled: true,
    firstName: "Frozen",
    lastName: "Yoghurt",
    email: "frozen.yoghurt@example.com",
    avatar: "https://i.pravatar.cc/150?img=4",
    department: "HR",
  },
  {
    key: 5,
    enabled: false,
    firstName: "Gingerbread",
    lastName: "Brown",
    email: "gingerbread.brown@example.com",
    avatar: "https://i.pravatar.cc/150?img=5",
    department: "Finance",
  },
]


export const headCells = [
  {
    id: 'avatar',
    numeric: true,
    disablePadding: false,
    label: '',
  },
  {
    id: 'firstName',
    numeric: true,
    disablePadding: false,
    label: 'FirtName',
  },
  {
    id: 'lastName',
    numeric: true,
    disablePadding: false,
    label: 'Carbs (g)',
  },
  {
    id: 'email',
    numeric: true,
    disablePadding: false,
    label: 'Protein (g)',
  },
  {
    id: 'department',
    numeric: true,
    disablePadding: false,
    label: 'Protein (g)',
  },
  {
    id: 'enabled',
    numeric: false,
    disablePadding: false,
    label: 'Calories',
  },

]
