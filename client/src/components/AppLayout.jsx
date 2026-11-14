import React from 'react';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import BottomNav from './BottomNav';

const AppLayout = ({ children }) => {
  return (
    <div className="app-shell-container d-flex min-vh-100 bg-main">
      {/* Desktop Persistent Left Sidebar */}
      <Sidebar />

      {/* Main App Content Area */}
      <div className="app-main-canvas flex-grow-1 d-flex flex-column min-vh-100">
        <TopHeader />
        <main className="app-content-body flex-grow-1 px-3 px-md-4 py-3">
          {children}
        </main>
      </div>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <BottomNav />
    </div>
  );
};

export default AppLayout;
