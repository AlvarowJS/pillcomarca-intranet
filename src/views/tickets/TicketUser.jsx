import React, { useEffect, useState } from 'react'
import { Button, Col, Input, Label, Row } from 'reactstrap'
import TicketUserTabla from './TicketUserTabla'
import bdMuni from '../../api/bdMuni'
import TicketUserForm from './TicketUserForm'
import { useForm } from 'react-hook-form'

// Apis
const URL = '/v1/ticket'
const URLUSER = '/v1/ticket'
const TicketUser = () => {
    const token = localStorage.getItem('token')
    const [data, setData] = useState()
    const [estado, setEstado] = useState(false)
    const [actualizacion, setActualizacion] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [modal, setModal] = useState(false)
    const [currentTime, setCurrentTime] = useState(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
    );

    const { handleSubmit, control, register, reset, setError, formState: { errors } } = useForm()
    const getAuthHeaders = () => ({
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    const defaulValuesForm = {
        detalle: '',
        hora: '',
        fecha: '',
        urgencia: '',
        user_id: ''
    }
    const toggle = () => {
        setActualizacion(false)
        reset(defaulValuesForm)
        setModal(!modal)
    }

    const toggleActualizacion = () => {
        setModal(!modal)
    }
    useEffect(() => {
        bdMuni.get(`${URLUSER}`, getAuthHeaders())
            .then(res => {
                setData(res.data)
            })
            .catch(err => {

            })
    }, [refresh])
    const actualizarTicketId = (id) => {
        toggleActualizacion.call()
        setActualizacion(true)
        bdMuni.get(`${URL}/${id}`, getAuthHeaders())
            .then(res => {
                reset(res.data)
            })
            .catch(err => null)
    }

    const submit = (data) => {
        
        console.log(data)
    }
    return (
        <>
            <Row>
                <Col sm='6'>
                    <h3>Mis Tickets</h3>
                </Col>
                <Col sm='3'>
                </Col>
                <Col sm='3'>
                    <Button onClick={toggle} color='primary'>
                        Solicitar Soporte
                    </Button>
                </Col>
            </Row>
            <TicketUserTabla
                data={data}
                actualizarTicketId={actualizarTicketId}
            />
            <TicketUserForm
                toggle={toggle}
                modal={modal}
                setModal={setModal}
                handleSubmit={handleSubmit}
                submit={submit}
                control={control}
                register={register}
                reset={reset}
                setCurrentTime={setCurrentTime}
                currentTime={currentTime}
            />
        </>
    )
}

export default TicketUser