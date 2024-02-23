import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import TicketUserTabla from './TicketUserTabla';
import bdMuni from '../../api/bdMuni';
import TicketUserForm from './TicketUserForm';
import { useForm } from 'react-hook-form';

// swal
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
// Apis
const URL = '/v1/ticket';
const URLUSER = '/v1/ticket-user/';
const URLORDEN = '/v1/ticket-orden/'

const TicketUser = () => {
    const token = localStorage.getItem('token');
    const idu = localStorage.getItem('idu');
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [modal, setModal] = useState(false);
    const [ordenUser, setOrdenUser] = useState(0)

    const { handleSubmit, control, register, reset } = useForm();
    const getAuthHeaders = () => ({
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    const defaultValuesForm = {
        detalle: '',
        urgencia: ''
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
    useEffect(() => {
        bdMuni.get(`${URLORDEN}${idu}`, getAuthHeaders())
            .then(res => {
                setOrdenUser(res.data)
            })
            .catch(err => {
                setOrdenUser(0)
            })

    }, [refresh])


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
    const crearTicket = data => {
        bdMuni.post(URL, data, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => {
                toggle.call()
                setRefresh(true)
                reset(defaultValuesForm)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Ticket creado',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(err => {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Porfavor espere a que se atiende su ticket',
                    showConfirmButton: false,
                })

            })
    }

    const submit = (data) => {
        data.user_id = idu;
        crearTicket(data)
    };

    return (
        <>
            <Row>
                <Col sm='6'>
                    <h3>Mis Tickets</h3>
                </Col>
                <Col sm='3'>
                    {
                        ordenUser == 0 ? "" :
                            `Hay ${ordenUser?.orden} en cola porfavor espere`
                    }
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
                submit={submit}
                handleSubmit={handleSubmit}
                control={control}
                register={register}
                reset={reset}
            />
        </>
    );
};

export default TicketUser;
