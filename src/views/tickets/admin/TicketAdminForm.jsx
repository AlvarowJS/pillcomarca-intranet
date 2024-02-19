import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import bdMuni from '../../../api/bdMuni'
import Select from 'react-select'
const URL = '/v1/hardware-tickets/'
const URLHARD = '/v1/tipo'
const TicketAdminForm = ({
  modal, toggle, submit, control, register,
  reset, handleSubmit, horaActual, getAuthHeaders
}) => {

  const [codigo, setCodigo] = useState()
  const [datos, setDatos] = useState()
  const buscarCodigo = () => {
    bdMuni.get(`${URL}${codigo}`, getAuthHeaders())
      .then(res => {
        setDatos(res.data)
      })
      .catch(err => {
        console.error('Error fetching user tickets:', err);
      });
  }
  return (
    <Modal isOpen={modal} toggle={toggle} size='lg'>
      <ModalHeader toggle={toggle}>
        Finalizar Ticket
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(submit)}>
          <Row>
            <Col>
              <div className='form-group my-2'>
                <label htmlFor="">
                  Detalle
                </label>
                <input
                  className="form-control"
                  type="text"
                  {...register('detalle')}
                  disabled
                />
              </div>
            </Col>

          </Row>
          <Row>
            <Col>
              <div className='form-group my-2'>
                <label htmlFor="">
                  Fecha de Registro
                </label>
                <input
                  className="form-control"
                  type="text"
                  {...register('fecha')}
                  disabled
                />
              </div>
            </Col>
            <Col>
              <div className='form-group my-2'>
                <label htmlFor="">
                  Fecha de Atención
                </label>
                <input
                  className="form-control"
                  type="text"
                  {...register('fecha_atencion')}
                  disabled
                />
              </div>
            </Col>
            <Col>
              <div className='form-group my-2'>
                <label htmlFor="">
                  Fecha Finalización
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={horaActual}
                  disabled
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <label htmlFor="urgencia">Urgencia </label>
              <select className="form-select" id="urgencia" {...register('urgencia')}  >
                <option value="1">Normal</option>
                <option value="2">Urgente</option>
              </select>
            </Col>
            <Col>
              <label htmlFor="urgencia_verdad">Urgencia de Verdad </label>
              <select className="form-select" id="urgencia_verdad" {...register('urgencia_verdad')}  >
                <option value="1">Normal</option>
                <option value="2">Urgente</option>
              </select>
            </Col>
          </Row>
          <Row>
            <Col>
              <label htmlFor="conclusion">Conclusión</label>
              <textarea type="text" className="form-control" id="conclusion"
                {...register('conclusion')}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <div className='form-group d-flex gap-2 my-2'>
                <label htmlFor='codigo_pat'>
                  Codigo Patrimonial
                </label>
                <input
                  className="form-control"
                  type="text"
                  // value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                />
                <button type='button' className='btn btn-info' onClick={() => buscarCodigo()}>
                  Buscar
                </button>
              </div>
            </Col>
          </Row>
          <Row>
            <button className='btn btn-success'>
              Enviar
            </button>
          </Row>
        </form>
      </ModalBody>
    </Modal>
  )
}

export default TicketAdminForm