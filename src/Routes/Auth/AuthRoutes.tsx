import React from "react";
import { Routes, Route } from "react-router-dom";

const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="/"  element={<>AUTH</>} />
            <Route path="/login"  element={<>AUTH-LOGIN</>} />
            <Route path="/signup" element={<>AUTH-SIGNUP</>} />
            <Route path="/forget" element={<>AUTH-FORGET</>} />
            <Route path="/*" element={<>404</>} />
        </Routes>
    )
}

export default AuthRoutes;