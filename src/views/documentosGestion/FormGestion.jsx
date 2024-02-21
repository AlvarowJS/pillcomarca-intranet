import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import bdMuni from '../../api/bdMuni'
const URL = "/v1/gestion"
const FormGestion = ({
  toggle,
  modal,
  handleSubmit,
  submit,
  register,
  reset, getAuthHeaders
}) => {
  const [tipos, setTipos] = useState()
  useEffect(() => {
    bdMuni.get(URL, getAuthHeaders())
      .then(res => {
        setTipos(res.data)
      })
      .catch(err => { })

  }, [])

  console.log(tipos)
  return (
    <Modal isOpen={modal} toggle={toggle} size='lg'>
      <ModalHeader>
        Registrar Instrumento
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
              placeholder='Ingrese nombre'
              {...register('nombre')}
            />
          </div>
          <div className='form-group my-2'>
            <label htmlFor="">
              Link
            </label>
            <input
              className="form-control"
              type="text"
              placeholder='Ingrese Link '
              {...register('link')}
            />
          </div>
          <div className='form-group my-2'>
            <label htmlFor="gestion_id">Gestion</label>
            <select className="form-select" id="gestion_id" {...register("gestion_id")}>
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

export default FormGestion