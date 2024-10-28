import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

const FormArchivos = ({
    modalArchivos, toggleArchivo, handleSubmitArchivos, submitArchivos,
    registerArchivos, coleccion
}) => {
    return (
        <Modal isOpen={modalArchivos} toggle={toggleArchivo} size='lg'>
            <ModalHeader>
                Registrar archivo
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmitArchivos(submitArchivos)}>
                    <div className='form-group my-2'>
                        <label htmlFor="">
                            Nombre del archivo
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder='Nombre del archivo'
                            {...registerArchivos('nombre_archivo', { required: true })}
                        />
                    </div>
                    <div className='form-group my-2'>
                        <label htmlFor="">
                            Documento
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder='Ingrese el enlace documento'
                            {...registerArchivos('documento', { required: true })}
                        />
                    </div>
                    <div className='form-group my-2'>
                        <label htmlFor="">
                            Categoria Id
                        </label>
                        <select
                            className="form-select"
                            id="seguridad_coleccion_id"
                            {...registerArchivos("seguridad_coleccion_id", { required: true })}
                        >
                            {coleccion?.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.nombre_coleccion}
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

export default FormArchivos