
import Registration from "./components/registration/Registration";
import Login from "./components/login/Login";

import Disk from "./components/disk/Disk";


import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { auth } from "./actions/user";

import HomePage from "./pages/homepage/HomePage";
import AppLayout from "./AppLayout";
import Profile from "./pages/profile/Profile";


import './App.scss'

function App() {
  const isAuth = useSelector(state => state.user.isAuth)
  const currentUser = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth())

  }, [])

  console.log(isAuth)
  console.log(currentUser)
  return (
    <>
      <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/my-disk" element={isAuth ? <Disk /> : <Navigate to="/" />} />
              <Route path="/profile" element={isAuth ? <Profile /> : <Navigate to="/" />} />
            </Route>
          
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Registration />} />
      </Routes>
    </>
  );
}

export default App;