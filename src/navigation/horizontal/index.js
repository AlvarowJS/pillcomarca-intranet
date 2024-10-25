import { PieChart, Clipboard, FileText, File, Globe, Edit, CheckCircle, Briefcase, Phone, FolderPlus, Users, UserCheck, Shield } from "react-feather";

export default [
  {
    id: "Dashboard",
    title: "Dashboard",
    icon: <PieChart size={20} />,  // Este es adecuado para un panel de control general.
    navLink: "/dashboard",
  },
  {
    id: "Tickets",
    title: "Tickets",
    icon: <Clipboard size={20} />,  // Un clipboard representa mejor la idea de tickets o tareas.
    navLink: "/tickets",
  },
  {
    id: "POI",
    title: "POI",
    icon: <FileText size={20} />,  // Documentación específica.
    navLink: "/poi",
  },
  {
    id: "DocumentosGestion",
    title: "DocumentosGestion",
    icon: <FileText size={20} />,  // También adecuado para documentos.
    navLink: "/documentos-gestion",
  },
  {
    id: "DocumentosNormativa",
    title: "DocumentosNormativa",
    icon: <File size={20} />,  // Documentos normativos.
    navLink: "/documentos-normativa",
  },
  {
    id: "Noticias",
    title: "Noticias",
    icon: <Globe size={20} />,  // El ícono de globo se asocia con noticias o información general.
    navLink: "/noticias",
  },
  {
    id: "Registro",
    title: "Registro Visitas",
    icon: <Edit size={20} />,  // Representa edición o creación de registros.
    navLink: "/registro-visitas",
  },
  {
    id: "Intervencion",
    title: "Intervenciones",
    icon: <CheckCircle size={20} />,  // Indica acción completada o intervención.
    navLink: "/intervenciones",
  },
  {
    id: "Convocatorias",
    title: "Convocatorias",
    icon: <Briefcase size={20} />,  // Un maletín es más representativo para convocatorias o procesos.
    navLink: "/convocatorias",
  },
  {
    id: "Directorio",
    title: "Directorio",
    icon: <UserCheck size={20} />,  // Representa un directorio de contactos de las personas.
    navLink: "/directorio",
  },
  {
    id: "Portada",
    title: "Portada",
    icon: <FolderPlus size={20} />,  // Representa una portada o una carpeta destacada.
    navLink: "/portada",
  },
  {
    id: "Seguridad ciudadana",
    title: "Seguridad ciudadana",
    icon: <Shield size={20} />,  // Representa seguridad y protección.
    navLink: "/seguridad-ciudadana",
  },
  {
    id: "Usuarios",
    title: "Usuarios",
    icon: <Users size={20} />,  // Un ícono de grupo es más adecuado para usuarios.
    navLink: "/users",
  }
];
