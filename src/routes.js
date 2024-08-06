import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TopPage from './TopPage';
import RecipientList from './RecipientList';
import HelloWorld from './HelloWorld';
import CompletionScreen from './CompletionScreen';
import Login from './Login';
import Request from './Request';
import Request_link from './Request_link'; 
import PaymentScreen from './PaymentScreen' // 追加
import { useAuth } from './AuthContext';

function PrivateRoute({ children }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/" element={<PrivateRoute><TopPage /></PrivateRoute>} />
      <Route path="/recipients" element={<PrivateRoute><RecipientList /></PrivateRoute>} />
      <Route path="/send" element={<PrivateRoute><HelloWorld /></PrivateRoute>} />
      <Route path="/completion" element={<PrivateRoute><CompletionScreen /></PrivateRoute>} />
      <Route path="/request" element={<PrivateRoute><Request /></PrivateRoute>} />
      <Route path="/request-link" element={<PrivateRoute><Request_link /></PrivateRoute>} /> 
      <Route path="/payment-screen" element={<PrivateRoute><PaymentScreen /></PrivateRoute>} /> 
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;