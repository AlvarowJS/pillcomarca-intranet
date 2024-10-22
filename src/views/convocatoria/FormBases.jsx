import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import bdMuni from '../../api/bdMuni'
const FormBases = ({
    options, toggleBases, modalBases, submitBases, handleSubmitBases,
    reset, registerBases, getAuthHeaders
}) => {


    return (
        <Modal isOpen={modalBases} toggle={toggleBases} size='lg'>
            <ModalHeader>
                Registrar Base
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmitBases(submitBases)}>
                    <div className='form-group my-2'>
                        <label htmlFor="">
                            Nombre del Archivo
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder='ingrese nombres'
                            {...registerBases('nombre', { required: true })}
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
                            {...registerBases('archivo', { required: true })}
                        />
                    </div>
                    <div className='form-group my-2'>
                        <label htmlFor="">
                            Proceso de Convocatoria
                        </label>
                        <select
                            className="form-select"
                            id="convocatoria_id"
                            {...registerBases("convocatoria_id", { required: true })}
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