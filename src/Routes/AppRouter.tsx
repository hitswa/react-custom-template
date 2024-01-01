import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthRouter, DashboardRouter } from "../Routes";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<>HOME</>} />
                <Route path="/auth/*" element={<AuthRouter />} />
                <Route path="/dashboard/*" element={<DashboardRouter />} />
                <Route path="/*" element={<>404</>} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;