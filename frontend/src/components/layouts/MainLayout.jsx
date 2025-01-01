import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { HiChat, HiUsers, HiUser, HiCog } from "react-icons/hi";

const MainLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      path: "/chat",
      icon: HiChat,
      label: "Messages",
    },
    {
      path: "/friends",
      icon: HiUsers,
      label: "Friends",
    },
    { path: "/profile", icon: HiUser, label: "Profile" },
    { path: "/settings", icon: HiCog, label: "Settings" },
  ];

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex fixed left-0 top-0 bottom-0 w-72 flex-col bg-white border-r">
        {/* App Logo */}
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold text-primary-600">GistMe</h1>
          <p className="text-sm text-gray-500">Connected with 5 friends</p>
        </div>

        {/* Navigation Links with Enhanced Notifications */}
        <nav className="flex-1 overflow-y-auto p-4 scrollbar-hide">
          {navigationItems.map((item) => (
            <div key={item.path} className="mb-2">
              <Link
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 group
                  ${
                    location.pathname === item.path
                      ? "bg-primary-50 text-primary-600"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
              </Link>

              {/* Notification Previews */}
              {item.notifications && item.notifications.length > 0 && (
                <div className="ml-11 mt-1 space-y-1">
                  {item.notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="text-xs text-gray-500 bg-gray-50 rounded-lg p-2"
                    >
                      {notification.sender && (
                        <span className="font-medium text-gray-700">
                          {notification.sender}:
                        </span>
                      )}{" "}
                      {notification.preview || notification.text}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* User Profile Preview */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex items-center gap-3">
            <img
              src="https://ui-avatars.com/api/?name=User"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">Your Name</h3>
              <p className="text-sm text-gray-500">online</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Simplified */}
      <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t z-50">
        <div className="flex justify-around items-center">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={handleNavClick}
              className={`flex flex-col items-center p-3
                ${
                  location.pathname === item.path
                    ? "text-primary-600"
                    : "text-gray-500"
                }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <div className="md:ml-72">
        <main className="min-h-screen pt-0 pb-16 md:py-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
