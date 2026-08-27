import { Outlet } from 'react-router-dom';
import AppHeader from '../components/AppHeader.jsx';

export default function AppLayout() {
  return (
    <div className="app-shell" data-testid="app-layout">
      <AppHeader />
      <main id="main-content" className="container page-content">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container">โหมดห้องปฏิบัติการ · งดใช้ข้อมูลส่วนบุคคลจริง</div>
      </footer>
    </div>
  );
}
