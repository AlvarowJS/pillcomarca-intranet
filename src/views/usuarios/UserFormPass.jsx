import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

const UserFormPass = ({ togglePass, modalPass, handleSubmit, register, reset, submit,}) => {
  return (
    <Modal isOpen={modalPass} toggle={togglePass}>
      <ModalHeader>
        Actualizar Contraseña
      </ModalHeader>
      <ModalBody>
            <form onSubmit={handleSubmit(submit)}>
                <div className='form-group'>
                <label>Contraseña</label>
                <input
                    className='form-control'
                    type='text'
                    placeholder='Ingrese su Contraseña'
                    {...register('password')}
                />
                </div><br />
                <button className='btn btn-primary'>Guardar</button>
            </form>
      </ModalBody>
    </Modal>
  )
}

export default UserFormPass