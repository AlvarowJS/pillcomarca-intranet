import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { ChevronDown, Edit } from 'react-feather'
import { Card, CardHeader, CardTitle, Input, Label, Row, Col, Button } from 'reactstrap'



const TablaNoticias = ({ 
    updateNoticiaById, getData,
    search, filter

}) => {



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
            selector: row => row.fecha,
            cell: row => {
                return (
                    <>
                        <p>{row?.fecha}</p>
                    </>
                )
            }
        },
        {
            sortable: true,
            name: 'TITULO',
            minWidth: '200px',
            maxWidth: '450px',
            selector: row => row?.titulo,
            cell: row => {
                return (
                    <>
                        <p>{row?.titulo}</p>
                    </>
                )
            }
        },
        {
            sortable: true,
            name: 'NOTA DE PRENSA',
            minWidth: '555px',
            maxWidth: '700px',
            selector: row => row?.nota,
            cell: row => {
                return (
                    <>
                        <p>{row?.nota}</p>
                    </>
                )
            }
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
                className='react-dataTable'
                columns={serverSideColumns}
                data={search ? filter : getData}
            />
        </div>
    )
}

export default TablaNoticias