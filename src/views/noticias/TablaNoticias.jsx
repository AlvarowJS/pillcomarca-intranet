import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { ChevronDown, Edit } from 'react-feather'
import { Card, CardHeader, CardTitle, Input, Label, Row, Col, Button } from 'reactstrap'



const TablaNoticias = ({ updateNoticiaById, getData, setCurrentPage, currentPage }) => {



    // Columnas
    const serverSideColumns = [
        {
            sortable: true,
            name: 'ID',
            minWidth: '25px',
            maxWidth: '100px',
            selector: row => row.id
        },
        {
            sortable: true,
            name: 'Fecha',
            minWidth: '25px',
            maxWidth: '150px',
            selector: row => row.fecha
        },
        {
            sortable: true,
            name: 'TITULO',
            minWidth: '100px',
            maxWidth: '150px',
            selector: row => row?.titulo
        },
        {
            sortable: true,
            name: 'NOTA DE PRENSA',
            minWidth: '155px',
            maxWidth: '200px',
            selector: row => row?.nota
        },
        {
            sortable: true,
            name: 'REFERENCIA',
            minWidth: '155px',
            maxWidth: '155px',
            selector: row => row?.referencia
        },

        {
            sortable: true,
            name: 'CATEGORIA',
            minWidth: '225px',
            maxWidth: '250px',
            selector: row => row?.categoria?.nombre_categoria
        },
        {
            sortable: true,
            name: 'AUTOR',
            minWidth: '175px',
            maxWidth: '150px',
            selector: row => row?.user?.nombres
        },
      
        {
            name: 'Acciones',
            sortable: true,
            allowOverflow: true,
            maxWidth: '150px',
            cell: row => {
                return (
                    <div className='local_buttons'>
                        <button className='btn btn-warning my-1' onClick={() => updateNoticiaById(row?.id)}>
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

export default TablaNoticias