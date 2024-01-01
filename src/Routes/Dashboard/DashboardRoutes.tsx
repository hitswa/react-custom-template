import React from "react";
import { Routes, Route } from "react-router-dom";

const DashboardRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<>DASHBOARD-INDEX</>} />
            <Route path="/about" element={<>DASHBOARD-ABOUT</>} />
            <Route path="/contact" element={<>DASHBOARD-CONTACT</>} />
            <Route path="/*" element={<>404</>} />
        </Routes>
    )
}

export default DashboardRoutes;