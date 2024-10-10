import React from 'react'
import DataTable from 'react-data-table-component'
import { Edit, Trash } from 'react-feather'
const TablaNormativa = ({
    data, actualizarNormativaId, eliminarNormativa, search, filter
}) => {
    const columns = [
        {
            sortable: true,
            name: 'ID',
            minWidth: '6%',
            maxWidth: '10%',
            selector: row => row?.id,
            cell: row => <div>{row?.id}</div>
        },
        {
            sortable: true,
            name: 'Nombres',
            minWidth: '20%',
            selector: row => row?.nombre,
            cell: row => {
                return (
                    <>
                    <div>{row?.nombre}</div>
                    </>
                )
            }
        },
        {
            sortable: true,
            name: 'Tipo de Documento',
            minWidth: '20%',
            selector: row => row?.tipodedocumento?.nombre,
            cell: row => <div>{row?.tipodedocumento?.nombre}</div>
        },
        {
            sortable: true,
            name: 'Descripción',
            minWidth: '20%',
            selector: row => row?.descripcion,
            cell: row => <div>{row?.descripcion}</div>
        },
        {
            sortable: true,
            name: 'Fecha',
            minWidth: '15%',
            selector: row => row?.fecha,
            cell: row => <div>{row?.fecha}</div>
        },
        {
            sortable: true,
            name: 'Enlaces',
            minWidth: '25px',
            cell: row => <a target="_blank" href={row?.archivo}>Ver Enlace</a>
        },
        {
            name: 'Acciones',
            sortable: true,
            allowOverflow: true,
            minWidth: '100px',
            maxWidth: '200px',
            cell: row => {
                return (
                    <div className='d-flex gap-1 my-1'>

                        <button className='btn btn-warning'
                            onClick={() => actualizarNormativaId(row?.id)}
                        >
                            <Edit />
                        </button>
                        <button className='btn' style={{ backgroundColor: '#DC3545', color: 'white' }}
                            onClick={() => eliminarNormativa(row?.id)}
                        >
                            <Trash />
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
            className='react-datatable'
            columns={columns}
            sortIcon={<Edit size={10} />}
            data={search ? filter : data}

        />
    </div>
)
}

export default TablaNormativa