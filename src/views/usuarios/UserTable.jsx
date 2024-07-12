import React from 'react';
import DataTable from 'react-data-table-component';
import { Edit, Edit2, Trash } from 'react-feather';

const UserTable = ({ data, actualizaUsuariosId, actualizarPassId }) => {
  const columns = [
    {
      sortable: true,
      name: "ID",
      selector: (row => row?.id),
    },
    {
      sortable: true,
      name: "Nombres",
      selector: (row => row?.nombres),
    },
    {
      sortable: true,
      name: "Apellidos",
      selector: (row => row?.apellidos),
    },
    {
      sortable: true,
      name: "Celular",
      selector: (row => row?.celular),
    },
    {
      sortable: true,
      name: "Correo",
      selector: (row => row?.email),
    },
    {
      sortable: true,
      name: "DNI",
      selector: (row => row?.dni),
    },
    {
      sortable: true,
      name: "Cargo",
      selector: (row => row?.cargo?.nombre_cargo),
    },
    {
      sortable: true,
      name: "Dependencia",
      selector: (row => row?.dependencia?.nombre_dependencia),
    },
    {
      sortable: true,
      name: "Rol",
      selector: (row => row?.role?.name),
    },
    {
      sortable: true,
      name: "Acciones",
      cell: (row) => {
        return (
          <>
            <button
              className='btn btn-warning'
              onClick={() => actualizaUsuariosId(row?.id)}
            >
              <Edit />
            </button>
            <button
              className='btn btn-secondary'
              onClick={() => actualizarPassId(row?.id)}
            >
              <Edit2 />
            </button>
          </>
        );
      },
    },
  ];
  return (
    <DataTable
      pagination
      className='react-datatable'
      columns={columns}
      data={data}
    />
  );
}

export default UserTable;
