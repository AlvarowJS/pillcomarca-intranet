import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

const FormDirectorio = ({
  modal, toggle, handleSubmit, register, submit,
  toggleActualizacion, getAuthHeaders, setFoto
}) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFoto(file)
    console.log(file)
  };
  return (
    <Modal isOpen={modal} toggle={toggle || toggleActualizacion} size='lg'>
      <ModalHeader>
        Registrar Funcionario
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(submit)}>
          <div className='form-group my-2'>
            <label htmlFor="">
              Nombres
            </label>
            <input
              className="form-control"
              type="text"
              placeholder='ingrese nombres'
              {...register('nombres')}
            />
          </div>
          <div className='form-group my-2'>
            <label htmlFor="">
              Apellidos
            </label>
            <input
              className="form-control"
              type="text"
              placeholder='ingrese apellidos'
              {...register('apellidos')}
            />
          </div>
          <div className='form-group my-2'>
            <label htmlFor="">
              Correo
            </label>
            <input
              className="form-control"
              type="text"
              placeholder='ingrese Correo'
              {...register('correo')}
            />
          </div>
          <div className='form-group my-2'>
            <label htmlFor="">
              Celular
            </label>
            <input
              className="form-control"
              type="text"
              placeholder='Ingrese el telefono'
              {...register('cel')}
            />
          </div>
          <div className='form-group my-2'>
            <label htmlFor="">
              Cargo
            </label>
            <input
              className="form-control"
              type="text"
              placeholder='Ingrese el Cargo'
              {...register('cargo')}
            />
          </div>
          <div className='form-group my-2'>
            <label htmlFor="">
              Dependencia
            </label>
            <input
              className="form-control"
              type="text"
              placeholder='Ingrese la dependencia'
              {...register('dependencia')}
            />
          </div>
          <div className="form-group mx-4 mb-2">
            <label htmlFor="foto">Foto</label>
            <input type="file" className="form-control" id="foto"
              {...register('foto')}
              onChange={handleFileChange}
            />
          </div>
          <button className='btn btn-primary mb-2'>Enviar</button>
        </form>
      </ModalBody>
    </Modal>
  )
}

export default FormDirectorio