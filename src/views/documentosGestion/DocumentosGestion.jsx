import React, { Fragment, useEffect, useState } from 'react'
import TablaGestion from './TablaGestion'
import FormGestion from './FormGestion'
import bdMuni from '../../api/bdMuni';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

import { Breadcrumb, Col, Card, Row, Button } from 'reactstrap'

import { useForm } from 'react-hook-form'

const DocumentosGestion = () => {

  

  return (
    <>
      <TablaGestion />
      <FormGestion />

    </>
  )
}

export default DocumentosGestion