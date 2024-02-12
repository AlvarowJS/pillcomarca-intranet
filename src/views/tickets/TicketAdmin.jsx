import React, { useEffect, useState } from 'react'
import bdMuni from '../../api/bdMuni';
import { useForm } from 'react-hook-form';

// swal
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import TicketAdminTabla from './admin/TicketAdminTabla';
const MySwal = withReactContent(Swal)

const URL = '/v1/ticket'
const TicketAdmin = () => {
  const token = localStorage.getItem('token');
  const idu = localStorage.getItem('idu');
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [modal, setModal] = useState(false);
  const { handleSubmit, control, register, reset } = useForm();
  const getAuthHeaders = () => ({
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });

  useEffect(() => {
    bdMuni.get(`${URL}`, getAuthHeaders())
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.error('Error fetching user tickets:', err);
      });
  }, [refresh]);
  return (
    <div>

      <TicketAdminTabla
        data={data}
      />
    </div>
  )
}

export default TicketAdmin