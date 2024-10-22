
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
const URLCURRICULAR = '/v1/result'
const URLRESULTADOS = '/v1/resultado'
const Convocatoria = () => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('idu');

    const [data, setData] = useState()

    const [modal, setModal] = useState()
    const [modalResultados, setModalResultados] = useState(false)
    const [modalBases, setModalBases] = useState(false)
    const [modalCurricular, setModalCurricular] = useState(false)

    const [actualizacion, setActualizacion] = useState(false)
    const { handleSubmit, register, reset } = useForm()
    const { handleSubmit: handleSubmitBases, register: registerBases, reset: resetBases } = useForm()
    const { handleSubmit: handleSubmitCurricular, register: registerCurricular, reset: resetCurricular } = useForm()
    const { handleSubmit: handleSubmitResultados, register: registerResultados, reset: resetResultados } = useForm()
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
        setActualizacion(false)
        resetBases(defaultBases);
        setModalBases(!modalBases);
    }

    // console.log(modalBases)

    const toggleCurricular = () => {
        setActualizacion(false)
        setModalCurricular(!modalCurricular)
        resetCurricular(defaultCurricular)
    }
    const toggleResultados = () => {
        setActualizacion(false)
        setModalResultados(!modalResultados)
        resetResultados(defaultResultados)
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
    const defaultCurricular = {
        nombre: '',
        archivo: '',
        convocatoria_id: ''
    }
    const defaultResultados = {
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


    // Crear convocatoria
    const crearConvocatoria = (data) => {
        bdMuni.post(URL, data, getAuthHeaders())
            .then(res => {
                reset(defaulValuesForm)
                toggle.call()
                setRefresh(!refresh)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Convocatoria creado',
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
    // Crear Base
    const crearBase = (data) => {
        bdMuni.post(URLBASES, data, getAuthHeaders())
            .then(res => {
                reset(defaultBases)
                toggleBases()
                setRefresh(!refresh)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Bases creadas',
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
    // Crear Curricular
    const crearCurricular = (data) => {
        bdMuni.post(URLCURRICULAR, data, getAuthHeaders())
            .then(res => {
                reset(defaultCurricular)
                toggleCurricular.call()
                setRefresh(!refresh)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Curriculares creados',
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
    //Crear Resultados
    const crearResultados = (data) => {
        bdMuni.post(URLRESULTADOS, data, getAuthHeaders())
            .then(res => {
                reset(defaultResultados)
                toggleResultados.call()
                setRefresh(!refresh)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Resultados creados',
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
                    title: 'Convocatoria Actualizado',
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
                            title: 'Convocatoria Eliminado',
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


    const submit = (data) => {
        if (actualizacion) {
            actualizarConvocatoria(data.id, data)
        } else {
            crearConvocatoria(data)
        }
    }

    const actualizarBases = (id, data) => {
        bdMuni.put(`${URLBASES}/${id}`, data, getAuthHeaders())
            .then(res => {
                reset(defaultBases)
                toggleBases.call()
                setRefresh(!refresh)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Base Actualizado',
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

    const submitBases = (data) => {
        if (actualizacion) {
            actualizarBases(data.id, data)
        } else {
            crearBase(data)
        }
    }

    const actualizarCurricular = (id, data) => {
        bdMuni.put(`${URLCURRICULAR}/${id}`, data, getAuthHeaders())
            .then(res => {
                reset(defaultCurricular)
                toggleCurricular.call()
                setRefresh(!refresh)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Curricular Actualizado',
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
    const submitCurricular = (data) => {
        if (actualizacion) {
            actualizarCurricular(data.id, data)

        } else {
            crearCurricular(data)
        }
    }

    const actualizarResultado = (id, data) => {
        bdMuni.put(`${URLRESULTADOS}/${id}`, data, getAuthHeaders())
            .then(res => {
                reset(defaultResultados)
                toggleResultados.call()
                setRefresh(!refresh)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Curricular Actualizado',
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

    const submitResultados = (data) => {
        if (actualizacion) {
            actualizarResultado(data.id, data)
        } else {
            crearResultados(data)
        }
    }
    return (
        <>
            <Row>
                <Col>
                    <Button color="info" onClick={toggle}>
                        Crear Proceso
                    </Button>
                </Col>
                <Col>
                    <Button color="primary" onClick={toggleBases}>
                        Subir Base
                    </Button>
                </Col>
                <Col>
                    <Button color="info" onClick={toggleCurricular}>
                        Subir Evaluación Curricular
                    </Button>
                </Col>
                <Col>
                    <Button color="success" onClick={toggleResultados}>
                        Subir Resultado Final
                    </Button>
                </Col>
            </Row>
            <TablaConvocatoria
                data={data}
                actualizarConvocatoriaId={actualizarConvocatoriaId}
                toggleBases={toggleBases}
                bdMuni={bdMuni}
                URLBASES={URLBASES}
                resetBases={resetBases}
                getAuthHeaders={getAuthHeaders}
                actualizacion={actualizacion}
                setActualizacion={setActualizacion}

                toggleCurricular={toggleCurricular}
                URLCURRICULAR={URLCURRICULAR}
                resetCurricular={resetCurricular}

                toggleResultados={toggleResultados}
                resetResultados={resetResultados}
                URLRESULTADOS={URLRESULTADOS}

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
                options={data}
                toggleBases={toggleBases}
                modalBases={modalBases}
                handleSubmitBases={handleSubmitBases}
                submitBases={submitBases}
                registerBases={registerBases}
                resresetBaseser={resetBases}
                getAuthHeaders={getAuthHeaders}

            />
            <FormCurricular
                tipos={data}
                toggleCurricular={toggleCurricular}
                modalCurricular={modalCurricular}
                handleSubmitCurricular={handleSubmitCurricular}
                submitCurricular={submitCurricular}
                registerCurricular={registerCurricular}
                resetCurricular={resetCurricular}
                getAuthHeaders={getAuthHeaders}

            />
            <FormResultado
                tipos={data}
                toggleResultados={toggleResultados}
                modalResultados={modalResultados}
                handleSubmitResultados={handleSubmitResultados}
                submitResultados={submitResultados}
                registerResultados={registerResultados}
                resetResultados={resetResultados}
                getAuthHeaders={getAuthHeaders}
            />
        </>
    )
}

export default Convocatoria