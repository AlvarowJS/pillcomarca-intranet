import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
const TicketUserForm = ({
    modal, toggle, submit, control, register,
    reset, errors, handleSubmit, currentTime, setCurrentTime
}) => {

    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);

    const [horaActual, setHoraActual] = useState();

    useEffect(() => {
        const obtenerHoraActual = () => {
            const ahora = new Date();
            const horas = ahora.getHours().toString().padStart(2, '0');
            const minutos = ahora.getMinutes().toString().padStart(2, '0');
            return `${horas}:${minutos}`;
        };
        console.log(obtenerHoraActual(), "sds")
        setHoraActual(obtenerHoraActual());
    }, [toggle, modal]);

    // useEffect(() => {
    //     const intervalRef = setInterval(() => {
    //         setCurrentTime(
    //             new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
    //         );
    //     }, 1000);

    //     return () => {
    //         clearInterval(intervalRef);
    //     };
    // }, [modal]);

    return (
        <Modal isOpen={modal} toggle={toggle || toggleActualizacion} size='lg'>
            <ModalHeader>
                Solicitar Ticket de Atención

            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit(submit)}>
                    <div className='form-group my-2'>
                        <label htmlFor="">
                            Detalle
                        </label>
                        <textarea
                            className="form-control"
                            placeholder='Detalle'
                            {...register('detalle')}
                        />
                    </div>
                    <div className='form-group my-2'>
                        <label htmlFor="hora">Hora</label>
                        <input
                            type="time"
                            className="form-control"
                            id="hora"
                            value={horaActual}
                            // {...register('hora')}
                            disabled
                        />
                    </div>
                    <div className='form-group my-2'>
                        <label htmlFor="">
                            Fecha
                        </label>
                        <input
                            id="fecha"
                            className="form-control"
                            type="date"
                            // {...register('fecha')}
                            value={currentDate}
                            onChange={(e) => setCurrentDate(e.target.value)}
                            disabled
                        />
                    </div>
                    <div className='form-group my-2'>
                        <label htmlFor="">
                            Urgencia
                        </label>
                        <select className="form-select" id="urgencia" {...register('urgencia')}  >
                            <option value="1">Normal</option>
                            <option value="2">Urgente</option>
                        </select>
                    </div>


                    <button className='btn btn-primary mb-2'>Enviar</button>
                </form>
            </ModalBody>
        </Modal>

    )
}

export default TicketUserForm