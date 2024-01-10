import React, { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Breadcrumb, Col, Card, Row, Button } from 'reactstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
import IntervencionForm from './IntervencionForm'
import bdMuni from '../../api/bdMuni';
const Intervencion = () => {
    const [modal, setModal] = useState(false)
    const toggle = () => {
        setModal(!modal)

    };

    const defaultValuesForm = {
        detalles: '',
        fecha: '',
        hora: '',
        direcicon: '',
        numero: '',
        referencia: '',
        tipo: ''
    }
    return (
        <>
            <Fragment>
                <Card className='p-4'>
                    <Row>
                        <Col lg='6' className='d-flex align-items-center px-0 px-lg-1'>
                            <Button className='mt-sm-0 mt-1' color='primary' onClick={toggle}>
                                Registrar Intervención
                            </Button>
                        </Col>
                    </Row>

                    <IntervencionForm
                        toggle={toggle}
                        modal={modal}
                        setModal={setModal}
                    />
                </Card>
            </Fragment>
        </>
    )
}

export default Intervencion