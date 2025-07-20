import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import ChooseRole from './pages/ChooseRole';

// User Pages
import UserDashboard from './pages/user/Dashboard';
import UserEvents from './pages/user/Events';
import UserOrgs from './pages/user/Orgs';

// Org Pages
import OrgDashboard from './pages/org/Dashboard';
import EventsCRUD from './pages/org/EventsCRUD';
import Attendees from './pages/org/Attendees';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/choose-role" element={<ChooseRole />} />
        <Route path="/signup/:role" element={<SignUp />} />

        {/* Protected user routes */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/events"
          element={
            <ProtectedRoute role="user">
              <UserEvents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orgs"
          element={
            <ProtectedRoute role="user">
              <UserOrgs />
            </ProtectedRoute>
          }
        />

        {/* Protected org routes */}
        <Route
          path="/org/dashboard"
          element={
            <ProtectedRoute role="org">
              <OrgDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/org/events"
          element={
            <ProtectedRoute role="org">
              <EventsCRUD />
            </ProtectedRoute>
          }
        />
        <Route
          path="/org/attendees"
          element={
            <ProtectedRoute role="org">
              <Attendees />
            </ProtectedRoute>
          }
        />

        {/* 404 fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
