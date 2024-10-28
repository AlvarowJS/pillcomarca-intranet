import React from 'react'
import DataTable from 'react-data-table-component';
import { Edit, Trash } from 'react-feather';
import { Card } from 'reactstrap'

const TablaConvocatoria = ({
    data, actualizarConvocatoriaId, bases,
    toggleBases, URLBASES, bdMuni, resetBases,
    getAuthHeaders, actualizacion, setActualizacion,
    toggleCurricular, URLCURRICULAR, resetCurricular,
    toggleResultados, URLRESULTADOS, resetResultados
}) => {

    const actualizarBasesId = (id) => {
        toggleBases.call()
        setActualizacion(!actualizacion)
        bdMuni.get(`${URLBASES}/${id}`, getAuthHeaders())
            .then(res => {
                resetBases(res.data)
            })
            .catch(err => null)
    }

    const actualizarCurricularId = (id) => {
        toggleCurricular.call()
        setActualizacion(!actualizacion)
        bdMuni.get(`${URLCURRICULAR}/${id}`, getAuthHeaders())
            .then(res => {
                resetCurricular(res.data)
            })
            .catch(err => null)
    }

    const actualizarResultadoId = (id) => {
        toggleResultados.call()
        setActualizacion(!actualizacion)
        bdMuni.get(`${URLRESULTADOS}/${id}`, getAuthHeaders())
            .then(res => {
                resetResultados(res.data)
            })
            .catch(err => null)
    }
    const ExpandedComponent = ({ data }) => {
        return (
            <div className="mx-5">
                <h5 className="my-1 fw-bold">BASES</h5>
                {data?.conv_base?.length > 0 ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Archivo</th>
                                <th className="text-center">Acciones</th> {/* Centra la columna */}
                            </tr>
                        </thead>
                        <tbody>
                            {data.conv_base.map((base, index) => (
                                <tr key={index}>
                                    <td>{base.id}</td>
                                    <td>{base.nombre}</td>
                                    <td>{base.archivo}</td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-outline-dark"
                                            onClick={() => actualizarBasesId(base?.id)}
                                            title="Editar Base"
                                        >
                                            <Edit />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No hay bases registradas.</p>
                )}

                <h5 className="my-1 fw-bold">RESULTADO DE EVALUACIÓN CURRICULAR</h5>
                {data?.result_cv?.length > 0 ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Archivo</th>
                                <th className="text-center">Acciones</th> {/* Centra la columna */}
                            </tr>
                        </thead>
                        <tbody>
                            {data.result_cv.map((cv, index) => (
                                <tr key={index}>
                                    <td>{cv.id}</td>
                                    <td>{cv.nombre}</td>
                                    <td>{cv.archivo}</td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-outline-dark"
                                            onClick={() => actualizarCurricularId(cv?.id)}
                                            title="Editar Base"
                                        >
                                            <Edit />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No hay resultados registrados de evaluación curricular.</p>
                )}

                <h5 className="my-1 fw-bold">RESULTADO FINAL</h5>
                {data?.resultado?.length > 0 ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Archivo</th>
                                <th className="text-center">Acciones</th> {/* Centra la columna */}
                            </tr>
                        </thead>
                        <tbody>
                            {data.resultado.map((resultado, index) => (
                                <tr key={index}>
                                    <td>{resultado.id}</td>
                                    <td>{resultado.nombre}</td>
                                    <td>{resultado.archivo}</td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-outline-dark"
                                            onClick={() => actualizarResultadoId(resultado?.id)}
                                            title="Editar Base"
                                        >
                                            <Edit />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No hay resultados registrados.</p>
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
            nombre: 'Nombre',
            minWidth: '150px',
            selector: row => row?.nombre,
            cell: row => {
                return (
                    <div>
                        {row?.nombre}
                    </div>
                )
            }
        },
        {
            sortable: true,
            name: 'Estado',
            minWidth: '100px',
            selector: row => row?.estado
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
                            onClick={() => actualizarConvocatoriaId(row?.id)}
                            title="Editar Convocatoria"
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
                bases={bases}
                options={data}
                enableExpanding={true}
                expandableRows
                expandableRowsComponent={ExpandedComponent}

            />
        </Card>
    )
};

export default TablaConvocatoria