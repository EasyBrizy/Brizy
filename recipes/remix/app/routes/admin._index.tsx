import { Navigate } from "@remix-run/react";

export default function AdminPage() {
  return <Navigate to="/admin/pages" replace />;
}
