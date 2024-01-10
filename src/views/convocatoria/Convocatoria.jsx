
import React, { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Breadcrumb, Col, Card, Row, Button } from 'reactstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
import bdMuni from '../../api/bdMuni';
import TablaConvocatoria from './TablaConvocatoria'
import FormConvocatoria from './FormConvocatoria'
import FormBases from './FormBases'
import FormCurricular from './FormCurricular'
import FormResultado from './FormResultado'
const URL = '/v1/convocatoria'
const URLBASES = '/v1/bases'
const Convocatoria = () => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('idu');

    const [data, setData] = useState()

    const [modal, setModal] = useState()
    const [modalResultados, setModalResultados] = useState()
    const [modalBases, setModalBases] = useState()
    const [modalCurricular, setModalCurricular] = useState()

    const [actualizacion, setActualizacion] = useState(false)
    const { handleSubmit, register, reset } = useForm()
    const [refresh, setRefresh] = useState(false)

    const getAuthHeaders = () => ({
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    const toggle = () => {
        setActualizacion(false)
        reset(defaulValuesForm)
        setModal(!modal)
    }

    const toggleBases = () => {
        setModalBases(!modalBases)
    }

    const toggleCurricular = () => {
        setModalCurricular(modalCurricular)
    }
    const toggleResultados = () => {
        setModalResultados(!modalResultados)
    }

    const toggleActualizacion = () => {
        setModal(!modal)
    }


    const defaulValuesForm = {
        nombre: '',
        estado: '',
    }
    const defaultBases = {
        nombre: '',
        archivo: '',
        convocatoria_id: ''
    }

    useEffect(() => {
        bdMuni.get(`${URL}`, getAuthHeaders())
            .then(res => {
                setData(res.data)
            })
            .catch(err => {

            })
    }, [refresh])

    const crearBase = (data) => {
        bdMuni.post(URL, data, getAuthHeaders())
            .then(res => {
                reset(defaultBases)
                toggleBases.call()
                setRefresh(!refresh)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Consultorio creado',
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
    // Crear Consultorio
    const crearConvocatoria = (data) => {
        bdMuni.post(URL, data, getAuthHeaders())
            .then(res => {
                reset(defaulValuesForm)
                toggle.call()
                setRefresh(!refresh)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Consultorio creado',
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

    // Actualiza Consultorio (PUT)
    const actualizarConvocatoria = (id, data) => {
        bdMuni.put(`${URL}/${id}`, data, getAuthHeaders())
            .then(res => {
                reset(defaulValuesForm)
                toggle.call()
                setRefresh(!refresh)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Consultorio Actualizado',
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
    const eliminarConvocatoria = (id) => {
        return MySwal.fire({
            title: '¿Estás seguro de eliminar?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si',
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-outline-danger ms-1'
            },
            buttonsStyling: false
        }).then(function (result) {
            if (result.value) {
                bdMuni.delete(`${URL}/${id}`, getAuthHeaders())
                    .then(res => {
                        setRefresh(!refresh)
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Consultorio Eliminado',
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
        })


    }

    // Tomara los datos que tiene un registro
    const actualizarConvocatoriaId = (id) => {
        toggleActualizacion.call()
        setActualizacion(true)
        bdMuni.get(`${URL}/${id}`, getAuthHeaders())
            .then(res => {
                reset(res.data)
            })
            .catch(err => null)
    }

    // Si es actualizacion llamara a actualizarPaciente pero si es false crear un Consultorio
    const submit = (data) => {
        if (actualizacion) {
            actualizarConvocatoria(data.id, data)
        } else {
            crearConvocatoria(data)
        }
    }

    const submitBases = (data) => {
        crearBase(data)
    }
    return (
        <>
            <Row>
                <Col>
                    <Button
                        color='warning'
                        onClick={toggle}
                    >Crear Proceso</Button>
                </Col>
                <Col>
                    <Button>Subir Base</Button>
                </Col>
                <Col>
                    <Button>Subir Evaluación Curricular</Button>
                </Col>
                <Col>
                    <Button>Subir Resultado Final</Button>
                </Col>
            </Row>
            <TablaConvocatoria
                data={data}
            />
            <FormConvocatoria
                toggle={toggle}
                toggleActualizacion={toggleActualizacion}
                modal={modal}
                handleSubmit={handleSubmit}
                submit={submit}
                register={register}
                reset={reset}
                getAuthHeaders={getAuthHeaders}
            />

            <FormBases 
                toggleBases={toggleBases}
                modalBases={modalBases}
                submitBases={submitBases}
                handleSubmit={handleSubmit}
                reset={reset}
                register={register}
                URL={URL}
                getAuthHeaders={getAuthHeaders}
            />
            <FormCurricular />
            <FormResultado />
        </>
    )
}

export default Convocatoria