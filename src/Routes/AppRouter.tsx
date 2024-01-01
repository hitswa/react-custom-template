import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthRoutes, DashboardRoutes } from "../Routes";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<>HOME</>} />
                <Route path="/auth/*" element={<AuthRoutes />} />
                <Route path="/dashboard/*" element={<DashboardRoutes />} />
                <Route path="/*" element={<>404</>} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;