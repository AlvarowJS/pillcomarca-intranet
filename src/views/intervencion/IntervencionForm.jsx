import React from 'react'
import { Button, Card, CardBody, CardHeader, Col, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
const IntervencionForm = ({
    modal, toggle
}) => {
    return (
        <Modal isOpen={modal} toggle={toggle} size='lg'>
            <ModalHeader toggle={toggle}>
                Registrar Intervencion
            </ModalHeader>
            <ModalBody>
                <form >
                    <div className="form-group mx-4 mb-2">
                        <label htmlFor="fecha">Fecha</label>
                        <input type="date" className="form-control"
                            id="fecha"
                        />
                    </div>
                    <div className="form-group mx-4 mb-2">
                        <label htmlFor="hora">Hora</label>
                        <input type='time' className="form-control"
                            id="hora"
                        />
                    </div>
                    <div className="form-group mx-4 mb-2">
                        <label htmlFor="fecha">Dirección</label>
                        <input type="text" className="form-control"
                            id="fecha"
                        />
                    </div>
                    <div className="form-group mx-4 mb-2">
                        <label htmlFor="fecha">Número/ Dpt/ Int </label>
                        <input type="text" className="form-control"
                            id="fecha"
                        />
                    </div>
                    <div className="form-group mx-4 mb-2">
                        <label htmlFor="fecha">Referencia</label>
                        <input type="text" className="form-control"
                            id="fecha"
                        />
                    </div>
                    <div className="form-group mx-4 mb-2">
                        <label htmlFor="categoria_id">Tipo </label>
                        <select className="form-select" id="categoria_id" >
                            <option value="1">Asalto</option>
                            <option value="2">Violencia Familiar</option>
                            <option value="3">Sicariato</option>
                            <option value="4">Hurto</option>

                        </select>
                    </div>
                    <div className="form-group mx-4 mb-2">
                        <label htmlFor="fecha">Detalle de la intervención</label>
                        <textarea className="form-control" ></textarea>
                    </div>
                </form>
            </ModalBody>
        </Modal>

    )
}

export default IntervencionForm