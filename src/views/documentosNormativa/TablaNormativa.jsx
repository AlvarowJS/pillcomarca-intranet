import React from 'react'
import DataTable from 'react-data-table-component'
import { Edit, Trash } from 'react-feather'
import { Card } from 'reactstrap'
const TablaNormativa = ({
    data, actualizarNormativaId, eliminarNormativa
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
            cell: row => <div>{row?.nombre}</div>
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

export default TablaNormativa