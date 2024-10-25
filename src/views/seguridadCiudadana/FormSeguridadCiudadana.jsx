import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
const FormConvocatoria = ({
    modal, toggle, handleSubmit, register, submit,
}) => {
    return (
        <Modal isOpen={modal} toggle={toggle} size='lg'>
            <ModalHeader>
                Registrar Categoria
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit(submit)}>
                    <div className='form-group my-2'>
                        <label htmlFor="">
                            Categoria
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder='Ingrese categoria'
                            {...register('categoria', { required: true })}
                        />
                    </div>
                    <button className='btn btn-primary mb-2'>Enviar</button>
                </form>
            </ModalBody>
        </Modal>
    )
}

export default FormConvocatoria