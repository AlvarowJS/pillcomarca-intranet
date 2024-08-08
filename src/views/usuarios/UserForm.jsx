import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import bdMuni from '../../api/bdMuni';

const URLCARGO = '/v1/cargos'
const URLDEPENDENCIAS = '/v1/cargos-dependencias'
const URLROLES = '/roles'

const UserForm = ({ toggle, modal, handleSubmit, refresh, register, reset, submit, isNewUser, showPasswordInput }) => {

  const [data, setData] = useState();
  const [dataDep, setDataDep] = useState();
  const [dataRoles, setDataRoles] = useState();
  const token = localStorage.getItem("token");
  const getAuthheaders = () => ({
    headers: {
      Authorization: "Bearer " + token,
    },
  })

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resDep, resCarg, resRol] = await Promise.all([
          bdMuni.get(URLDEPENDENCIAS, getAuthheaders()),
          bdMuni.get(URLCARGO, getAuthheaders()),
          bdMuni.get(URLROLES, getAuthheaders())
        ]);
        setData(resCarg.data);
        setDataDep(resDep.data);
        setDataRoles(resRol.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (token) {
      fetchData();
    } else {
      console.error("Token no encontrado");
    }
  }, [refresh, token]);

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader>
        {isNewUser ? "Registrar Nuevo Usuario" : showPasswordInput ? "Actualizar Contraseña" : "Actualizar Usuario"}
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(submit)}>
          <div className='form-group'>
            <label>Nombres</label>
            <input
              className='form-control'
              type='text'
              placeholder='Ingrese sus Nombres'
              {...register('nombres')}
            />
          </div><br />
          <div className='form-group'>
            <label>Apellidos</label>
            <input
              className='form-control'
              type='text'
              placeholder='Ingrese sus Apellidos'
              {...register('apellidos')}
            />
          </div><br />
          <div className='form-group'>
            <label>Celular</label>
            <input
              className='form-control'
              type='text'
              placeholder='Ingrese su Celular'
              {...register('celular')}
            />
          </div><br />
          <div className='form-group'>
            <label>DNI</label>
            <input
              className='form-control'
              type='text'
              placeholder='Ingrese su DNI'
              {...register('dni')}
            />
          </div><br />
          <div className='form-group'>
            <label>Correo Electrónico</label>
            <input
              className='form-control'
              type='text'
              placeholder='Ingrese su Correo'
              {...register('email')}
            />
          </div><br />
          {isNewUser || showPasswordInput ? (
            <div className='form-group'>
              <label>Contraseña</label>
              <input
                className='form-control'
                type='text'
                placeholder='Ingrese su Contraseña'
                {...register('password')}
              />
            </div>
          ) : null}
          <div className='form-group'>
            <label>ROl</label>
            <select
              className='form-control'
              {...register('role_id')}
              required>
              <option value="role_id">Seleccionar Rol</option>
              {dataRoles?.map((item) => (
                <option key={item?.id} value={item?.id}>
                  {item?.name}
                </option>
              ))}
            </select>
          </div><br />
          <div className='form-group'>
            <label>Cargo</label>
            <select
              className='form-control'
              {...register('cargo_id')}
              required>
              <option value="">Seleccionar el Cargo</option>
              {data && data.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nombre_cargo}
                </option>
              ))}
            </select>
          </div><br />
          <div className='form-group'>
            <label>Dependencia</label>
            <select
              className='form-control'
              {...register('dependencia_id')}
              required>
              <option value="">Seleccionar la Dependencia</option>
              {dataDep && dataDep.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nombre_dependencia}
                </option>
              ))}
            </select>
          </div><br />
          <button className='btn btn-primary'>Guardar</button>
        </form>
      </ModalBody>
    </Modal>
  );
}

export default UserForm;
