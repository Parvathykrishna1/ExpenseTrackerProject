import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import PasswordReset from "./components/Auth/PasswordReset";
import Dashboard from "./pages/Dashboard";
import cors from "cors";
import Home from "./pages/Home";
import AddExpense from "./pages/AddExpense";
import UpdateExpenseItem from "./pages/UpdateExpenseItem";
import History from "./pages/History";
import Report from "./pages/Report";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/passwordreset" element={<PasswordReset />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add_expense" element={<AddExpense />} />
        <Route path="/update-listing/:itemId" element={<UpdateExpenseItem />} />
        <Route path="/history" element={<History />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </BrowserRouter>
  );
}
