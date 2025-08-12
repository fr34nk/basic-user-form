
export type UserType = {
    enabled: boolean, 
    firstName: string,
    lastName:string,
    email:string,
    avatar:string,
    title:string,
    department:string,
    birthday: string,
    phone:string,
    citizen_id: string,
    address:string,
    city:string,
    state:string,
    zip:string,
}

export const user: Partial<UserType> = {
    enabled: false,
    firstName: "",
    lastName: "",
    email: "",
    avatar: "",
    department: ""
}

export const userList = [
  {
    firstName: "Maria",
    email: "maria@sample.com",
    title: "Designer",
    department: "Marketing",
    avatar: "/avatars/avatar3.png",
    enabled: false
  }
] as Array<Partial<UserType>>;

