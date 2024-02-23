import React from 'react';
import DataTable from 'react-data-table-component';
import { Edit, Trash, Clock, CheckCircle, Activity } from 'react-feather'; // Importa los iconos necesarios
import { Card, Badge } from 'reactstrap';

const TicketUserTabla = ({
    data,
    actualizarTicketId,
    exportarPdf
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
            selector: row => row?.detalle,
            cell: row => {
                return (
                    <div>
                        {row?.detalle}
                    </div>
                )
            }
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
            name: 'Hora',
            minWidth: '50px',
            cell: row => {
                return (
                    <div>
                        {row?.hora}
                    </div>
                )
            }
        },

        {
            sortable: true,
            name: 'Fecha',
            minWidth: '50px',
            cell: row => {
                return (
                    <div>
                        {row?.fecha && new Date(row.fecha).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })}

                    </div>
                )
            }
        },
        {
            sortable: true,
            name: 'PDF',
            minWidth: '50px',
            cell: row => {
                return (
                    <div>
                        {
                            row?.estado == 3 ?
                                <button
                                    className='btn btn-danger'
                                    onClick={() => exportarPdf(row?.id)}
                                >
                                    PDF
                                </button>
                                : ''
                        }

                    </div>
                )
            }
        },
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
