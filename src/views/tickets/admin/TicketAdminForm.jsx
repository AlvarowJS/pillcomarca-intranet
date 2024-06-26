import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import bdMuni from '../../../api/bdMuni'
import Select from 'react-select'
import DataTable from 'react-data-table-component'
const URL = '/v1/hardware-tickets/'
const URLHARD = '/v1/tipo'
const TicketAdminForm = ({
  modal, toggle, submit, control, register,
  reset, handleSubmit, horaActual, getAuthHeaders,
  setHardware_id, codPatrimoniales
}) => {

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
  const columns = [
    {
        sortable: true,
        name: 'Caracteristicas del Hardware',
        minWidth: '60%',
        maxWidth: '10%',
        selector: row => row?.especif,
        cell: row => <div>{row?.especif}</div>
    },
    {
        sortable: true,
        name: 'Codigo',
        minWidth: '15%',
        selector: row => row?.cod_patri,
        cell: row => <div>{row?.cod_patri}</div>
    },
    {
      name: 'Seleccionar',
      sortable: true,
      allowOverflow: true,
      minWidth: '80px',
      maxWidth: '160px',
      cell: row => {
        return (
          <div className='d-flex gap-1 my-1'>
            <button
              type='button' 
              className='btn btn-primary'
              onClick={() => cambiarCodigo(row?.cod_patri)}
            >
              Selecciona
            </button>
          </div>
        );
      }
    }
];

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
          <Row>
          <DataTable
            noHeader
            // pagination
            className='react-datatable'
            columns={columns}
            data={codPatrimoniales}
                  />
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