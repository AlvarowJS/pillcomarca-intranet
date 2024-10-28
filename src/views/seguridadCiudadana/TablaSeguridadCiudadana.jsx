import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { Edit, Trash } from 'react-feather';
import { Card } from 'reactstrap'
import bdMuni from '../../api/bdMuni';

const TablaSeguridadCiudadana = ({
    data, actualizarSeguridadCiudadanaId,
    bdMuni, setActualizacion, actualizacion, URLCOLECCION, getAuthHeaders,
    resetColeccion, toggleColeccion,
    toggleArchivo, URLARCHIVOS, resetArchivos
}) => {
    const actualizacionColeccionId = (id) => {
        toggleColeccion.call()
        setActualizacion(!actualizacion)
        bdMuni.get(`${URLCOLECCION}/${id}`, getAuthHeaders())
            .then(res => {
                resetColeccion(res.data)
            })
            .catch(err => null)
    }
    const actualizacionArchivoId = (id) => {
        toggleArchivo.call()
        setActualizacion(!actualizacion)
        bdMuni.get(`${URLARCHIVOS}/${id}`, getAuthHeaders())
        .then(res=>{
            resetArchivos(res.data)
        })
        .catch(err => null)
    }
    
    const [activeCollection, setActiveCollection] = useState(null);

    const toggleCollection = (coleccionId) => {
        setActiveCollection(activeCollection === coleccionId ? null : coleccionId);
    };

    const ExpandedComponent = ({ data }) => {
        return (
            <div className="mx-5">
                <h5 className="my-1 fw-bold">COLECCIÓN</h5>
                {data?.seguridad_coleccions?.length > 0 ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th style={{ width: '18%' }} className="text-center"></th>
                                <th style={{ width: '10%' }}>ID</th>
                                <th style={{ width: '40%' }}>Nombre</th>
                                <th style={{ width: '20%' }}>Categoria Id</th>
                                <th style={{ width: '20%' }} className="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.seguridad_coleccions.map((coleccion) => (
                                <React.Fragment key={coleccion.id}>
                                    <tr>

                                        <td className="text-center">
                                            <button
                                                className={activeCollection === coleccion.id ? "btn btn-danger" : "btn btn-outline-secondary"}
                                                onClick={() => toggleCollection(coleccion.id)}
                                            >
                                                {activeCollection === coleccion.id ? "Ocultar Archivos" : "Mostrar Archivos"}
                                            </button>

                                        </td>
                                        <td>{coleccion.id}</td>
                                        <td>{coleccion.nombre_coleccion}</td>
                                        <td>{coleccion.seguridad_categoria_id}</td>
                                        <td className="text-center">
                                            <button
                                                className="btn btn-light"
                                                onClick={() => actualizacionColeccionId(coleccion?.id)}
                                                title="Editar coleccón"
                                            >
                                                <Edit />
                                            </button>
                                        </td>
                                    </tr>
                                    {activeCollection === coleccion.id && (
                                        <tr>
                                            <td colSpan="4">
                                                <ExpandedFiles archivos={coleccion.seguridad_archivos} />
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No hay colecciones registradas.</p>
                )}
            </div>
        );
    };

    // Subcomponente para mostrar los archivos dentro de cada colección
    const ExpandedFiles = ({ archivos }) => {
        return (
            <div className="mx-5">
                <h5 className="my-1 fw-bold">ARCHIVOS</h5>
                {archivos?.length > 0 ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th style={{ width: '10%' }}>ID</th>
                                <th style={{ width: '60%' }}>Nombre Archivo</th>
                                <th style={{ width: '30%' }}>Documento</th>
                                <th style={{ width: '10%' }} className="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {archivos.map((archivo) => (
                                <tr key={archivo.id}>
                                    <td>{archivo.id}</td>
                                    <td>{archivo.nombre_archivo}</td>
                                    <td>
                                        <a href={archivo.documento} target="_blank" rel="noopener noreferrer">
                                            Ver Documento
                                        </a>
                                    </td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-outline-success"
                                            onClick={() => actualizacionArchivoId(archivo.id)}
                                            title="Editar Archivo"
                                        >
                                            <Edit />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No hay archivos registrados.</p>
                )}
            </div>
        );
    };

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
            name: 'CATEGORIA',
            minWidth: '100px',
            selector: row => row?.categoria
        },
        {
            sortable: true,
            name: 'FECHA CREADO',
            minWidth: '100px',
            selector: row => new Date(row?.created_at).toLocaleDateString()
        },
        {
            sortable: true,
            name: 'FECHA ACTUALIZADO',
            minWidth: '100px',
            selector: row => new Date(row?.updated_at).toLocaleDateString()
        },
        {
            name: 'ACCIONES',
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
    ];

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
    );
};

export default TablaSeguridadCiudadana;
