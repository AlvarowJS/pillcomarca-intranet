import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import bdMuni from '../../api/bdMuni'
const FormBases = ({
    data, toggleBases, modalBases, submitBases, handleSubmit,
    reset, register, getAuthHeaders
}) => {

    const [options, setOptions] = useState()
    useEffect(() => {
        bdMuni.get(URL, getAuthHeaders())
            .then(res => {
                setOptions(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <Modal isOpen={modalBases} toggle={toggleBases} size='lg'>
            <ModalHeader>
                Registrar Base
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit(submitBases)}>
                    <div className='form-group my-2'>
                        <label htmlFor="">
                            Nombre del Archivo
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder='ingrese nombres'
                            {...register('nombre')}
                        />
                    </div>
                    <div className='form-group my-2'>
                        <label htmlFor="">
                            Enlace de Archivo
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder='ingrese nombres'
                            {...register('archivo')}
                        />
                    </div>
                    <div className='form-group my-2'>
                        <label htmlFor="">
                            Proceso de Convocatoria
                        </label>
                        <select
                            className="form-select"
                            id="convocatoria_id"
                            {...register("convocatoria_id")}
                        >
                            {options?.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button className='btn btn-primary mb-2'>Enviar</button>
                </form>
            </ModalBody>
        </Modal>
    )
}

export default FormBases