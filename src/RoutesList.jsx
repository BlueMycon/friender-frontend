import React, { useContext } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from './Homepage';
import AuthForm from './AuthForm';
import ProfileForm from './ProfileForm';
import Matches from './Matches';
import Swipe from './Swipe';
import userContext from "./userContext";

 /** DESCRIPTION
*
* Props:
*
* State:
*
* PARENT -> RoutesList -> {CHILDREN}
*/

function RoutesList ({login, signUp, update}) {
  const { user } = useContext(userContext);


  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<AuthForm handleAuth={login} formTitle={"Login"} />} />
      <Route path="/signup" element={<AuthForm handleAuth={signUp} formTitle={"Signup"}/>} />
      {user &&
      <>
      <Route path="/profile" element={<ProfileForm update={update} />} />
      <Route path="/matches" element={<Matches />} />
      <Route path="/swipe" element={<Swipe />} />
      </>
      }
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default RoutesList;