import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import bdMuni from '../../../api/bdMuni'
import Select from 'react-select'
const URL = '/v1/hardware-tickets/'
const URLHARD = '/v1/tipo'
const TicketAdminForm = ({
  modal, toggle, submit, control, register,
  reset, handleSubmit, horaActual, getAuthHeaders,
  setHardware_id, codPatrimoniales
}) => {

  console.log(codPatrimoniales, "Asd")
  const [codigo, setCodigo] = useState()
  const [datos, setDatos] = useState()
  const buscarCodigo = () => {
    bdMuni.get(`${URL}${codigo}`, getAuthHeaders())
      .then(res => {
        setDatos(res.data)
        setHardware_id(res.data[0].id)
      })
      .catch(err => {
        console.error('Error fetching user tickets:', err);
      });
  }
  const cambiarCodigo = (cod) => {
    setCodigo(cod)
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
              <select className="form-select" id="urgencia" {...register('urgencia')} disabled>
                <option value="1">Normal</option>
                <option value="2">Urgente</option>
                <option value="3">Muy Urgente</option>
              </select>
            </Col>

            <Col>
              <label htmlFor="urgencia_verdad">Urgencia de Verdad </label>
              <select className="form-select" id="urgencia_verdad" {...register('urgencia_verdad')}  >
                <option value="1">Normal</option>
                <option value="2">Urgente</option>
                <option value="3">Muy Urgente</option>
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
          <Row style={{marginTop: 10}} >
            <Col style={{ border: '1px solid #adb5bd' }}>
              Código Patrimonial
            </Col>
            <Col style={{ border: '1px solid #adb5bd' }}>
              Detalles
            </Col>
            <Col style={{ border: '1px solid #adb5bd' }}>
              Seleccionar
            </Col>
          </Row>
          <Row>

            {codPatrimoniales?.map((item, index) => (
              <>
                <Col key={index} style={{ border: '1px solid #adb5bd' }}>
                  <p>{item?.cod_patri}</p>
                </Col>
                <Col style={{ border: '1px solid #adb5bd' }}>
                  <p>{item?.especif}</p>
                </Col>
                <Col style={{ border: '1px solid #adb5bd' }}>
                  {/* <p>{item?.cod_patri}</p> */}
                  <Button style= {{marginTop:4}}color='secondary' type='button' onClick={() => cambiarCodigo(item?.cod_patri)}>
                  Seleccionar
                  </Button>
                </Col>
              </>
            ))}
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
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                />
                <button type='button' className='btn btn-info' onClick={() => buscarCodigo()}>
                  Buscar
                </button>
              </div>
              {datos == null || datos == [] ? "Sin Hardware" :
                <div>
                  Procesador : {datos[0]?.procesador} <br />
                  Marca: {datos[0]?.marca} <br />
                  Ram : {datos[0]?.ram} <br />
                  Almacenamiento : {datos[0]?.procesador} <br />
                  Tipo Almacenamiento: {datos[0]?.tipo_alma} <br />
                  IP: {datos[0]?.ip} <br />
                  Espefificaciones: {datos[0]?.especif} <br />
                  Codigo Patrimonial: {datos[0]?.cod_patri} <br /><br />
                </div>
              }
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