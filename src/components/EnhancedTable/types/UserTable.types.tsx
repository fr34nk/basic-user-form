import { UserType } from "@/src/store/user/types/user.type";

export type Order = 'asc' | 'desc';


export type Data = UserType;


// export interface Data {
//   id: number;
//   calories: number;
//   carbs: number;
//   fat: number;
//   name: string;
//   protein: number;
// }


// export function createData(
//   id: number,
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
// ): Data {
//   return {
//     id,
//     name,
//     calories,
//     fat,
//     carbs,
//     protein,
//   };
// }


export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}


export interface EnhancedTableToolbarProps {
  numSelected: number;
}

