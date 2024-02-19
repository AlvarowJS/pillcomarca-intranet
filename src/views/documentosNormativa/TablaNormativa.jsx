import React from 'react'
import DataTable from 'react-data-table-component'
import { Edit, Trash } from 'react-feather'
import { Card } from 'reactstrap'
const TablaNormativa = ({
    data
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
            selector: row => row?.attributes?.nombre,
            cell: row => <div>{row?.attributes?.nombre}</div>
        },
        {
            sortable: true,
            name: 'Tipo de Documento',
            minWidth: '20%',
            selector: row => row?.attributes?.Tipodedocumento?.nombre,
            cell: row => <div>{row?.attributes?.Tipodedocumento?.nombre}</div>
        },
        {
            sortable: true,
            name: 'Descripción',
            minWidth: '20%',
            selector: row => row?.attributes?.descripcion,
            cell: row => <div>{row?.attributes?.descripcion}</div>
        },
        {
            sortable: true,
            name: 'Fecha',
            minWidth: '15%',
            selector: row => row?.attributes?.fecha,
            cell: row => <div>{row?.attributes?.fecha}</div>
        },
        {
            sortable: true,
            name: 'Enlaces',
            minWidth: '25px',
            cell: row => <a target="_blank" href={row.attributes?.archivo}>Ver Enlace</a> 
        } 
        
        
    ];
    
    
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