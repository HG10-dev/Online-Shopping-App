import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./Login/Login";
import Register from './Registration/Register';
import ForgotPass from "./ForgotPass/ForgotPass";
import CustomerDashboard from './Product/Customer/CustomerDashboard';
import AdminPortal from './Product/Admin/AdminPortal';

import UserContext from "./ContextData/User/UserContext";
import { useState } from "react";



function App() {

  const [login, setLogin] = useState({});
  return (
    <BrowserRouter>

      <UserContext.Provider value={{ login, setLogin }}>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/login" Component={Login} />
          <Route path="/ForgotPassword" Component={ForgotPass} />
          <Route path="/Register" Component={Register} />
          <Route path="/CustomerDashboard" Component={CustomerDashboard}/>
          <Route path="/AdminPortal/*" Component={AdminPortal}/>
        </Routes>
      </UserContext.Provider>



    </BrowserRouter >
  );
}

export default App;
