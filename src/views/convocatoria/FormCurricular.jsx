import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

const FormCurricular = ({
  modal, toggle, handleSubmit, register, submit,
}) => {
  const [tipos, setTipos] = useState()
  useEffect(() => {
    bdMuni.get(URL, getAuthHeaders())
      .then(res => {
        setTipos(res.data)
      })
      .catch(err => { })

  }, [])
  return (
    <Modal isOpen={modal} toggle={toggle} size='lg'>
      <ModalHeader>
        Registrar Convocatoria
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(submit)}>
          <div className='form-group my-2'>
            <label htmlFor="">
              Nombre
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
              Archivo
            </label>
            <input
              className="form-control"
              type="text"
              placeholder='ingrese el archivo'
              {...register('archivo')}
            />
          </div>

          <div className='form-group my-2'>
            <label htmlFor="">
              Escoge la convocatoria
            </label>
            <select className="form-select" id="convocatoria_id" {...register("convocatoria_id")}>
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