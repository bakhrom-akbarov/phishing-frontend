import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Phishing } from './pages/Phishing';
import { Attempts } from './pages/Attempts';
import { NotFound } from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import { Awareness } from "./pages/Awareness";

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/phishing"
          element={
            <ProtectedRoute>
              <Phishing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/attempts"
          element={
            <ProtectedRoute>
              <Attempts />
            </ProtectedRoute>
          }
        />
        <Route path="/awareness/:id" element={<Awareness />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </Router>
  );
};
