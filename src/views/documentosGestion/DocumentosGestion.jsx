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
  const [data, setData] = useState()
  const getAuthHeaders = () => ({
    headers: {
        'Authorization': 'Bearer ' + token
    }
});
  useEffect(() => {
    bdMuni.get(URL, getAuthHeaders())
            .then(res => {
                setData(res.data)
            })
            .catch(err => {

            })
  }, [])
  

  return (
    <>
      <TablaGestion 
      data={data}
      />
      <FormGestion />

    </>
  )
}

export default DocumentosGestion