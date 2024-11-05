// src/routes/MainRouter.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ForgotPasswordView from "../components/client/forgetpassword/ForgetPassword";
import Otp from "../components/client/forgetpassword/Otp";
import ConfirmPassword from "../components/client/forgetpassword/ConfirmPassword";
import ResetPassword from "../components/client/ResetPassword/ResetPassword";
import CandidateTable from "../components/HiredCandidate.js/CandidateTable";
import Requirement from "../components/client/requirements/Requirement";
import JobRequirementsTable from "../components/client/requirements/JobRequirementsTable";
import ClientDashboardView from "../views/ClientDashboardView";
import Login from "../components/Login/Login";

const MainRouter = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<ExampleView />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgotPasswordView />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/confirmpassword" element={<ConfirmPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/candidatetable" element={<CandidateTable />} />
        <Route path="/requirement" element={<Requirement />} />
        <Route path="/JobRequirementsTable" element={<JobRequirementsTable />} />
        <Route path="/dashboard" element={<ClientDashboardView />} />
      </Routes>
    </Router>
  );
};

export default MainRouter;