import React from 'react'
import DataTable from 'react-data-table-component'
import { ChevronDown, Edit } from 'react-feather'

const HardwareTabla = ({
  data, actualizarHardwareId, getData, search, filter
}) => {
  // Columnas
  const columns = [
    {
      sortable: true,
      name: 'ID',
      minWidth: '25px',
      selector: row => row.id
    },
    {
      sortable: true,
      name: 'Procesador',
      minWidth: '125px',
      selector: row => row.procesador
    },
    {
      sortable: true,
      name: 'Almacenamiento',
      minWidth: '155px',
      selector: row => row?.almacenamiento
    },
    {
      sortable: true,
      name: 'HDD/SSD',
      minWidth: '155px',
      selector: row => row?.tipo_alma
    },

    {
      sortable: true,
      name: 'Ip',
      minWidth: '225px',
      selector: row => row?.ip
    },
    {
      sortable: true,
      name: 'Marca',
      minWidth: '175px',
      selector: row => row.marca
    },
    {
      sortable: true,
      name: 'Especificaciones',
      minWidth: '175px',
      selector: row => row.especif,
      cell: row => {
        return (
          <>
          <p>{row?.especif}</p>
          </>
        )
      }
        
    },
    {
      sortable: true,
      name: 'Cod Patrimonial',
      minWidth: '175px',
      selector: row => row?.cod_patri,
      cell: row => {
        return (
          <>
              <p>{row?.cod_patri}</p>
          </>
        )
      }
    },
    {
      sortable: true,
      name: 'Dependencia',
      minWidth: '175px',
      selector: row => row?.dependencia?.nombre_dependencia,
      cell: row => {
        return (
            <>
                <p>{row?.dependencia?.nombre_dependencia}</p>
            </>
        )
    }
    },
    {
      sortable: true,
      name: 'Tipo',
      minWidth: '175px',
      selector: row => row?.tipo?.nombre
    },
    {
      name: 'Acciones',
      sortable: true,
      allowOverflow: true,
      cell: row => {
        return (
          <div className='local_buttons'>
            <button className='btn btn-warning my-1' onClick={() => actualizarHardwareId(row?.id)}>
              <Edit />
            </button>
          </div>
        )
      }
    }
  ]

  return (
    <div className='react-dataTable'>
      <DataTable
        noHeader
        pagination
        paginationServer
        className='react-dataTable'
        columns={columns}
        sortIcon={<ChevronDown size={10} />}
        data={search ? filter : data}
      />
    </div>
  )
}

export default HardwareTabla