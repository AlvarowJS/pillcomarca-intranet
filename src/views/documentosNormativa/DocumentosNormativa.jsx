import React, { Fragment, useEffect, useState } from 'react'
import TablaNormativa from './TablaNormativa'
import FormNormativa from './FormNormativa'
import bdMuni from '../../api/bdMuni';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
const URL = '/v1/documentonormativa'
const URLSIMPLE = '/v1/documentonormativa-simple'
import { Breadcrumb, Col, Card, Row, Button } from 'reactstrap'

import { useForm } from 'react-hook-form'

const DocumentosNormativa = () => {
  const token = localStorage.getItem('token')
  const [modal, setModal] = useState(false)
  const [actualizacion, setActualizacion] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const { handleSubmit, register, reset } = useForm()
  const [data, setData] = useState()
  const getAuthHeaders = () => ({
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });
  const defaulValuesForm = {
    nombre: '',fecha:'',descripcion:'',archivo:''
  }
  const toggle = () => {
    setActualizacion(false)
    reset(defaulValuesForm)
    setModal(!modal)
  }
  const toggleActualizacion = () => {
    setModal(!modal)
  }
  useEffect(() => {
    bdMuni.get(URLSIMPLE, getAuthHeaders())
      .then(res => {
        setData(res.data)
      })
      .catch(err => {

      })
  }, [refresh])
  const crearNormativa = (data) => {

    bdMuni.post(URL, data, getAuthHeaders())
      .then(res => {
        reset(defaulValuesForm)
        toggle.call()
        setRefresh(!refresh)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Normativa Creada',
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
  const actualizarNormativa = (id, data) => {

    bdMuni.put(`${URL}/${id}`, data, getAuthHeaders())
      .then(res => {
        console.log(res.data)
        reset(defaulValuesForm)
        toggle.call()
        setRefresh(!refresh)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Normativa Actualizada',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch(err => {
        console.log(err)
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Contacte con soporte',
          showConfirmButton: false,
        })
      })
  }
  const actualizarNormativaId = (id) => {
    toggleActualizacion.call()
    setActualizacion(true)
    bdMuni.get(`${URL}/${id}`, getAuthHeaders())
      .then(res => {
        reset(res.data.data.attributes)
      })
      .catch(err => null)
  }

  const eliminarNormativa = (id) => {
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
              title: 'Normativa Eliminada',
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


  const submit = (data) => {
console.log(data)
    if (actualizacion) {
      actualizarNormativa(data.id, data)
    } else {
      crearNormativa(data)
    }
  }
  return (
    <>
      <button
        className='btn btn-info'
        onClick={toggle}
      >
        Registrar Normativa
      </button>
      <TablaNormativa
        data={data}
        actualizarNormativaId={actualizarNormativaId}
        eliminarNormativa={eliminarNormativa}

      />
      <FormNormativa
        toggle={toggle}
        modal={modal}
        handleSubmit={handleSubmit}
        submit={submit}
        register={register}
        reset={reset}
        getAuthHeaders={getAuthHeaders}
      />

    </>
  )
}


export default DocumentosNormativa