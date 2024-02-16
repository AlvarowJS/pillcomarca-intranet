import React, { Fragment, useEffect, useState } from 'react'
import TablaNormativa from './TablaNormativa'
import bdMuni from '../../api/bdMuni';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
const URL = '/v1/documentonormativa'

const DocumentosNormativa = () => {
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
                setData(res.data.data)
            })
            .catch(err => {

            })
  }, [])


  return (
    <>
      <TablaNormativa 
      data={data}
      />
      {/* <FormNormativa /> */}

    </>
  )
}

export default DocumentosNormativa