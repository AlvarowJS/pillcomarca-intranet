import React, { useEffect, useState } from 'react'
import HardwareTabla from './HardwareTabla'
import HardwareForm from './HardwareForm'
import bdMuni from '../../../../api/bdMuni'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom'
import { Col, Row } from 'reactstrap'
// swal
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
// Apis
const URL = 'v1/tipo'
const URLHARDWARE = 'v1/hardware'

const Hardware = () => {
    const token = localStorage.getItem('token')
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [modal, setModal] = useState(false);
    const [actualizacion, setActualizacion] = useState(false)
    const { handleSubmit, control, register, reset } = useForm();
    const [oficina, setOficina] = useState()
    const [dependencia_id, setDependencia_id] = useState()
    const getAuthHeaders = () => ({
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    const defaultValuesForm = {
        tipo_id: "",
        procesador: "",
        ram: "",
        almacenamiento: "",
        tipo_alma: "",
        ip: "",
        marca: "",
        especif: "",
        cod_patrimonial: "",
        dependencia_id: ""
    };
    useEffect(() => {
        bdMuni.get(URLHARDWARE, getAuthHeaders())
            .then(res => {
                setData(res.data.data)
            })
            .catch(err => {
            })
    }, [refresh])
    const toggle = () => {
        setActualizacion(false)
        reset(defaultValuesForm);
        setModal(!modal);
    };
    const toggleActualizacion = () => {
        setModal(!modal)
    }
    const actualizarHardwareId = (id) => {
        toggleActualizacion.call()
        setActualizacion(true)
        bdMuni.get(`${URLHARDWARE}/${id}`, getAuthHeaders())
            .then(res => {
                reset(res.data)
            })
            .catch(err => null)
    }
    const actualizarHardware = (id, data) => {
        bdMuni.put(`${URLHARDWARE}/${id}`, data, getAuthHeaders())
            .then(res => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Hardware Actualizado',
                    showConfirmButton: false,
                    timer: 1500
                })
                reset(defaultValuesForm)
                toggle.call()
                setRefresh(!refresh)

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
    const crearHardware = data => {
        bdMuni.post(URLHARDWARE, data, getAuthHeaders())
            .then(res => {
                toggle.call()
                setRefresh(true)
                reset(defaultValuesForm)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Hardware creado',
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
        console.log(oficina, "as")
        oficina == undefined ?
            data.dependencia_id = data.dependencia_id :
            data.dependencia_id = oficina.value
        if (actualizacion) {
            actualizarHardware(data.id, data)
        } else {
            crearHardware(data)
        }
    };

    return (
        <div>
            <Row>
                <Col>
                    <Link to="/">
                        Volver
                    </Link>
                </Col>
                <Col>
                </Col>
                <Col>
                    <button className='btn btn-info' onClick={toggle}>
                        Crear Hardarware
                    </button>
                </Col>
            </Row>
            <HardwareTabla
                data={data}
                actualizarHardwareId={actualizarHardwareId}
            />

            <HardwareForm
                toggle={toggle}
                modal={modal}
                setModal={setModal}
                submit={submit}
                handleSubmit={handleSubmit}
                control={control}
                register={register}
                reset={reset}
                URL={URL}
                getAuthHeaders={getAuthHeaders}
                bdMuni={bdMuni}
                oficina={oficina}
                setOficina={setOficina}
                toggleActualizacion={toggleActualizacion}

            />
        </div>
    )
}

export default Hardware