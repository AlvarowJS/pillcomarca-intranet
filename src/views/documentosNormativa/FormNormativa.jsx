import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import bdMuni from '../../api/bdMuni'
const URL = "/v1/tipodedocumento"
const FormNormativa = ({
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
                console.log(res.data)
            })
            .catch(err => { })

    }, [])
    console.log(tipos)
    return (
        <Modal isOpen={modal} toggle={toggle} size='lg'>
            <ModalHeader>
                Registrar Normativa
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
                    <div className="form-group  my-2">
                        <label htmlFor="fecha">Fecha</label>
                        <input type="date" className="form-control"
                            id="fecha"
                            {...register('fecha')}
                        />
                    </div>
                    <div className='form-group my-2'>
                        <label htmlFor="">
                            Descripcion
                        </label>
                        <textarea type="text" className="form-control" id="descripcion"
                            {...register('descripcion')}
                        />
                        {/* <input
                            className="form-control"
                            type="text"
                            placeholder='Ingrese nombre'
                            {...register('descripcion')}
                        /> */}
                    </div>
                    <div className='form-group my-2'>
                        <label htmlFor="">
                            Link
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder='Ingrese Link '
                            {...register('archivo')}
                        />
                    </div>
                    <div className='form-group my-2'>
                        <label htmlFor="tipodedocumento_id">TipoDocumento</label>
                        <select className="form-select" id="tipodedocumento_id" {...register("tipodedocumento_id")}>
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

export default FormNormativa
