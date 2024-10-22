import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

const FormCurricular = ({
  tipos, toggleCurricular, handleSubmitCurricular, registerCurricular, submitCurricular, modalCurricular
}) => {

  return (
    <Modal isOpen={modalCurricular} toggle={toggleCurricular} size='lg'>
      <ModalHeader>
        Registrar evaluación curricular
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmitCurricular(submitCurricular)}>
          <div className='form-group my-2'>
            <label htmlFor="">
              Nombre del archivo
            </label>
            <input
              className="form-control"
              type="text"
              placeholder='ingrese nombres'
              {...registerCurricular('nombre', { required: true })}
            />
          </div>
          <div className='form-group my-2'>
            <label htmlFor="">
            Enlace de Archivo
            </label>
            <input
              className="form-control"
              type="text"
              placeholder='ingrese el archivo'
              {...registerCurricular('archivo', { required: true })}
            />
          </div>

          <div className='form-group my-2'>
            <label htmlFor="">
              Escoge la convocatoria
            </label>
            <select className="form-select"
              id="convocatoria_id"
              {...registerCurricular("convocatoria_id", { required: true })}>
              {
                tipos?.map(tipo => (
                  <option key={tipo.id} value={tipo.id}>{tipo.nombre} </option>
                ))
              }
            </select>
          </div>

          <button className='btn btn-primary mb-2'>Enviar</button>
        </form>
      </ModalBody>
    </Modal>
  )
}

export default FormCurricular