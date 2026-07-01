import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import MyBookings from "./pages/MyBookings";
import AdminDashboard from "./pages/AdminDashboard";
import AddEvent from "./pages/AddEvent";
import CreateAdmin from "./pages/CreateAdmin";
import Profile from "./pages/Profile";
import PaymentSuccess from "./pages/PaymentSuccess";
import AdminReports from "./pages/AdminReports";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import Layout from "./components/Layout";
import AdminLayout from "./components/AdminLayout";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Toaster 
          position="top-right" 
          toastOptions={{ 
            duration: 4000, 
            style: { background: '#1a1a1a', color: '#fff', border: '1px solid #333' } 
          }} 
        />
        <Routes>
          {/* Public and User Routes with Global Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/events" element={
              <ProtectedRoute>
                <Events />
              </ProtectedRoute>
            } />
            <Route path="/bookings" element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/payment-success" element={<PaymentSuccess />} />
          </Route>

          {/* Admin Routes with Admin Layout */}
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/reports" element={
              <AdminProtectedRoute>
                <AdminReports />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/add-event" element={
              <AdminProtectedRoute>
                <AddEvent />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/create-admin" element={
              <AdminProtectedRoute>
                <CreateAdmin />
              </AdminProtectedRoute>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;