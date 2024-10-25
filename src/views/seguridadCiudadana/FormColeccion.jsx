import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

const FormColeccion = ({
    modalColeccion, toggleColeccion, handleSubmitColeccion,
    submitColeccion, registerColeccion, options
}) => {
    return (
        <Modal isOpen={modalColeccion} toggle={toggleColeccion} size='lg'>
            <ModalHeader>
                Registrar Coleccion
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmitColeccion(submitColeccion)}>
                    <div className='form-group my-2'>
                        <label htmlFor="">
                            Nombre
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder='Ingrese categoria'
                            {...registerColeccion('nombre_coleccion', { required: true })}
                        />
                    </div>
                    <div className='form-group my-2'>
                        <label htmlFor="">
                            Categoria Id
                        </label>
                        <select
                            className="form-select"
                            id="seguridad_categoria_id"
                            {...registerColeccion("seguridad_categoria_id", { required: true })}
                        >
                            {options?.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.categoria}
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

export default FormColeccion