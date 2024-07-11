import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import bdMuni from '../../api/bdMuni';
import UserForm from './UserForm';
import UserTable from './UserTable';
import UserFormPass from './UserFormPass';

const URL = '/v1/usuarios';
const URLSAVE = '/register-user';
const URLGET = '/get-user';
const URLUPD = '/update-user';
const URLPass = '/actualizar-password';

const Users = () => {
  const [refresh, setRefresh] = useState(false)
  const [data, setData] = useState();
  const [modal, setModal] = useState(false);
  const [modalPass, setModalPass] = useState(false);
  const [actualizacion, setActualizacion] = useState(false);
  const [actualizacionPass, setActualizacionPass] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const token = localStorage.getItem("token");

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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const actualizarUsuarios = (id, data) => {
    bdMuni.put(`${URLUPD}/${id}`, data, getAuthheaders())
      .then(res => {
        reset(defaultValuesForm);
        setRefresh(!refresh);
        toggle();
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
        console.log(err);
      });
  };

  const actualizarPass = (id, data) => {
    bdMuni.put(`${URLPass}/${id}`, data, getAuthheaders())
      .then(res => {
        reset(defaultValuesForm);
        setRefresh(!refresh);
        togglePass();
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

  return (
    <>
      <button className='btn btn-primary' onClick={toggle}>
        +Agregar
      </button>
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
        togglePass = {togglePass}
        modalPass = {modalPass}
        handleSubmit={handleSubmit}
        register={register}
        reset={reset}
        submit={submit}
      />
      <UserTable
        data={data}
        actualizaUsuariosId={actualizaUsuariosId}
        actualizarPassId={actualizarPassId}
      />
    </>
  );
};

export default Users;
