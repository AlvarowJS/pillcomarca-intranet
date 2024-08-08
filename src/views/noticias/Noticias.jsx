
import React, { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Breadcrumb, Col, Card, Row, Button, Label, Input } from 'reactstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import bdMuni from '../../api/bdMuni';
import FormNoticia from './FormNoticia';
import TablaNoticias from './TablaNoticias'
const MySwal = withReactContent(Swal)


const Noticias = () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('idu');
  const [modal, setModal] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [estado, setEstado] = useState(false)
  const [objUpdate, setObjUpdate] = useState()
  const [data, setData] = useState([]);
  const [search, setSearch] = useState()
  const [filter, setFilter] = useState()
  const [getData, setGetData] = useState()
  const [currentPage, setCurrentPage] = useState(1);
  const { handleSubmit, control, register, reset, setError, formState: { errors } } = useForm()
  const defaultValuesForm = {
    titulo: '',
    fecha: '',
    nota: '',
    referencia: '',
    imagen: '',
    categoria_id: ''
  }
  const [formArray, setFormArray] = useState([])
  const [formArrayBack, setFormArrayBack] = useState([])
  const [count, setCount] = useState(1)
  const increaseCount = () => {
    setFormArray([...formArray, { imagen: '' }]);
    setCount(count + 1)
  }

  const deleteForm = (index) => {
    const updatedFormData = [...formArray];
    updatedFormData.splice(index, 1);
    setFormArray(updatedFormData);
    setCount(count - 1);
  }
  const handleChange = (index, field, value) => {
    const updatedFormData = [...formArray];
    updatedFormData[index] = {
      ...updatedFormData[index],
      [field]: value,
    };
    setFormArray(updatedFormData);
  };

  const toggle = () => {
    setModal(!modal)
    if (objUpdate !== undefined) {
      reset(defaultValuesForm)
    }
  };

  const crearNoticia = data => {

    bdMuni.post('/v1/noticia', data, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        // setEstado(true)
        setRefresh(!refresh)
        setFormArray([])
        reset(defaultValuesForm)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro creado',
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

  const updateNoticia = (id, data) => {
    setEstado(false)
    bdMuni.patch(`/v1/noticia/${id}`, data, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        // setEstado(true)
        setRefresh(!refresh)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Visita Actualizado',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch(err => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Contacte con el encargado',
          showConfirmButton: false,
        })
      })
  }
  const updateNoticiaById = (id) => {
    setEstado(false)
    toggle.call()
    bdMuni.get(`/v1/noticia/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        const imagenes = res?.data?.noticia_imagenes
        const arrayImagenes = []
        imagenes?.map((item) => {
          // arrayImagenes.push(item.imagen)
          arrayImagenes.push({ 'imagen': item?.imagen })
        })
        setFormArray(arrayImagenes)
        setObjUpdate(res?.data)
        const object = res?.data
        reset(object)
      })
      .catch(err => {

      })
  }
  const submit = (data) => {

    const imagenes = formArray.map((element) => element.imagen);
    data.imagen = imagenes
    data.user_id = userId

    if (objUpdate !== undefined) {
      updateNoticia(objUpdate?.id, data)
      reset(defaultValuesForm)
      toggle.call()

    } else {
      reset(defaultValuesForm)
      crearNoticia(data)
      toggle.call()
    }
  }
  useEffect(() => {

    bdMuni.get(`/v1/noticias-intra`,
      {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then(res => {
        setGetData(res.data)
      })
      .catch(err => {

      })
  }, [refresh])

  const handleFilter = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setFilter(getData?.filter(e =>
    (e.titulo && e.nota &&
      (e.titulo.toLowerCase() + ' ' + e.nota.toLowerCase()).indexOf(search?.toLowerCase()) !== -1)
    ))
  }, [search])

  return (
    <Fragment>
      <Card className='p-2'>
        <Row>
        <Col md="3">
            <Label className='' for='search-input'>
              Buscar
            </Label>
            <Input
              className='dataTable-filter'
              type='text'
              bsSize='sm'
              id='search-input'
              placeholder='buscar por titulo o nota'
              onChange={handleFilter}
            />
          </Col>
          <Col md="3">
          </Col>
          <Col md='3'>
            <Button className='mt-2' color='primary' onClick={toggle}>
              Registrar Noticia
            </Button>
          </Col>
         
         
        </Row>

      </Card>
      <TablaNoticias
        updateNoticiaById={updateNoticiaById}
        getData={getData}
        estado={estado}
        filter={filter}
        search={search}
      />

      <FormNoticia
        toggle={toggle}
        modal={modal}
        setModal={setModal}
        handleSubmit={handleSubmit}
        submit={submit}
        control={control}
        register={register}
        reset={reset}
        errors={errors}

        formArray={formArray}
        setFormArray={setFormArray}
        formArrayBack={formArrayBack}
        setFormArrayBack={setFormArrayBack}
        increaseCount={increaseCount}
        deleteForm={deleteForm}
        setCount={setCount}
        count={count}
        handleChange={handleChange}
      />
    </Fragment>
  )
}

export default Noticias