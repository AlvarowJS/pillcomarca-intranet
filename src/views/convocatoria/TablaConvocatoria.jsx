import React from 'react'
import DataTable from 'react-data-table-component'
import { Edit, Trash } from 'react-feather'
import { Badge, Card, Button } from 'reactstrap'

const TablaConvocatoria = ({
    data
}) => {

    const columns = [
        {
            sortable: true,
            name: 'Nombre del Proceso',
            cell: row => {
                return (
                    <div>
                        <p
                        >  {row?.nombre}
                        </p>

                        {
                            row?.estado == 'activo' ?
                                (
                                    <Button
                                        className='mt-sm-0 mt-1'
                                        color='primary'
                                    >
                                        {row?.estado}
                                    </Button>

                                )
                                : (
                                    <Button
                                        color='info'
                                    >
                                        {row?.estado}

                                    </Button>

                                )
                        }

                    </div>
                )
            }
        },
        {
            minWidth: '300px',
            sortable: true,
            name: 'Bases',
            cell: row => {
                return (
                    <div >
                        {row?.conv_base?.map(item => (
                            <div key={item.id} sx={{
                            }}>
                                {/* <a className='convocatoria-card' href={item.archivo} target='_blank'>{item.nombre}</a> */}
                                {/* <button className='btn btn-success' onClick={() => window.location.href = item.archivo}> */}
                                <Button
                                    color='danger'
                                    className='mb-1'
                                    onClick={() => window.open(item.archivo)}>
                                    {item.nombre}
                                </Button>
                            </div>
                        ))}
                    </div>
                )
            }
        },
        {
            minWidth: '300px',
            sortable: true,
            name: 'Resultado E. Curricular',
            cell: row => {
                return (
                    <div className='convocatoria'>
                        {row?.result_cv?.map(item => (
                            <div key={item.id}>

                                {/* <a className='entrevista-card' href={item.archivo} target='_blank'>{item.nombre}</a> */}
                                <Button
                                    color='info'
                                    className='mb-1'
                                    onClick={() => window.open(item.archivo)}>
                                    {item.nombre}
                                </Button>
                            </div>
                        ))}
                    </div>
                )
            }
        },
        {
            minWidth: '300px',
            sortable: true,
            name: 'Resultado Final',
            cell: row => {
                return (
                    <div className='convocatoria'>
                        {row?.resultado?.map(item => (
                            <div key={item.id}>
                                {/* <a className='resultado-card' href={item.archivo} target='_blank'>{item.nombre}</a> */}
                                <Button
                                    className='mb-1'
                                    color="success"
                                    onClick={() => window.open(item.archivo)}>
                                    {item.nombre}
                                </Button>
                            </div>
                        ))}

                    </div>
                )
            }
        },

    ]
    return (
        <>
            <Card className='mt-2'>

                <DataTable
                    noHeader
                    pagination
                    className='react-dataTable'
                    columns={columns}
                    data={data}
                />
            </Card>
        </>
    )
}

export default TablaConvocatoria