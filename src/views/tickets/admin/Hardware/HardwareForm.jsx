import React, { useEffect, useState } from 'react'
import { Button, Col, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import Select from 'react-select'

const HardwareForm = ({
    modal, toggle, submit, control, register,
    reset, errors, handleSubmit, toggleActualizacion,
    getAuthHeaders, URL, bdMuni, oficina, setOficina,

}) => {

    const [dependencias, setDependencias] = useState()
    const [tipos, setTipos] = useState()
    const handleChange = (selected) => {
        setOficina(selected);
    };
    useEffect(() => {
        bdMuni.get(URL, getAuthHeaders())
            .then(res => {
                setTipos(res.data)
            })
            .catch(err => { })

    }, [])
    useEffect(() => {
        bdMuni.get('/v1/cargos-dependencias')
            .then(res => {
                setDependencias(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    const options = dependencias?.map(option => ({
        value: option?.id,
        label: option?.nombre_dependencia
    }));
    return (
        <Modal isOpen={modal} toggle={toggle || toggleActualizacion} size='lg'>
            <ModalHeader>
                Crear Hardware
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit(submit)}>
                    <div className='form-group my-2'>
                        <label htmlFor="tipo_id">Tipo</label>
                        <select className="form-select" id="tipo_id" {...register("tipo_id")}>
                            {
                                tipos?.map(tipo => (
                                    <option key={tipo.id} value={tipo.id}>{tipo.nombre} </option>
                                ))
                            }
                        </select>

                    </div>
                    <div className='form-group my-2'>
                        <label htmlFor="procesador">Procesador</label>
                        <input
                            type="procesador"
                            className="form-control"
                            id="procesador"
                            placeholder='i5, i7, ryzen 7'
                            {...register('procesador')}
                        />
                    </div>
                    <div className='form-group my-2'>
                        <label htmlFor="ram">Ram</label>
                        <input
                            id="ram"
                            className="form-control"
                            type="text"
                            {...register('ram')}
                        />
                    </div>
                    <div className='form-group my-2'>
                        <label htmlFor="almacenamiento">Almacenamiento</label>
                        <input
                            id="almacenamiento"
                            className="form-control"
                            type="text"
                            {...register('almacenamiento')}
                        />
                    </div>
                    <div className='form-group my-2'>
                        <label htmlFor="tipo_alma">Tipo de Almacenamiento</label>
                        <select className="form-select" id="urgencia" {...register('tipo_alma')}  >
                            <option value="ssd">SSD</option>
                            <option value="hdd">HDD</option>
                        </select>
                    </div>
                    <div className='form-group my-2'>
                        <label htmlFor="ip">Ip</label>
                        <input
                            id="ip"
                            className="form-control"
                            type="text"
                            placeholder='xxx.xxx.xx.xxx'
                            {...register('ip')}
                        />
                    </div>
                    <div className='form-group my-2'>
                        <label htmlFor="marca">Marca</label>
                        <input
                            id="marca"
                            className="form-control"
                            type="text"
                            placeholder='intel o amd'
                            {...register('marca')}
                        />
                    </div>
                    <div className='form-group my-2'>
                        <label htmlFor="especif">Especificaciones</label>
                        <textarea type="text" className="form-control" id="especif"
                            {...register('especif')}
                        />
                    </div>
                    <div className='form-group my-2'>
                        <label htmlFor="cod_patrimonial">Código Patrimonial</label>
                        <input
                            id="cod_patrimonial"
                            className="form-control"
                            type="text"
                            {...register('cod_patrimonial')}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="oficina">Dependencia</label>
                        <Select
                            id="oficina"
                            value={oficina}
                            onChange={handleChange}
                            options={options}
                            isSearchable={true}
                            placeholder="No especifica"
                        />

                    </div>
                    <button className='btn btn-primary mb-2'>Enviar</button>
                </form>
            </ModalBody>
        </Modal>
    )
}

export default HardwareForm