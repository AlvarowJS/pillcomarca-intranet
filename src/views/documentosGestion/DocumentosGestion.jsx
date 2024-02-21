import React, { Fragment, useEffect, useState } from 'react'
import TablaGestion from './TablaGestion'
import FormGestion from './FormGestion'
import bdMuni from '../../api/bdMuni';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
const URL = '/v1/gestiondetalle'
import { Breadcrumb, Col, Card, Row, Button } from 'reactstrap'

import { useForm } from 'react-hook-form'

const DocumentosGestion = () => {
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
    nombre: '',
    link: '',
    gestion_id: '',
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
    bdMuni.get(URL, getAuthHeaders())
      .then(res => {
        setData(res.data)
      })
      .catch(err => {

      })
  }, [refresh])
  const crearInstumentoDetalle = (data) => {

    bdMuni.post(URL, data, getAuthHeaders())
      .then(res => {
        reset(defaulValuesForm)
        toggle.call()
        setRefresh(!refresh)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Instrumento Creado',
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
  const actualizarGestion = (id, data) => {

    bdMuni.put(`${URL}/${id}`, data, getAuthHeaders())
      .then(res => {
        console.log(res.data)
        reset(defaulValuesForm)
        toggle.call()
        setRefresh(!refresh)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Instrumento Actualizado',
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
  const actualizarGestionId = (id) => {
    toggleActualizacion.call()
    setActualizacion(true)
    bdMuni.get(`${URL}/${id}`, getAuthHeaders())
      .then(res => {
        reset(res.data)
      })
      .catch(err => null)
  }
  const eliminarGestion =(id) =>{
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
                      title: 'Instrumento Eliminado',
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
  }) }


  const submit = (data) => {
    if (actualizacion) {
      actualizarGestion(data.id, data)
    } else {
      crearInstumentoDetalle(data)
    }

  }
  return (
    <>
      <button
        className='btn btn-info'
        onClick={toggle}
      >
        Registrar Instrumento
      </button>
      <TablaGestion
        data={data}
        actualizarGestionId={actualizarGestionId}
        eliminarGestion={eliminarGestion}

      />
      <FormGestion
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

export default DocumentosGestion