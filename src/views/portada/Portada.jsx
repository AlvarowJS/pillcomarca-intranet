import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Label, Row } from 'reactstrap';
import FromPortada from './FromPortada';
import TablaPortada from './TablaPortada';
import bdMuni from '../../api/bdMuni';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
const URL = 'v1/portada';
const URLPORTADA = 'v1/portada-update';
const URLINDEX = 'v1/portada-all';

const Portada = () => {
    const token = localStorage.getItem('token');
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState([]);
    const [modal, setModal] = useState(false);
    const [actualizacion, setActualizacion] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const { handleSubmit, register, reset } = useForm();
    const [foto, setFoto] = useState('');

    const defaulValuesForm = {
        nombre_portada: '',
        foto: '',
        estado: '',
        user_id: '' 
    };

    const getAuthHeaders = () => ({
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    const toggle = () => {
        setActualizacion(false);
        reset(defaulValuesForm);
        setModal(!modal);
    };

    const toggleActualizacion = () => {
        setModal(!modal);
    };

    useEffect(() => {
        bdMuni.get(`${URLINDEX}`, getAuthHeaders())
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [refresh]);

    useEffect(() => {
        setFilter(data?.filter(e => 
            e.nombre_portada?.toLowerCase().includes(search.toLowerCase())
        ));
    }, [search, data]);

    const handleFilter = (e) => {
        setSearch(e.target.value);
    };

    const crearPortada = (formData) => {
        const f = new FormData();
        f.append('nombre_portada', formData.nombre_portada);
        f.append('foto', foto);
        f.append('estado', formData.estado);
        f.append('user_id', formData.user_id);
        bdMuni.post(URL, f, getAuthHeaders())
            .then(res => {
                toggle();
                setRefresh(!refresh);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Portada creada',
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(err => {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error al crear portada',
                    showConfirmButton: false
                });
            });
    };

    const actualizarPortada = (id, formData) => {
        const f = new FormData();
        f.append('id', id);
        f.append('nombre_portada', formData.nombre_portada);
        f.append('foto', foto);
        f.append('estado', formData.estado);
        f.append('user_id', formData.user_id);
        bdMuni.post(`${URLPORTADA}`, f, getAuthHeaders())
            .then(res => {
                reset(defaulValuesForm);
                toggle();
                setRefresh(!refresh);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Portada actualizada',
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(err => {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error al actualizar portada',
                    showConfirmButton: false
                });
            });
    };

    const eliminarPortada = (id) => {
        return MySwal.fire({
            title: '¿Estás seguro de eliminar?',
            text: 'No podrás revertir esto',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-outline-danger ms-1'
            },
            buttonsStyling: false
        }).then(function (result) {
            if (result.value) {
                bdMuni.delete(`${URL}/${id}`, getAuthHeaders())
                    .then(res => {
                        setRefresh(!refresh);
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Portada eliminada',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })
                    .catch(err => {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'Error al eliminar portada',
                            showConfirmButton: false
                        });
                    });
            }
        });
    };

    const actualizarPortadaId = (id) => {
        toggleActualizacion();
        setActualizacion(true);
        bdMuni.get(`${URL}/${id}`, getAuthHeaders())
            .then(res => {
                reset(res.data);
            })
            .catch(err => null)
    };

    const submit = (formData) => {
        if (actualizacion) {
            actualizarPortada(formData.id, formData);
        } else {
            crearPortada(formData);
        }
    };

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
                        placeholder='buscar por nombre de portada'
                        onChange={handleFilter}
                    />
                </Col>
                
                <Col sm='4'></Col>

                <Col sm='2' className='dataTable-filter'>

                    <Button onClick={toggle} color='primary'>
                        Registar portada
                    </Button>
                </Col>
            </Row>
            <TablaPortada
                data={data}
                filter={filter}
                search={search}
                actualizarPortadaId={actualizarPortadaId}
                eliminarPortada={eliminarPortada}
            />
            <FromPortada
                toggle={toggle}
                modal={modal}
                handleSubmit={handleSubmit}
                register={register}
                reset={reset}
                submit={submit}
                getAuthHeaders={getAuthHeaders}
                setFoto={setFoto}
            />
        </>
    );
};

export default Portada;
