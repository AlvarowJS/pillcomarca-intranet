import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { ChevronDown, Edit } from 'react-feather'
import { Card, CardHeader, CardTitle, Input, Label, Row, Col, Button } from 'reactstrap'



const TablaVisitas = ({ updateVisitaById, getData, setCurrentPage, currentPage }) => {



    // Columnas
    const serverSideColumns = [
        // {
        //     sortable: true,
        //     name: 'ID',
        //     minWidth: '25px',
        //     selector: row => row.id
        // },
        {
            sortable: true,
            name: 'Fecha',
            minWidth: '125px',
            selector: row => row.fecha
        },
        {
            sortable: true,
            name: 'Nombres',
            minWidth: '155px',
            selector: row => row?.usuario_publico?.nombre
        },
        {
            sortable: true,
            name: 'Apellidos',
            minWidth: '155px',
            selector: row => row?.usuario_publico?.apellidos
        },

        {
            sortable: true,
            name: 'DNI',
            minWidth: '225px',
            selector: row => row?.usuario_publico?.dni
        },
        {
            sortable: true,
            name: 'Tipo de Persona',
            minWidth: '175px',
            selector: row => row?.usuario_publico?.persona
        },
        {
            sortable: true,
            name: 'Asunto',
            minWidth: '175px',
            selector: row => row.asunto
        },
        {
            sortable: true,
            name: 'Oficina',
            minWidth: '175px',
            selector: row => row?.depedencia?.nombre_dependencia
        },
        {
            sortable: true,
            name: 'Hora Ingreso',
            minWidth: '175px',
            selector: row => row.hora_ingreso
        },
        {
            sortable: true,
            name: 'Hora Salida',
            minWidth: '175px',
            selector: row => row.hora_salida
        },
        {
            name: 'Acciones',
            sortable: true,
            allowOverflow: true,
            cell: row => {
                return (
                    <div className='local_buttons'>
                        <button className='btn btn-warning my-1' onClick={() => updateVisitaById(row?.id)}>
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
                columns={serverSideColumns}
                sortIcon={<ChevronDown size={10} />}
                data={getData}
                paginationPerPage={10} // Cantidad de elementos por página
                paginationRowsPerPageOptions={[10, 20, 30]} // Opciones para la cantidad de elementos por página
                paginationTotalRows={getData?.length} // Total de registros
                paginationDefaultPage={currentPage}
                onChangePage={(page) => setCurrentPage(page)}
            />
        </div>
    )
}

export default TablaVisitas