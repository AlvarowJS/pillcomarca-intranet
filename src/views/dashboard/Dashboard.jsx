import React, { useEffect, useState } from 'react'
import bdMuni from '../../api/bdMuni'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import TicketMes from './TicketMes';
import Hardware from './Hardware';
import DependenciaTicket from './DependenciaTicket';

const URLFECHA = '/v1/estadistica-fecha'
const URLHARDWARE = '/v1/estadistica-hardware'
const URLDEPENDENCIASTICKET = '/v1/estadistica-dependencia'

const Dashboard = () => {
    const token = localStorage.getItem('token')
    // Fechas
    const [labelTicketMes, setLabelTicketMes] = useState([]);
    const [totalTicketMes, setTotalTicketMes] = useState([]);
    const [maxTotalTicketMes, setMaxTotalTicketMes] = useState()
    // Hardware
    const [labelHardware, setLabelHardware] = useState([]);
    const [totalHardware, setTotalHardware] = useState([])
    const [maxTotalHardware, setMaxTotalHardware] = useState()

    // Areas
    const [labelDependenciasTicket, setLabelDependenciasTicket] = useState([])
    const [totalDependenciasTicket, setTotalDependenciasTicket] = useState([])
    const [maxTotalDependenciasTicket, setMaxTotalDependenciasTicket] = useState()
    const getAuthHeaders = () => ({
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    const roundUpToNext10 = (num) => {
        return Math.ceil(num / 10) * 10;
    };
    useEffect(() => {
        bdMuni.get(URLDEPENDENCIASTICKET, getAuthHeaders())
          .then(res => {
              const data = res?.data;
              if (data) {
                  const dependencia = data.map(item => item.nombre_dependencia);
                  const total = data.map(item => item.total);
                  const maxTotal = roundUpToNext10(Math.max(...total));
                  setMaxTotalDependenciasTicket(maxTotal);
                  setLabelDependenciasTicket(dependencia);
                  setTotalDependenciasTicket(total);
  
              }
          })
          .catch(err => console.log(err))
  
      }, [])

    useEffect(() => {
        bdMuni.get(URLFECHA, getAuthHeaders())
            .then(res => {
                const data = res?.data;
                if (data) {
                    const meses = data.map(item => item.mes);
                    const totalTicketMes = data.map(item => item.total);
                    const maxTotalTicketMes = roundUpToNext10(Math.max(...totalTicketMes));
                    setMaxTotalTicketMes(maxTotalTicketMes);
                    setLabelTicketMes(meses);
                    setTotalTicketMes(totalTicketMes);
                }
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
      bdMuni.get(URLHARDWARE, getAuthHeaders())
        .then(res => {
            const data = res?.data;
            if (data) {
                const hardware = data.map(item => item.nombre);
                const total = data.map(item => item.total);
                const maxTotal = roundUpToNext10(Math.max(...total));
                setMaxTotalHardware(maxTotal);
                setLabelHardware(hardware);
                setTotalHardware(total);

            }
        })
        .catch(err => console.log(err))

    }, [])
    
 

    return (
        <div>
            <Card>
                <CardHeader className='d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column'>
                    <CardTitle tag='h4'>TICKETS ATENDIDOS POR MES</CardTitle>
                </CardHeader>
                <CardBody>
                    <div style={{ height: '400px' }}>
                        <TicketMes
                            maxTotalTicketMes={maxTotalTicketMes}
                            labelTicketMes={labelTicketMes}
                            totalTicketMes={totalTicketMes}
                        />
                    </div>
                </CardBody>

                <CardHeader className='d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column'>
                    <CardTitle tag='h4'>HARDWARE MAS ATENDIDO</CardTitle>
                </CardHeader>
                <CardBody>
                    <div style={{ height: '400px' }}>
                        <Hardware
                            maxTotalHardware={maxTotalHardware}
                            totalHardware={totalHardware}
                            labelHardware={labelHardware}
                        />
                    </div>
                </CardBody>

                <CardHeader className='d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column'>
                    <CardTitle tag='h4'>CANTIDAD DE TICKETS POR DEPENDENCIA</CardTitle>
                </CardHeader>
                <CardBody>
                    <div style={{ height: '400px' }}>
                        <DependenciaTicket
                            maxTotalDependenciasTicket={maxTotalDependenciasTicket}
                            totalDependenciasTicket={totalDependenciasTicket}
                            labelDependenciasTicket={labelDependenciasTicket}
                        />
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default Dashboard