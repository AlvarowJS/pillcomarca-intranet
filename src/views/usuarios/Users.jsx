import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import bdMuni from '../../api/bdMuni';
import UserForm from './UserForm';
import UserTable from './UserTable';
import UserFormPass from './UserFormPass';
import { Col, Input, Label, Row } from 'reactstrap';
// sweetalert2
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const URL = '/v1/usuarios';
const URLSAVE = '/register-user';
const URLGET = '/get-user';
const URLUPD = '/update-user';
const URLPass = '/actualizar-password';

const Users = () => {
  const [refresh, setRefresh] = useState(false)
  const [data, setData] = useState();
  const [filter, setFilter] = useState();
  const [modal, setModal] = useState(false);
  const [modalPass, setModalPass] = useState(false);
  const [actualizacion, setActualizacion] = useState(false);
  const [actualizacionPass, setActualizacionPass] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const token = localStorage.getItem("token");
  const [search, setSearch] = useState()

  const defaultValuesForm = {
    nombres: '',
    apellidos: '',
    celular: '',
    dni: '',
    email: '',
    estado: '',
    password: '',
  };

  const toggle = () => {
    setActualizacion(false)
    setActualizacionPass(false)
    reset(defaultValuesForm)
    setModal(!modal)
  };

  const togglePass = () => {
    setModalPass(!modalPass)
  }

  const toggleActualizacion = () => {
    setActualizacion(true);
  };

  const getAuthheaders = () => ({
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  useEffect(() => {
    bdMuni
      .get(URL, getAuthheaders())
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const crearUsuarios = (data) => {
    bdMuni
      .post(URLSAVE, data, getAuthheaders())
      .then((res) => {
        toggle();
        reset(defaultValuesForm);
        setRefresh(!refresh);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario Creado',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch((err) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Contacte con soporte',
          showConfirmButton: false,
        })
      });
  };

  const actualizarUsuarios = (id, data) => {
    bdMuni.put(`${URLUPD}/${id}`, data, getAuthheaders())
      .then(res => {
        reset(defaultValuesForm);
        setRefresh(!refresh);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario Actualizado',
          showConfirmButton: false,
          timer: 1500
        })
        toggle();
        
      })
      .catch(err => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Contacte con soporte',
          showConfirmButton: false,
        })
      });
  };

  const actualizaUsuariosId = (id) => {
    toggle();
    setActualizacion(true);
    bdMuni.get(`${URLGET}/${id}`, getAuthheaders())
      .then(res => {
        reset(res.data.user);
       
      })
      .catch(err => {
        
      });
  };

  const actualizarPass = (id, data) => {
    bdMuni.put(`${URLPass}/${id}`, data, getAuthheaders())
      .then(res => {
        reset(defaultValuesForm);
        setRefresh(!refresh);
        togglePass();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Contraseña Actualizada',
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
      });

  };

  const actualizarPassId = (id) => {
    togglePass();
    setActualizacionPass(true);
    bdMuni.get(`${URLGET}/${id}`, getAuthheaders())
      .then(res => {
        reset(res.data.user);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const submit = (data) => {
    if (actualizacion) {
      actualizarUsuarios(data.id, data);
    } else if (actualizacionPass) {
      actualizarPass(data.id, data);
    } else {
      crearUsuarios(data);
    }
  };

  const handleFilter = (e) => {
    setSearch(e.target.value)
  };

  useEffect(() => {
    setFilter(data?.filter(e =>
    (e.nombres && e.apellidos &&
      (e.nombres.toLowerCase() + ' ' + e.apellidos.toLowerCase()).indexOf(search?.toLowerCase()) !== -1)
    ))
  }, [search])

  console.log(data, "los usuarios");
  return (
    <>
      <Row className='mb-2'>
        <Col sm='6'>
          <Label className='me-1' for='search-input'>
            Buscar
          </Label>
          <Input
            className='dataTable-filter'
            type='text'
            bsSize='sm'
            id='search-input'
            onChange={handleFilter}
          />
        </Col>
        <Col sm='3'></Col>
        <Col sm='3'>
          <button className='btn btn-primary mt-2' onClick={toggle}>
            +Agregar
          </button>
        </Col>

      </Row>

      <UserForm
        toggle={toggle}
        modal={modal}
        handleSubmit={handleSubmit}
        register={register}
        reset={reset}
        submit={submit}
        isNewUser={!actualizacion && !actualizacionPass}
        showPasswordInput={actualizacionPass}
      />
      <UserFormPass
        togglePass={togglePass}
        modalPass={modalPass}
        handleSubmit={handleSubmit}
        register={register}
        reset={reset}
        submit={submit}
      />
      <UserTable
        data={data}
        filter={filter}
        search={search}
        actualizaUsuariosId={actualizaUsuariosId}
        actualizarPassId={actualizarPassId}
      />
    </>
  );
};

export default Users;
