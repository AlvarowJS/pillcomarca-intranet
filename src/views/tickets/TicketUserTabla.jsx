import React from 'react'
import DataTable from 'react-data-table-component'
import { Edit, Trash } from 'react-feather'
import { Card } from 'reactstrap'

const TicketUserTabla = ({
    data,
    actualizarTicketId
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
            name: 'Detalle',
            minWidth: '25px',
            selector: row => row?.detalle
        },
        {
            sortable: true,
            name: 'Estado',
            minWidth: '50px',
            selector: row => row?.estado
        },
        {
            sortable: true,
            name: 'Fecha',
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
            name: 'Acciones',
            sortable: true,
            allowOverflow: true,
            minWidth: '200px',
            maxWidth: '400px',
            cell: row => {
                return (
                    <div className='d-flex gap-1 my-1'>

                        <button className='btn btn-warning'
                            onClick={() => actualizarTicketId(row?.id)}
                        >
                            <Edit />
                        </button>
                
                    </div>
                )
            }
        }

    ]
    return (
        <>
            <Card className='mt-2'>
                <DataTable
                    noHeader
                    pagination
                    className='react-datatable'
                    columns={columns}
                    data={data}

                />
            </Card>
        </>
    )
}

export default TicketUserTabla