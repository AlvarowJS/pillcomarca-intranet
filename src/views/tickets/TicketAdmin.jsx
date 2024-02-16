import React, { useEffect, useState } from 'react'
import bdMuni from '../../api/bdMuni';
import { useForm } from 'react-hook-form';

// swal
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import TicketAdminTabla from './admin/TicketAdminTabla';
import TicketAdminForm from './admin/TicketAdminForm';
const MySwal = withReactContent(Swal)

const URL = '/v1/ticket'
const URLATENDER = '/v1/ticket-atender/'

const TicketAdmin = () => {
  const token = localStorage.getItem('token');
  const idu = localStorage.getItem('idu');
  const [horaActual, setHoraActual] = useState();
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [modal, setModal] = useState(false);
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

  const submit = (data) => {
    console.log(data)
  }
  return (
    <div>

      <TicketAdminTabla
        data={data}
        atenderTicket={atenderTicket}
        finalizarTicket={finalizarTicket}
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

        horaActual={horaActual}
      />
    </div>
  )
}

export default TicketAdmin