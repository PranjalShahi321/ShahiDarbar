import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopbar from "../components/admin/AdminTopbar";

function AdminLayout() {
  return (
    <div className="flex bg-gray-100">

      <AdminSidebar />

      <div
        className="
          flex-1
          p-8
          min-h-screen
        "
      >
        <AdminTopbar />

        <Outlet />
      </div>

    </div>
  );
}

export default AdminLayout;