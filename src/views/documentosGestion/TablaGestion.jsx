import React from 'react'
import DataTable from 'react-data-table-component'
import { Edit, Trash } from 'react-feather'
import { Card } from 'reactstrap'
const TablaGestion = ({
  data,actualizarGestionId,eliminarGestion
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
      selector: row => row?.nombre
    },
    {
      sortable: true,
      name: 'Gestion',
      minWidth: '25px',
      selector: row => row?.gestion?.nombre
    },
    {
      sortable: true,
      name: 'Fecha',
      minWidth: '25px',
      selector: row => {
        // Verifica si row?.created_at es una cadena válida
        if (row?.created_at) {
          // Crea un nuevo objeto Date a partir de la cadena de fecha y hora
          const fecha = new Date(row.created_at);
          // Devuelve la fecha formateada en formato legible para los usuarios
          return fecha.toLocaleDateString();
        } else {
          // Si row?.created_at no es una cadena válida, devuelve una cadena vacía
          return '';
        }
      }
    },
    {
      sortable: true,
      name: 'Enlaces',
      minWidth: '25px',
      cell: row => <a target="_blank" href={row.link}>Enlace</a> // Cambia "Enlace" por el texto deseado
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
              onClick={() => actualizarGestionId(row?.id)}
            >
              <Edit />
            </button>
            <button className='btn' style={{ backgroundColor: '#DC3545', color: 'white' }}
              onClick={() => eliminarGestion(row?.id)}
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
      data={data}

    />
  </Card>
  )
}

export default TablaGestion