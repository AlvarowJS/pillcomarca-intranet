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

const Hardware = () => {
    const token = localStorage.getItem('token')
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [modal, setModal] = useState(false);
    const { handleSubmit, control, register, reset } = useForm();
    const [oficina, setOficina] = useState()
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
        bdMuni.get(URL, getAuthHeaders())
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
            })
    }, [])
    const toggle = () => {
        reset(defaultValuesForm);
        setModal(!modal);
    };
    const crearHardware = data => {
        bdMuni.post(URL, data, getAuthHeaders())
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
        data.dependencia_id = oficina.value
        console.log(data, "a")
        // crearHardware(data)
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
            />
        </div>
    )
}

export default Hardware