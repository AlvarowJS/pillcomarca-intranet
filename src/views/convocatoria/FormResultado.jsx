import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

const FormCurricular = ({
  tipos, toggleResultados, handleSubmitResultados, registerResultados, submitResultados, modalResultados
}) => {

  return (
    <Modal isOpen={modalResultados} toggle={toggleResultados} size='lg'>
      <ModalHeader>
        Registrar resultado
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmitResultados(submitResultados)}>
          <div className='form-group my-2'>
            <label htmlFor="">
              Nombre del archivo
            </label>
            <input
              className="form-control"
              type="text"
              placeholder='ingrese nombres'
              {...registerResultados('nombre', { required: true })}
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
              {...registerResultados('archivo', { required: true })}
            />
          </div>

          <div className='form-group my-2'>
            <label htmlFor="">
              Escoge la convocatoria
            </label>
            <select className="form-select"
              id="convocatoria_id"
              {...registerResultados("convocatoria_id", { required: true })}>
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