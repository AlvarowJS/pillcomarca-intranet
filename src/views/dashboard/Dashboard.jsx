import React, { useEffect, useState } from 'react'
import bdMuni from '../../api/bdMuni'
const URLFECHA = '/v1/estadistica-fecha'
const Dashboard = () => {
    const token = localStorage.getItem('token')
    const [labelFechas, setLabelFechas] = useState()

    const getAuthHeaders = () => ({
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });


    useEffect(() => {
        bdMuni.get(URLFECHA, getAuthHeaders())
            .then(res => {
                setFechas(res.data)
                console.log(res?.data)
            })
            .catch(err => console.log(err))
    }, [])
    console.log(fechas, "fechas")

    // const fechaData = {
    //     labels: [
    //         fechas?.fecha
    //     ]


    // }
    return (
        <div>


        </div>
    )
}

export default Dashboard