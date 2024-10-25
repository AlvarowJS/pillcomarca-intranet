import React from 'react'
import DataTable from 'react-data-table-component';
import { Edit, Trash } from 'react-feather';
import { Card } from 'reactstrap'

const TablaSeguridadCiudadana = ({
    data, actualizarSeguridadCiudadanaId, 
}) => {
    const ExpandedComponent = ({ data }) => {
        return (
            <div className="mx-5">
                <h5 className="my-1 fw-bold">COLECCÓN</h5>
                {data?.seguridad_coleccions?.length > 0 ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Categoria Id</th>
                                <th className="text-center">Acciones</th> {/* Centra la columna */}
                            </tr>
                        </thead>
                        <tbody>
                            {data.seguridad_coleccions.map((seguridad, index) => (
                                <tr key={index}>
                                    <td>{seguridad.id}</td>
                                    <td>{seguridad.nombre_archivo}</td>
                                    <td>{seguridad.seguridad_categoria_id}</td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-outline-dark"
                                            onClick={() => actualizarBasesId(seguridad?.id)}
                                            title="Editar Colección"
                                        >
                                            <Edit />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No hay coleción registradas.</p>
                )}
                
            </div>
        );
    }
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
            name: 'Categoria',
            minWidth: '100px',
            selector: row => row?.categoria
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
                            onClick={() => actualizarSeguridadCiudadanaId(row?.id)}
                            title="Editar"
                        >
                            <span className="d-flex align-items-center">
                                <Edit />
                                <span className="ms-2">Editar</span>
                            </span>
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
                enableExpanding={true}
                expandableRows
                expandableRowsComponent={ExpandedComponent}

            />
        </Card>
    )
}

export default TablaSeguridadCiudadana