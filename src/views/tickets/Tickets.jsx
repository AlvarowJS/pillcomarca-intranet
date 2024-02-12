import React from 'react'
import TicketUser from './TicketUser'
import TicketAdmin from './TicketAdmin'

const Tickets = () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('idu');
  const cargo = localStorage.getItem('cargo');

  return (
    <>
      {cargo == "1" ?
        <TicketAdmin />
        :
        <TicketUser />

      }
    </>
  )
}

export default Tickets