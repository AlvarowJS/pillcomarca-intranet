import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import bdMuni from '../../../api/bdMuni'
import Select from 'react-select'

const TicketAdminForm = ({
  modal, toggle, submit, control, register,
  reset, handleSubmit, horaActual
}) => {
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
                  Fecha de Finalización
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
              Urgencia
            </Col>
            <Col>
              <label htmlFor="persona">Persona </label>
              <select className="form-select" id="persona" {...register('persona')}  >
                <option value="1">Persona Natural</option>
                <option value="2">Persona Juridica</option>
              </select>
            </Col>
          </Row>
        </form>
      </ModalBody>
    </Modal>
  )
}

export default TicketAdminForm