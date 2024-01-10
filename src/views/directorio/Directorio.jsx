import React, { useEffect, useState } from 'react'
import { Button, Col, Input, Label, Row } from 'reactstrap'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
import bdMuni from '../../api/bdMuni'
const URL = '/v1/directorios'
const URLSIMPLE = '/v1/simple-directorios'
const URLDIRECTORIO = '/v1/update-directorios'
import FormDirectorio from './FormDirectorio';
import TablaDirectorio from './TablaDirectorio';

const Directorio = () => {
    const token = localStorage.getItem('token')

    const [data, setData] = useState()
    const [search, setSearch] = useState()
    const [filter, setFilter] = useState()
    const [modal, setModal] = useState(false)
    const [actualizacion, setActualizacion] = useState(false)
    const { handleSubmit, register, reset } = useForm()
    const [refresh, setRefresh] = useState(false)
    const [foto, setFoto] = useState()
    const getAuthHeaders = () => ({
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    const defaulValuesForm = {
        nombres: '',
        apellidos: '',
        correo: '',
        cel: '',
        cargo: '',
        dependencia: '',
        foto: ''
    }

    const handleFilter = (e) => {
        setSearch(e.target.value);
    };
    const toggle = () => {
        setActualizacion(false)
        reset(defaulValuesForm)
        setModal(!modal)
    }

    const toggleActualizacion = () => {
        setModal(!modal)
    }
    useEffect(() => {
        bdMuni.get(`${URLSIMPLE}`, getAuthHeaders())
            .then(res => {
                setData(res.data)
            })
            .catch(err => {

            })
    }, [refresh])
    useEffect(() => {
        setFilter(data?.filter(e =>
        (e.nombres && e.apellidos &&
            (e.nombres.toLowerCase() + ' ' + e.apellidos.toLowerCase()).indexOf(search?.toLowerCase()) !== -1)
        ))
    }, [search])
    const crearDirectorio = (data) => {
        const f = new FormData()
        f.append('nombres', data.nombres)
        f.append('apellidos', data.apellidos)
        f.append('cel', data.cel)
        f.append('correo', data.correo)
        f.append('cargo', data.cargo)
        f.append('dependencia', data.dependencia)
        f.append('foto', foto)
        bdMuni.post(URL, f, getAuthHeaders())
            .then(res => {
                reset(defaulValuesForm)
                toggle.call()
                setRefresh(!refresh)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Directorio creado',
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

    // Actualiza directorio (PUT)
    const actualizarDirectorio = (id, data) => {

        bdMuni.put(`${URLDIRECTORIO}`, data, getAuthHeaders())
            .then(res => {
                console.log(res.data)
                reset(defaulValuesForm)
                toggle.call()
                setRefresh(!refresh)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Directorio Actulizado',
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
    const eliminarDirectorio = (id) => {
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
                            title: 'Directorio Eliminado',
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
    const actualizarDirectorioId = (id) => {
        toggleActualizacion.call()
        setActualizacion(true)
        bdMuni.get(`${URL}/${id}`, getAuthHeaders())
            .then(res => {
                reset(res.data)
            })
            .catch(err => null)
    }

    // Si es actualizacion llamara a actualizarPaciente pero si es false crear un directorio
    const submit = (data) => {
        if (actualizacion) {
            actualizarDirectorio(data.id, data)
        } else {
            crearDirectorio(data)
        }
    }
    return (
        <>
            <Row>
                <Col sm='6'>
                    <Label className='me-1' for='search-input'>
                        Buscar
                    </Label>
                    <Input
                        className='dataTable-filter'
                        type='text'
                        bsSize='sm'
                        id='search-input'
                        placeholder='buscar por nombre y apellidos'
                        onChange={handleFilter}
                    />
                </Col>
                <Col sm='4'></Col>

                <Col sm='2' className='mt-2'>

                    <Button onClick={toggle} color='primary'>
                        + Agregar
                    </Button>
                </Col>
            </Row>
            <TablaDirectorio
                data={data}
                filter={filter}
                search={search}
                actualizarDirectorioId={actualizarDirectorioId}
                eliminarDirectorio={eliminarDirectorio}
            />
            <FormDirectorio
                toggle={toggle}
                toggleActualizacion={toggleActualizacion}
                modal={modal}
                handleSubmit={handleSubmit}
                submit={submit}
                register={register}
                reset={reset}
                getAuthHeaders={getAuthHeaders}
                setFoto={setFoto}
            />
        </>

    )
}

export default Directorio