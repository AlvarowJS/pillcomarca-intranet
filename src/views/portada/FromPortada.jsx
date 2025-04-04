import React, { useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

const FromPortada = ({
    toggle, modal, handleSubmit, register, reset, submit, setFoto, toggleActualizacion
}) => {

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFoto(file); // Actualiza la foto seleccionada
    };
    return (
        <Modal isOpen={modal} toggle={toggle || toggleActualizacion} size='lg'>
            <ModalHeader>
                Registrar imagen
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit(submit)}>
                    <div className='form-group my-2'>
                        <label htmlFor="">
                            Nombre de la portada
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder='Ingrese el nombre'
                            {...register('nombre_portada', { required: true })}
                        />
                    </div>
                    <div className='form-group my-2'>
                        <label>Estado</label>
                        <select
                            className="form-control"
                            {...register('estado', { required: true })}
                        >                            
                            <option value="1">Activo</option>
                            <option value="0">Inactivo</option>
                        </select>
                    </div>
                    <div className='form-group my-2'>
                        <label>Enlace del Imagen - Opcional</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder='Ingrese el enlace'
                            // {...register('enlace', { required: false })}
                        />
                    </div>
                    <div className="form-group mx-4 mb-2">
                        <label htmlFor="foto">Foto</label>
                        <input type="file" className="form-control" id="foto"
                            {...register('foto', { required: false })}
                            onChange={handleFileChange}
                        />
                    </div>
                    <button className='btn btn-primary mb-2' type="submit">
                        Guardar
                    </button>
                </form>
            </ModalBody>
        </Modal>
    );
};

export default FromPortada;
