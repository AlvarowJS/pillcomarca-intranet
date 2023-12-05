import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import bdMuni from '../../api/bdMuni'
import Select from 'react-select'
import { Plus, X } from 'react-feather'

const FormNoticia = ({
    modal, toggle, submit, control, register,
    reset, errors, handleSubmit,
    formArray, setFormArray, formArrayBack, setFormArrayBack, increaseCount, deleteForm,
    handleChange
}) => {
    

    return (

        <Modal isOpen={modal} toggle={toggle} size='lg'>
            <ModalHeader toggle={toggle}>
                Registrar Noticia
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit(submit)}>
                    <div className="form-group mx-4 mb-2">
                        <label htmlFor="fecha">Fecha</label>
                        <input type="date" className="form-control"
                            id="fecha"
                            {...register('fecha')}
                        />
                    </div>

                    <div className="form-group mx-4 mb-2">
                        <label htmlFor="nombre">Titulo</label>
                        <input type="text" className="form-control" id="titulo"
                            {...register('titulo')}
                            placeholder="Ingrese titulo de la noticia"
                            required
                        />
                    </div>

                    <div className="form-group mx-4 mb-2">
                        <label htmlFor="nota">Nota</label>
                        <textarea type="text" className="form-control" id="nota"
                            {...register('nota')}
                        />
                    </div>

                    <div className="form-group mx-4 mb-2">
                        <label htmlFor="referencia">Referencia</label>
                        <textarea type="text" className="form-control" id="referencia"
                            {...register('referencia')}
                        />
                    </div>


                    <div className="form-group mx-4 mb-2">
                        <label htmlFor="categoria_id">Tipo de noticia </label>
                        <select className="form-select" id="categoria_id" {...register('categoria_id')}  >
                            <option value="1">Nota de prensa</option>
                            <option value="2">Campaña</option>
                            <option value="3">Comunicado</option>
                        </select>
                    </div>
                    <div className="form-group mx-4 mb-2">
                        <label htmlFor="">Imagenes</label>
                        {
                            formArray.map((formData, index) => (

                                //i => (
                                // <Form key={i}>
                                <Row className='justify-content-between align-items-center'>
                                    <Col className=''>
                                        <Label className='form-label' >
                                            Link de Imagen
                                        </Label>
                                        <Input
                                            type='text'
                                            // value={formArray[i]?.red_social || ''}
                                            value={formData.imagen || ''}

                                            onChange={e => handleChange(index, 'imagen', e.target.value)}
                                        />
                                    </Col>


                                    <Col>
                                        <Button color='danger' className='text-nowrap mt-2'
                                            onClick={
                                                () => deleteForm(index)
                                                // (e) => deleteForm(e)
                                            }
                                            outline>
                                            <X size={14} className='' />
                                            <span>Quitar</span>
                                        </Button>
                                    </Col>

                                </Row>
                            ))
                            // </Form>
                            //)
                        }
                        {/* </Repeater> */}
                        <Button className='btn-icon my-2' color='warning' onClick={increaseCount}>
                            <Plus size={14} />
                            <span className='align-middle ms-25'>Agregar</span>
                        </Button>
                        <Col sm={12}>
                            <hr />
                        </Col>
                    </div>
                    <button className='btn btn-primary mx-4 mb-2'>Enviar</button>
                    {/* <button className='btn btn-secondary' onClick={toggle}>Cancelar</button> */}
                </form>
            </ModalBody>

        </Modal>
    )
}

export default FormNoticia