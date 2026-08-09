import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

const AdminLayout = ({ children }) => {

  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  useEffect(() => {

    const token =
      localStorage.getItem("adminToken");

    if (!token) {

      router.push("/admin/login");

    }

  }, []);

  return (

    <div className="admin-wrapper">

      <div
        className={
          sidebarOpen
            ? "sidebar active"
            : "sidebar"
        }
      >

        <AdminSidebar />

      </div>

      <div className="admin-main">

        <AdminHeader
          setSidebarOpen={setSidebarOpen}
        />

        <div className="admin-content">

          {children}

        </div>

      </div>

    </div>

  );

};

export default AdminLayout;