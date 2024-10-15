import React from 'react';
import DataTable from 'react-data-table-component';
import { Edit, Trash } from 'react-feather';
import { Card } from 'reactstrap'

const TablaPortada = ({
    data, filter, search,
    actualizarPortadaId, eliminarPortada

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
            name: 'Nombre de la Portada',
            minWidth: '150px',
            selector: row => row?.nombre_portada
        },
        {
            sortable: true,
            name: 'foto',
            minWidth: '150px',
            selector: row => row?.foto,
            cell: row => (
                row?.foto ? (
                    <img src={`https://sv-yptplguxwm.cloud.elastika.pe/storage/fotosPortada/${row?.foto}`} 
                    width={100} height={100} target="_blank" rel="noopener noreferrer"/>
                        
                ) : (
                    <span>No hay imagen</span>
                )
            )
        },
        {
            sortable: true,
            name: 'Estado',
            minWidth: '100px',
            selector: row => row?.estado? 'Activo' : 'Inactivo',
        },
        {
            sortable: true,
            name: 'Enlace',
            minWidth: '100px',
            cell: row => (
                row?.enlace ? (
                    <a href={row.enlace} target="_blank" rel="noopener noreferrer">
                        Ver Enlace
                    </a>
                ) : (
                    <span>No hay enlace</span>
                )
            )
        },
        {
            sortable: true,
            name: 'Usuario ID',
            minWidth: '100px',
            selector: row => row?.user_id
        },
        {
            sortable: true,
            name: 'Fecha creado',
            minWidth: '100px',
            selector: row => new Date(row?.created_at).toLocaleDateString()
        },
        {
            sortable: true,
            name: 'Fecha actualizado',
            minWidth: '100px',
            selector: row => new Date(row?.updated_at).toLocaleDateString()
        },
        {
            name: 'Acciones',
            sortable: true,
            allowOverflow: true,
            cell: (row) => {
                return (
                    <div className='d-flex gap-1 my-1'>

                        <button className='btn btn-outline-primary'
                            onClick={() => actualizarPortadaId(row?.id)}
                        >
                            <Edit />
                        </button>
                        <button className='btn btn-outline-dark' style={{ backgroundColor: '#ffffff', color: 'red' }}
                            onClick={() => eliminarPortada(row?.id)}
                        >
                            <Trash />
                        </button>

                    </div>
                )
            }
        }
    ];

    return (
        <Card className='mt-2'>
            <DataTable
                noHeader
                pagination
                className='react-datatable'
                columns={columns}
                data={search ? filter : data}

            />
        </Card>
    );
};

export default TablaPortada;
