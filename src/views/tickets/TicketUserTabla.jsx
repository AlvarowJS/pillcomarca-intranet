import React from 'react';
import DataTable from 'react-data-table-component';
import { Edit, Trash, Clock, CheckCircle, Activity } from 'react-feather'; // Importa los iconos necesarios
import { Card,Badge } from 'reactstrap';

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
            cell: row => {
                // Función para devolver el elemento correspondiente según el estado del ticket
                switch (row?.estado) {
                    case 1:
                        return (
                            <Badge color='light-primary'>
                                En Espera
                            </Badge>
                        );
                    case 2:
                        return (
                            <Badge color='light-warning'>
                                Atendiendose
                            </Badge>
                        );
                    case 3:
                        return (
                            <Badge color='light-success'>
                                Terminado
                            </Badge>
                        );
                    default:
                        return (
                            <Badge color='light-danger'>
                                En Borrador
                            </Badge>
                        );
                }
            }
        },
        
        
        
        {
            sortable: true,
            name: 'Fecha',
            minWidth: '50px',
            selector: row => row?.fecha
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
                );
            }
        }
    ];

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
    );
}

export default TicketUserTabla;
