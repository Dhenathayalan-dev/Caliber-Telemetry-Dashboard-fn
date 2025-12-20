import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import Dashboard from './page/Dashboard';
import SideBar from './component/sideMenu/SideBar';
import { UsersPage } from './page/UsersPage';
import { LoginPage } from './page/LoginPage';
import { ProtectedRoute } from './routes/protectedRoutes';
import { RegisterPage } from './page/Resiteration';
import NotFound from './page/NotFound';

const { Content } = Layout;

function AppLayout() {

  const location = useLocation();
  const showSidebar = location.pathname === '/dashboard' || location.pathname === '/users';

  return (
    <Layout className="app-layout">
      {showSidebar &&
        <div className='side-container'>
          <SideBar />
        </div>
      }

      <Layout className={showSidebar ? "main-layout" : ''}>
        <Content className="content">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegisterPage />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/users" element={
              <ProtectedRoute>
                <UsersPage />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
