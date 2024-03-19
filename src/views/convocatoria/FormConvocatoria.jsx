import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
const FormConvocatoria = ({
    modal, toggle, handleSubmit, register, submit,
}) => {
    return (
        <Modal isOpen={modal} toggle={toggle} size='lg'>
            <ModalHeader>
                Registrar Convocatoria
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit(submit)}>
                    <div className='form-group my-2'>
                        <label htmlFor="">
                            Nombre del Proceso
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
                            Estado
                        </label>
                        <select
                            className="form-select"
                            id="ubicacion_id"
                            {...register("estado")}
                        >
                            <option value="activo">Activo</option>
                            <option value="concluido">Concluido</option>
                        </select>
                    </div>
                    <button className='btn btn-primary mb-2'>Enviar</button>
                </form>
            </ModalBody>
        </Modal>
    )
}

export default FormConvocatoria