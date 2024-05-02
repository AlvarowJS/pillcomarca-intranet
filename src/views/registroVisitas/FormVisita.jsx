import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import bdMuni from '../../api/bdMuni'
import Select from 'react-select'

const FormVisita = ({
    modal, toggle, submit, control, register,
    reset, errors, handleSubmit, oficina, setOficina,
    nombre, setNombre, apellidos, setApellidos, datosUser, setDatosUser,
    setEstadoDni, estadoDni,currentTime,setCurrentTime
}) => {

    const intervalRef = useRef(null);

    const [dependencias, setDependencias] = useState()
    const [mensaje, setMensaje] = useState()

    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);


    useEffect(() => {
        bdMuni.get('/v1/cargos-dependencias')
            .then(res => {
                setDependencias(res.data)
            })
            .catch(err => {
            })
    }, [])

    useEffect(() => {
        const intervalRef = setInterval(() => {
          setCurrentTime(
            new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
          );
        }, 1000);
    
        return () => {
          clearInterval(intervalRef);
        };
      }, []);


    const handleChange = (selected) => {
        setOficina(selected);
    };

    const options = dependencias?.map(option => ({
        value: option?.id,
        label: option?.nombre_dependencia
    }));

    const buscarPorDni = (dni) => {
        setEstadoDni(true)
        const dniVal = dni.value
        bdMuni.get(`v1/usuario-publico/${dniVal}`)
            .then(res => {
                setDatosUser(res.data)
                setNombre(res.data.nombre)
                setApellidos(res.data.apellidos)
                setMensaje('')
            })
            .catch(err => {
                setNombre('')
                setApellidos('')
                setMensaje('DNI no encontrado, porfavor registra el DNI con el boton Crear')
            })
    }

    const crearDni = () => {
        setEstadoDni(false)
        setNombre('')
        setApellidos('')
    }

    const handleNameChange = (event) => {
        const newValue = event.target.value
        setNombre(newValue)
    }
    const handleLastNameChange = (event) => {
        const newValue = event.target.value
        setApellidos(newValue)
    }
    return (

        <Modal isOpen={modal} toggle={toggle} size='lg'>
            <ModalHeader toggle={toggle}>
                Registrar Ingreso
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit(submit)}>
                    <div className="form-group mx-4 mb-2">
                        <label htmlFor="fecha">Fecha</label>
                        <input type="date" className="form-control"
                            id="fecha"
                            {...register('fecha')}
                            value={currentDate}
                            onChange={(e) => setCurrentDate(e.target.value)}
                        />
                    </div>
                    <div className="form-group mx-4 mb-2">

                        <label htmlFor="dni">DNI</label>
                        <div className='d-flex gap-1'>
                            <input type="text" className="form-control" id="dni"
                                {...register('dni')}
                                placeholder="Ingrese el dni"

                                required
                            />

                            <button type='button' className='btn btn-primary' onClick={() => buscarPorDni(dni)}>Buscar</button>
                            <button type='button' className='btn btn-success' onClick={() => crearDni()}>Crear</button>
                        </div>
                        <p className='text-warning'>{mensaje}</p>

                    </div>
                    <div className="form-group mx-4 mb-2">
                        <label htmlFor="nombre">Nombres</label>
                        <input type="text" className="form-control" id="nombre"
                            {...register('nombre')}
                            placeholder="Ingrese Nombres"
                            disabled={estadoDni}
                            value={nombre}
                            onChange={handleNameChange}
                            required
                        />
                    </div>

                    <div className="form-group mx-4 mb-2">
                        <label htmlFor="apellidos">Apellidos</label>
                        <input type="text" className="form-control" id="apellidos"
                            placeholder="Ingrese Apellidos"
                            {...register('apellidos')}
                            disabled={estadoDni}
                            value={apellidos}
                            onChange={handleLastNameChange}
                            required
                        />
                    </div>


                    <div className="form-group mx-4 mb-2">
                        <label htmlFor="persona">Persona </label>
                        <select className="form-select" id="persona" {...register('persona')}  >
                            <option value="Persona Natural">Persona Natural</option>
                            <option value="Persona Juridica">Persona Juridica</option>
                        </select>
                    </div>

                    <div className="form-group mx-4 mb-2">
                        <label htmlFor="asunto">Asunto</label>
                        <textarea type="text" className="form-control" id="asunto"
                            {...register('asunto')}                            
                        />
                    </div>
                    <div className="form-group mx-4 mb-2">
                        <label htmlFor="oficina">Oficina</label>
                        {/* <select className="form-select" id="oficina" {...register("oficina")}>
                            <option key="" value="">No especifica</option>
                            {
                                dependencias?.map(option => (
                                    <option key={option.id} value={option.nombre_dependencia}>{option.nombre_dependencia}</option>
                                ))
                            }
                        </select> */}
                        <Select
                            id="oficina"
                            // {...register("oficina")}
                            // options={dependencias?.map(option => ({
                            //     value: option?.nombre_dependencia,
                            //     label: option?.nombre_dependencia
                            // }))}
                            value={oficina}
                            onChange={handleChange}
                            options={options}
                            isSearchable={true}
                            placeholder="No especifica"
                        />

                    </div>
                    <div className="form-group mx-4 mb-2">
                        <label htmlFor="hora_ingreso">Hora Ingreso</label>
                        <input type="time" className="form-control"
                            id="hora_ingreso"
                            value={currentTime}
                            {...register('hora_ingreso')}
                            required
                        />
                    </div>
                    <div className="form-group mx-4 mb-2">
                        <label htmlFor="hora_salida">Hora Salida</label>
                        <input type="time" className="form-control" id="hora_salida"
                            {...register('hora_salida')}
                        />
                    </div>

                    <button className='btn btn-primary mx-4 mb-2'>Enviar</button>
                    {/* <button className='btn btn-secondary' onClick={toggle}>Cancelar</button> */}
                </form>
            </ModalBody>

        </Modal>
    )
}

export default FormVisita