import Login from "./login/login";
import Home from "./dashboard/home";

import AdminVisitantes from "./dashboard/visitantes/admin_vistantes";

import AdminVisitas from "./dashboard/visitas/admin_visitas";
import AddVisitas from "./dashboard/visitas/add_visitas";
import EditVisitas from "./dashboard/visitas/edit_visitas";

import AdminUser from "./dashboard/admin_user/admin_user";
import AddUser from "./dashboard/admin_user/add_user";
import EditUser from "./dashboard/admin_user/edit_user";

import ReporteVisitas from "./dashboard/reportes/visitas";
import ReporteVisitantes from "./dashboard/reportes/visitantes";

const routesConfig = [
  { path: "/", element: <Login />, label: null },
  { path: "/home", element: <Home />, label: "Home" },
  {
    path: "/visitantes/admin_visitantes",
    element: <AdminVisitantes />,
    label: "Administrar visitantes",
    breadcrumbParent: "Apartado visitantes",
  },
  {
    path: "/visitas/admin_visitas",
    element: <AdminVisitas />,
    label: "Administrar visitas",
    breadcrumbParent: "Apartado visitas",
  },
  {
    path: "/visitas/add_visitas",
    element: <AddVisitas />,
    label: "Agregar visitas",
    breadcrumbParent: "Apartado visitas",
  },
  {
    path: "/visitas/edit_visitas",
    element: <EditVisitas />,
    label: "Editar visitas",
    breadcrumbParent: "Apartado visitas",
  },
  {
    path: "/reportes/visitas",
    element: <ReporteVisitas />,
    label: "Reporte de visitas",
  },
  {
    path: "/reportes/visitantes",
    element: <ReporteVisitantes />,
    label: "Reporte de visitantes",
  },
  {
    path: "/admin/admin_user",
    element: <AdminUser />,
    label: "Administrar usuarios",
    breadcrumbParent: "Apartado usuarios",
  },
  {
    path: "/admin/add_user",
    element: <AddUser />,
    label: "Agregar usuario",
    breadcrumbParent: "Apartado usuarios",
  },
  {
    path: "/admin/edit_user",
    element: <EditUser />,
    label: "Editar usuario",
    breadcrumbParent: "Apartado usuarios",
  },
];

export default routesConfig;
