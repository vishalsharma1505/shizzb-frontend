import { useEffect, useState } from "react";
import { FaBars, FaBell } from "react-icons/fa";

const AdminHeader = ({ setSidebarOpen }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const adminUser = localStorage.getItem("adminUser");

      if (adminUser) {
        setUser(JSON.parse(adminUser));
      }
    } catch (err) {
      console.error("Error loading admin user:", err);
    }
  }, []);

  return (
    <div className="admin-header">
      <div className="left">
        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(true)}
        >
          <FaBars />
        </button>

        <h4>Dashboard</h4>
      </div>

      <div className="right">
        <div className="notification">
          <FaBell />
        </div>

        <div className="admin-profile">
          <div className="avatar">
            {user?.name
              ? user.name.charAt(0).toUpperCase()
              : "A"}
          </div>

          <div>
            <h6>
              {user?.name || "Admin"}
            </h6>

            <small>
              {user?.role
                ? user.role.charAt(0).toUpperCase() +
                  user.role.slice(1)
                : "Administrator"}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;