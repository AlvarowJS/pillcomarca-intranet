// ** React Imports
import React, { useEffect, useState } from "react";

import { Fragment, lazy } from "react";
import { Route, Navigate, useNavigate } from "react-router-dom";
// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper";
// ** Route Components
import PublicRoute from "@components/routes/PublicRoute";

// ** Utils
import { isObjEmpty } from "@utils";
import DocumentosGestion from "../../views/documentosGestion/DocumentosGestion";
import DocumentosNormativa from "../../views/documentosNormativa/DocumentosNormativa";
import Tickets from "../../views/tickets/Tickets";
import Noticias from "../../views/noticias/Noticias";
import bdMuni from "../../api/bdMuni";
import RegistroVisitas from "../../views/registroVisitas/RegistroVisitas";
import Convocatoria from "../../views/convocatoria/Convocatoria";
import Intervencion from "../../views/intervencion/Intervencion";
import Directorio from "../../views/directorio/Directorio";
import Portada from "../../views/portada/Portada";
import SeguridadCiudadana from "../../views/seguridadCiudadana/SeguridadCiudadana";
import Hardware from "../../views/tickets/admin/Hardware/Hardware";
import Poi from "../../views/poi/Poi";
import Dashboard from "../../views/dashboard/Dashboard";
import Users from "../../views/usuarios/Users";

// import OperacionesTrans from "../../views/operaciones/OperacionesTrans";

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template";

// ** Default Route
const DefaultRoute = "/login";

const Error = lazy(() => import("../../views/Error"));

const AuthGuard = ({ children }) => {

  const [myRol, setMyRol] = useState()
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const objToken = { token: token }

    bdMuni.post('/token-auth', objToken, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setMyRol(res?.data?.role_id)
        const rol = res?.data?.role?.role_number

        if (!token) {
          navigate("/login");
        } else {
          // Aquí debe validar su token con su servidor para asegurarse de que es válido
          // Si el token no es válido, llame a "navigate" para redirigir al usuario a la página de inicio de sesión
          if (rol == "1") {
          } else if (rol == "2") {
            const restrictedRoutes = ["/dashboard", "/documentos-gestion", "/documentos-normativa", "noticias", "/tickets/hardware", "/users"];
            if (restrictedRoutes.includes(window.location.pathname)) {
              navigate("/error");
            }
          } else if (rol == "7") {
            const restrictedRoutes = ["/dashboard", "/documentos-gestion", "/documentos-normativa", "noticias", "/tickets/hardware", "/users"];
            if (restrictedRoutes.includes(window.location.pathname)) {
              navigate("/error");
            }
          }
          // imagen
          else if (rol == "8") {
            const restrictedRoutes = ["/dashboard", "/documentos-gestion", "/documentos-normativa", "/tickets/hardware", "/users"];
            if (restrictedRoutes.includes(window.location.pathname)) {
              navigate("/error");
            }
          }
          else if (rol == "6") {
            const restrictedRoutes = ["/dashboard", "/documentos-gestion", "/documentos-normativa", "noticias", "/tickets/hardware", "/users"];
            if (restrictedRoutes.includes(window.location.pathname)) {
              navigate("/error");
            }
          }
          else {
            const restrictedRoutes = ["/dashboard", "/documentos-gestion", "/documentos-normativa", "noticias", "/tickets/hardware", "/users"];
            if (restrictedRoutes.includes(window.location.pathname)) {
              navigate("/error");
            }
          }
        }


      })
      .catch(err => {
        navigate("/error")
      })

  }, [])


  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const rol = localStorage.getItem("rol");

  //   console.log(myRol, "234234")

  //   if (!token) {

  //     navigate("/login");
  //   } else {
  //     // Aquí debe validar su token con su servidor para asegurarse de que es válido
  //     // Si el token no es válido, llame a "navigate" para redirigir al usuario a la página de inicio de sesión
  //     if (rol === "1") {
  //     } else if (rol === "2") {
  //       const restrictedRoutes = ["/tickets"];
  //       if (restrictedRoutes.includes(window.location.pathname)) {
  //         navigate("/error");
  //       }
  //     }
  //     else {
  //       navigate("/login")
  //     }
  //   }
  // }, [navigate]);

  return <LayoutWrapper>{children}</LayoutWrapper>;
};

// const navigate = useNavigate();
// ** Merge Routes
const Routes = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to={DefaultRoute} />,

  },
  {
    path: "/dashboard",
    element: <AuthGuard><Dashboard /></AuthGuard>,
  },
  {
    path: "/tickets",
    element: <AuthGuard><Tickets /></AuthGuard>,
  },
  {
    path: "/poi",
    element: <AuthGuard><Poi /></AuthGuard>,
  },
  {
    path: "/tickets/hardware",
    element: <AuthGuard><Hardware /></AuthGuard>,
  },
  {
    path: "/documentos-gestion",
    element: <AuthGuard><DocumentosGestion /></AuthGuard>,
  },
  {
    path: "/documentos-normativa",
    element: <AuthGuard><DocumentosNormativa /></AuthGuard>,

  },
  {
    path: "/noticias",
    element: <AuthGuard><Noticias /></AuthGuard>,

  },
  {
    path: "/registro-visitas",
    element: <AuthGuard><RegistroVisitas /></AuthGuard>,

  },
  {
    path: "/intervenciones",
    element: <AuthGuard><Intervencion /></AuthGuard>,

  },
  {
    path: "/convocatorias",
    element: <AuthGuard><Convocatoria /></AuthGuard>,

  },
  {
    path: "/directorio",
    element: <AuthGuard><Directorio /></AuthGuard>,

  },
  {
    path: "/portada",
    element: <AuthGuard><Portada /></AuthGuard>,

  },
  {
    path: "/seguridad-ciudadana",
    element: <AuthGuard><SeguridadCiudadana /></AuthGuard>,
  },
  {
    path: "/users",
    element: <AuthGuard><Users /></AuthGuard>,

  },
  {
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank",
    },

  },

];

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    } else {
      return {};
    }
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute;
        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false);
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
              LayoutWrapper
              : Fragment;

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical";
  const layouts = ["vertical", "horizontal", "blank"];

  const AllRoutes = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export { DefaultRoute, TemplateTitle, Routes, getRoutes };
