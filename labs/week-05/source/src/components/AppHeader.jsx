import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/requests/new', label: 'New Request', end: false },
  { to: '/about', label: 'About', end: false },
];

function navLinkClassName({ isActive }) {
  return isActive ? 'nav-link active' : 'nav-link';
}

export default function AppHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div>
          <p className="eyebrow">ENGSE203 • LAB 05</p>
          <p className="brand">Campus Service Request</p>
        </div>
        <nav aria-label="เมนูหลัก">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={navLinkClassName}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
