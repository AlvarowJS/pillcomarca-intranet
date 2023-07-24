import { File, Tag, FileText, BarChart, Table } from "react-feather";

export default [
  {
    id: "Tickets",
    title: "Tickets",
    icon: <Tag size={20} />,
    navLink: "/tickets",
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
];
