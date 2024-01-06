import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthRouter, DashboardRouter } from "../Routes";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<>HOME</>} />
            <Route path="/auth/*" element={<AuthRouter />} />
            <Route path="/dashboard/*" element={<DashboardRouter />} />
            <Route path="/*" element={<>404</>} />
        </Routes>
    );
};

export default AppRouter;