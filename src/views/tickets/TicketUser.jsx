import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import TicketUserTabla from './TicketUserTabla';
import bdMuni from '../../api/bdMuni';
import TicketUserForm from './TicketUserForm';
import { useForm } from 'react-hook-form';

// Apis
const URL = '/v1/ticket';
const URLUSER = '/v1/ticket-user/';

const TicketUser = () => {
    const token = localStorage.getItem('token');
    const idu = localStorage.getItem('idu');
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [modal, setModal] = useState(false);

    const { handleSubmit, control, register, reset } = useForm();
    const getAuthHeaders = () => ({
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    const defaultValuesForm = {
        detalle: '',
        hora: '',
        fecha: '',
        urgencia: '',
        // Quitamos la propiedad user_id del objeto por que lo vamos a asignar automáticamente
    };

    const toggle = () => {
        reset(defaultValuesForm);
        setModal(!modal);
    };

    useEffect(() => {
        bdMuni.get(`${URLUSER}${idu}`, getAuthHeaders())
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.error('Error fetching user tickets:', err);
            });
    }, [refresh]);

    const actualizarTicketId = (id) => {
        bdMuni.get(`${URL}/${id}`, getAuthHeaders())
            .then(res => {
                reset(res.data);
                setModal(true);
            })
            .catch(err => {
                console.error('Error fetching ticket details:', err);
            });
    };

    const submit = (formData) => {
        console.log(formData,"actual")
        // Mapeo de la urgencia a valores específicos
        if (formData.urgencia === 'normal') {
            formData.urgencia = 1;
        } else if (formData.urgencia === 'urgente') {
            formData.urgencia = 2;
        }

        // Agregar el ID del usuario automáticamente
        formData.user_id = idu;

        // Aquí puedes realizar el envío de los datos del formulario al backend
        console.log('Datos del formulario:', formData);
    };

    return (
        <>
            <Row>
                <Col sm='6'>
                    <h3>Mis Tickets</h3>
                </Col>
                <Col sm='3'></Col>
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
                handleSubmit={handleSubmit(submit)}
                control={control}
                register={register}
                reset={reset}
            />
        </>
    );
};

export default TicketUser;
