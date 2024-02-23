import React, { useEffect, useState } from 'react'
import bdMuni from '../../api/bdMuni';
import { useForm } from 'react-hook-form';

// swal
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import TicketAdminTabla from './admin/TicketAdminTabla';
import TicketAdminForm from './admin/TicketAdminForm';
import { Link } from 'react-router-dom';
const MySwal = withReactContent(Swal)

const URL = '/v1/ticket'
const URLATENDER = '/v1/ticket-atender/'
const URLFINALIZAR = 'v1/ticket-finalizar/'

const TicketAdmin = () => {
  const token = localStorage.getItem('token');
  const idu = localStorage.getItem('idu');
  const [horaActual, setHoraActual] = useState();
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [modal, setModal] = useState(false);
  const [hardware_id, setHardware_id] = useState()
  const { handleSubmit, control, register, reset } = useForm();
  const getAuthHeaders = () => ({
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });
  const defaultValuesForm = {
    conclusion: '',
    urgencia_verdad: '',
    hardware_id: '',
  }
  const toggle = () => {
    setModal(!modal)
    reset(defaultValuesForm)
  };

  useEffect(() => {
    bdMuni.get(URL, getAuthHeaders())
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.error('Error fetching user tickets:', err);
      });
  }, [refresh]);

  const atenderTicket = (idTicket) => {
    bdMuni.put(`${URLATENDER}${idTicket}`, data, getAuthHeaders())
      .then(res => {
        setRefresh(true)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Atendiendo Ticket',
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
  const obtenerHoraActual = () => {
    const ahora = new Date();
    const horas = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    return `${horas}:${minutos}`;
  };

  const finalizarTicket = (id) => {
    toggle.call()
    setHoraActual(obtenerHoraActual());
    bdMuni.get(`${URL}/${id}`, getAuthHeaders())
      .then(res => {
        reset(res.data)
      })
      .catch(err => null)
  }

  const terminarTicket = (id, data) => {
    bdMuni.put(`${URLFINALIZAR}${id}`, data, getAuthHeaders())
      .then(res => {
        setRefresh(!refresh)
        toggle.call()
        reset(defaultValuesForm)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'TICKET TERMINADO',
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

  const submit = (data) => {
    data.hardware_id = hardware_id
    terminarTicket(data.id, data)
  }

  const crearInventario = () => {
    history.push('/tickets/hardware');

  }
  const exportarPdf = (id) => {
      window.open(`https://sv-yptplguxwm.cloud.elastika.pe/api/v1/ticket-exportar/${id}`)  
  }
  return (
    <div>

      <Link to='/tickets/hardware' className='btn btn-success' onClick={() => crearInventario()}>
        Crear Inventario
      </Link>

      <TicketAdminTabla
        data={data}
        atenderTicket={atenderTicket}
        finalizarTicket={finalizarTicket}
        exportarPdf={exportarPdf}
      />

      <TicketAdminForm
        toggle={toggle}
        modal={modal}
        setModal={setModal}
        handleSubmit={handleSubmit}
        submit={submit}
        control={control}
        register={register}
        reset={reset}
        getAuthHeaders={getAuthHeaders}
        horaActual={horaActual}
        setHardware_id={setHardware_id}
      />
    </div>
  )
}

export default TicketAdmin