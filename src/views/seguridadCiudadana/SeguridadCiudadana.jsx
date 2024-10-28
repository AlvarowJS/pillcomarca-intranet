import React, { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Col, Row, Button } from 'reactstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
import TablaSeguridadCiudadana from './TablaSeguridadCiudadana'
import FormSeguridadCiudadana from './FormSeguridadCiudadana'
import bdMuni from '../../api/bdMuni';
import FormColeccion from './FormColeccion'
import FormArchivos from './FormArchivos'

const URLPUBLICA = '/v1/seguridad'
const URL = '/v1/seguridad-categoria'
const URLCOLECCION = '/v1/seguridad-coleccion'
const URLARCHIVOS = '/v1/seguridad-archivo'

const SeguridadCiudadana = () => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('idu');

    const [data, setData] = useState()
    const [dataColeccion, setDataColeccion] = useState()
    const [modal, setModal] = useState()
    const [modalColeccion, setModalColeccion] = useState(false)
    const [modalArchivos, setModalArchivos] = useState(false)

    const [actualizacion, setActualizacion] = useState(false)
    const { handleSubmit, register, reset } = useForm()
    const { handleSubmit: handleSubmitColeccion, register: registerColeccion, reset: resetColeccion } = useForm()
    const { handleSubmit: handleSubmitArchivos, register: registerArchivos, reset: resetArchivos } = useForm()
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
    const toggleColeccion = () => {
        setModalColeccion(!modalColeccion)
        resetColeccion(defaultColeccion)
        setActualizacion(false)
    }
    const toggleArchivo = () => {
        setModalArchivos(!modalArchivos)
        resetArchivos(defaultArchivos)
        setActualizacion(false)
    }

    const toggleActualizacion = () => {
        setModal(!modal)
    }


    useEffect(() => {
        bdMuni.get(`${URLPUBLICA}`, getAuthHeaders())
            .then(res => {
                setData(res.data)
            })
            .catch(err => {

            })
    }, [refresh])
    useEffect(() => {
        bdMuni.get(`${URLCOLECCION}`, getAuthHeaders())
            .then(res => {
                setDataColeccion(res.data)
            })
            .catch(err => {

            })
    }, [refresh])

    const defaulValuesForm = {
        categoria: '',
    }
    const defaultColeccion = {
        nombre_coleccion: '',
        seguridad_categoria_id: ''
    }
    const defaultArchivos = {
        nombre_archivo: '',
        documento: '',
        seguridad_coleccion_id: ''
    }
    //Crear categoria
    const crearSeguridadCiudadana = (data) => {
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
    //Crear coleccion
    const crearColeccion = (data) => {
        bdMuni.post(URLCOLECCION, data, getAuthHeaders())
            .then(res => {
                resetColeccion(defaultColeccion)
                toggleColeccion()
                setRefresh(!refresh)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Coleccion creadas',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(err => {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Contacte con soporte',
                    showCancelButton: false,
                })
            })
    }
    //Crear Archivos
    const crearArchivos = (data) => {
        bdMuni.post(URLARCHIVOS, data, getAuthHeaders())
            .then(res => {
                resetArchivos(defaultArchivos)
                toggleArchivo()
                setRefresh(!refresh)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Archivos creados',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(err => {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Contacte con soporte',
                    showCancelButton: false,
                })
            })
    }
    // Actualizar Categoria
    const actualizarSeguridadCiudadana = (id, data) => {
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

    // Tomara los datos que tiene un registro
    const actualizarSeguridadCiudadanaId = (id) => {
        toggleActualizacion()
        setActualizacion(true)
        bdMuni.get(`${URL}/${id}`, getAuthHeaders())
            .then(res => {
                reset(res.data)
            })
            .catch(err => null)
    }
    // Actualizar Coleccion
    const actualizarColeccion = (id, data) => {
        bdMuni.put(`${URLCOLECCION}/${id}`, data, getAuthHeaders())
            .then(res => {
                resetColeccion(defaultColeccion)
                toggleColeccion.call()
                setRefresh(!refresh)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Coleccion Actualizado',
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
    const actualizarArchivos = (id, data) => {
        bdMuni.put(`${URLARCHIVOS}/${id}`, data, getAuthHeaders())
            .then(res => {
                resetArchivos(defaultArchivos)
                toggleArchivo.call()
                setRefresh(!refresh)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Archivo Actualizado',
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

    const submit = (data) => {

        if (actualizacion) {
            actualizarSeguridadCiudadana(data.id, data)
        } else {
            crearSeguridadCiudadana(data)
        }
    }
    const submitColeccion = (data) => {
        if (actualizacion) {
            actualizarColeccion(data.id, data)
        } else {
            crearColeccion(data)
        }
    }
    const submitArchivos = (data) => {
        if (actualizacion) {
            actualizarArchivos(data.id, data)
        } else {
            crearArchivos(data)
        }
    }
    return (
        <>
            <Row>
                <Col>
                    <Button color="info" onClick={toggle}>
                        Crear Categoria
                    </Button>
                </Col>
                <Col>
                    <Button color="primary" onClick={toggleColeccion}>
                        Crear Colección
                    </Button>
                </Col>
                <Col>
                    <Button color="success" onClick={toggleArchivo}>
                        Crear Archivos
                    </Button>
                </Col>
            </Row>
            <TablaSeguridadCiudadana
                data={data}
                actualizarSeguridadCiudadanaId={actualizarSeguridadCiudadanaId}
                toggleColeccion={toggleColeccion}

                bdMuni={bdMuni}
                URLCOLECCION={URLCOLECCION}
                resetColeccion={resetColeccion}
                getAuthHeaders={getAuthHeaders}
                setActualizacion={setActualizacion}
                actualizacion={actualizacion}
                
                toggleArchivo={toggleArchivo}
                URLARCHIVOS={URLARCHIVOS}
                resetArchivos={resetArchivos}
            />
            <FormSeguridadCiudadana
                toggle={toggle}
                toggleActualizacion={toggleActualizacion}
                modal={modal}
                handleSubmit={handleSubmit}
                register={register}
                reset={reset}
                submit={submit}
                getAuthHeaders={getAuthHeaders}
            />
            <FormColeccion
                options={data}
                toggleColeccion={toggleColeccion}
                modalColeccion={modalColeccion}
                handleSubmitColeccion={handleSubmitColeccion}
                registerColeccion={registerColeccion}
                resetColeccion={resetColeccion}
                submitColeccion={submitColeccion}
                getAuthHeaders={getAuthHeaders}
            />
            <FormArchivos
                coleccion={dataColeccion}
                toggleArchivo={toggleArchivo}
                modalArchivos={modalArchivos}
                handleSubmitArchivos={handleSubmitArchivos}
                registerArchivos={registerArchivos}
                resetArchivos={resetArchivos}
                submitArchivos={submitArchivos}
                getAuthHeaders={getAuthHeaders}
            />
        </>
    )
}

export default SeguridadCiudadana