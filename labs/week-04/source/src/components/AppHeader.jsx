function AppHeader({ title, subtitle }) {
  return (
    <header className="hero">
      <div className="container">
        <p className="eyebrow">CAMPUS SERVICE DESK</p>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </header>
  );
}

export default AppHeader;
