import React from 'react'
import DataTable from 'react-data-table-component'
import { Edit, Trash } from 'react-feather'
import { Card } from 'reactstrap'

const TablaDirectorio = ({
  data, filter, search,
  actualizarDirectorioId, eliminarDirectorio
}) => {
  const columns = [
    {
      sortable: true,
      name: 'ID',
      minWidth: '25px',
      maxWidth: '80px',
      selector: row => row?.id
    },
    {
      sortable: true,
      name: 'Nombres',
      minWidth: '25px',
      selector: row => row?.nombres
    },
    {
      sortable: true,
      name: 'Apellidos',
      minWidth: '50px',
      selector: row => row?.apellidos
    },
    {
      sortable: true,
      name: 'Correo',
      minWidth: '50px',
      selector: row => row?.correo
    },
    {
      sortable: true,
      name: 'Celular',
      minWidth: '50px',
      selector: row => row?.cel

    },
    {
      sortable: true,
      name: 'Cargo',
      minWidth: '50px',
      selector: row => row?.cargo
    },
    {
      sortable: true,
      name: 'Dependencia',
      minWidth: '50px',
      selector: row => row?.dependencia

    },
    {
      name: 'Acciones',
      sortable: true,
      allowOverflow: true,
      minWidth: '200px',
      maxWidth: '400px',
      cell: row => {
        return (
          <div className='d-flex gap-1 my-1'>

            <button className='btn btn-warning'
              onClick={() => actualizarDirectorioId(row?.id)}
            >
              <Edit />
            </button>
            <button className='btn' style={{ backgroundColor: '#DC3545', color: 'white' }}
              onClick={() => eliminarDirectorio(row?.id)}
            >
              <Trash />
            </button>
          </div>
        )
      }
    }

  ]
  return (
    <Card className='mt-2'>
      <DataTable
        noHeader
        pagination
        className='react-datatable'
        columns={columns}
        data={search ? filter : data}

      />
    </Card>
  )
}

export default TablaDirectorio