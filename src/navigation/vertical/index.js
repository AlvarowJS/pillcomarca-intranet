import { File, Tag, FileText, BarChart, UserCheck, Table, Edit, UserMinus, PieChart, UserPlus } from "react-feather";

export default [
  {
    id: "Dashboard",
    title: "Dashboard",
    icon: <PieChart size={20} />,
    navLink: "/dashboard",
  },
  {
    id: "Tickets",
    title: "Tickets",
    icon: <Tag size={20} />,
    navLink: "/tickets",
  }, 
  {
    id: "POI",
    title: "POI",
    icon: <FileText size={20} />,
    navLink: "/poi",
  },
  {
    id: "DocumentosGestion",
    title: "DocumentosGestion",
    icon: <FileText size={20} />,
    navLink: "/documentos-gestion",
  },
  {
    id: "DocumentosNormativa",
    title: "DocumentosNormativa",
    icon: <File size={20} />,
    navLink: "/documentos-normativa",
  },
  {
    id: "Noticias",
    title: "Noticias",
    icon: <Table size={20} />,
    navLink: "/noticias",
  },
  {
    id: "Registro",
    title: "Registro Visitas",
    icon: <Edit size={20} />,
    navLink: "/registro-visitas",
  },
  {
    id: "Intervencion",
    title: "Intervenciones",
    icon: <Edit size={20} />,
    navLink: "/intervenciones",
  },
  {
    id: "Convocatorias",
    title: "Convocatorias",
    icon: <UserMinus size={20} />,
    navLink: "/convocatorias",
  },
  {
    id: "Directorio",
    title: "Directorio",
    icon: <UserCheck size={20} />,
    navLink: "/directorio",
  },
  {
    id: "Usuarios",
    title: "Usuarios",
    icon: <UserPlus size={20} />,
    navLink: "/users",
  }
];

