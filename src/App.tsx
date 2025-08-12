import './App.css';

import { Route, Routes } from 'react-router';
import { UserList } from './views/user.register.flow/UserList.view';
 import { UserInfo } from './views/user.register.flow/UserInfoForm.view';
import { UserWorkInfo  } from './views/user.register.flow/UserWorkInfoForm.view';


export default function MyForm() {
  return (
    <div className="App">
       <Routes>
         <Route path="/">
           <Route index element={<UserList/>} />
           <Route path="user-info" element={<UserInfo />} />
           <Route path="user-work-info" element={<UserWorkInfo />} />
         </Route>
       </Routes>
    </div>
  );
}


