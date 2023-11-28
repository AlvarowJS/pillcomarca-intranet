
import React, { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Breadcrumb, Col, Card, Row, Button } from 'reactstrap'
import TablaVisitas from './TablaVisitas'
import FormVisita from './FormVisita';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import bdMuni from '../../api/bdMuni';
const MySwal = withReactContent(Swal)


const RegistroVisitas = () => {
    const token = localStorage.getItem('token');
    const [modal, setModal] = useState(false)
    const [estado, setEstado] = useState(false)
    const [objUpdate, setObjUpdate] = useState()
    const [data, setData] = useState([]);
    const [getData, setGetData] = useState()
    const [oficina, setOficina] = useState()
    const [currentPage, setCurrentPage] = useState(1);
    const [estadoDni, setEstadoDni] = useState(false)

    const [nombre, setNombre] = useState()
    const [apellidos, setApellidos] = useState()
    const [datosUser, setDatosUser] = useState()
    // const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [currentTime, setCurrentTime] = useState(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );

    const { handleSubmit, control, register, reset, setError, formState: { errors } } = useForm()
    const defaultValuesForm = {
        // fecha: '',
        nombre: '',
        apellidos: '',
        dni: '',
        // persona: '',
        asunto: '',
        // hora_ingreso: '',
        hora_salida: ''
    }

    const toggle = () => {
        setModal(!modal)
        if (objUpdate !== undefined) {
            reset(defaultValuesForm)
        }
    };

    // Crear un registro con id del DNI
    const crearRegistroDni = data => {
        
        bdMuni.post('/v1/registro-visitas', data, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => {
                setEstado(true)
                reset(defaultValuesForm)
                setApellidos('')
                setNombre('')
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Registro creado',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(err => {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Contacte con soporte',
                    showConfirmButton: false,
                })

            })
    }
    // Crea un registro y un usuario nuevo
    const crearRegistro = data => {
        setEstado(false)
        data.oficina = oficina.label
        bdMuni.post('/v1/registro-visitas-dni', data, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => {
                reset(defaultValuesForm)
                setApellidos('')
                setNombre('')                
                setEstado(true)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Registro creado',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(err => {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Contacte con soporte',
                    showConfirmButton: false,
                })

            })
    }
    const updateVisita = (id, data) => {
        setEstado(false)
        bdMuni.patch(`/v1/registro-visitas/${id}`, data, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => {
                setEstado(true)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Visita Actualizado',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(err => {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Contacte con el encargado',
                    showConfirmButton: false,
                })
            })
    }
    const updateVisitaById = (id) => {
        setEstado(false)
        toggle.call()
        bdMuni.get(`/v1/registro-visitas/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => {
                setObjUpdate(res?.data)
                const object = res?.data
                reset(object)
            })
            .catch(err => {

            })
    }
    const submit = (data) => {
        
        data.depedencia_id = oficina.value
        if (estadoDni) {
            data.usuario_publico_id = datosUser.id
            // data.nombre = datosUser.nombre
            // data.apellidos = datosUser.apellidos
            crearRegistroDni(data)
            toggle.call()
        } else {
            crearRegistro(data)
            toggle.call()
        }


        // if (objUpdate !== undefined) {
        //     updateVisita(objUpdate?.id, data)
        //     reset(defaultValuesForm)
        //     toggle.call()

        // } else {
        //     reset(defaultValuesForm)
        //     crearRegistro(data)
        //     toggle.call()
        // }
    }
    useEffect(() => {
        const perPage = 10;

        bdMuni.get(`/v1/registro-visitas?perPage=${perPage}&page=${currentPage}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(res => {
                setGetData(res.data.data)
            })
            .catch(err => {

            })
    }, [estado, currentPage])

    return (
        <Fragment>
            <Card className='p-4'>
                <Row>
                    <Col lg='6' className='d-flex align-items-center px-0 px-lg-1'>
                        <Button className='mt-sm-0 mt-1' color='primary' onClick={toggle}>
                            Registrar Visita
                        </Button>
                    </Col>
                </Row>


            </Card>
            <TablaVisitas
                updateVisitaById={updateVisitaById}
                getData={getData}
                estado={estado}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            <FormVisita
                toggle={toggle}
                modal={modal}
                setModal={setModal}
                handleSubmit={handleSubmit}
                submit={submit}
                control={control}
                register={register}
                reset={reset}
                errors={errors}
                oficina={oficina}
                setOficina={setOficina}
                nombre={nombre}
                setNombre={setNombre}
                apellidos={apellidos}
                setApellidos={setApellidos}
                datosUser={datosUser}
                setDatosUser={setDatosUser}
                setEstadoDni={setEstadoDni}
                estadoDni={estadoDni}
                setCurrentTime={setCurrentTime}
                currentTime={currentTime}
            />
        </Fragment>
    )
}

export default RegistroVisitas