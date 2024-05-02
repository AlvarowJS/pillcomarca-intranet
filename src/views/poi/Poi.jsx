import React from 'react'

const Poi = () => {

    const resolucion = () => {

        window.open("https://cdn.www.gob.pe/uploads/document/file/5810150/5154626-plan-operativo-institucional-2024.pdf?v=1707145120", "_blank")
    }

    const descargarPoi = (option) => {

        option == 1 ? window.open("https://docs.google.com/spreadsheets/d/e/2PACX-1vQIaQQgFSGhpL-_Clbbxhmin-rUlgI9P-V-_MFsUHUp6j-FlnvB4xmf9NSDjSXrXQ/pub?output=xlsx", "_blank")
            : option == 2 ? window.open("https://docs.google.com/spreadsheets/d/e/2PACX-1vRmuuOoBe04uSvwIE3CR7nJiGpC-7hvh3muw3sPOeuKXXpeivNXwOfYRXbUzTSMow/pub?output=xlsx", "_blank")
                : window.open("https://cdn.www.gob.pe/uploads/document/file/5810150/5154626-plan-operativo-institucional-2024.pdf?v=1707145120", "_blank")
        // poi 2024
        // https://docs.google.com/spreadsheets/d/1fa5VAELChJFZiCbrN1huA2tlnfIfegQN/edit?usp=sharing&ouid=101345460619737628000&rtpof=true&sd=true

        // cuadro de nececidades
        // https://docs.google.com/spreadsheets/d/1fa5VAELChJFZiCbrN1huA2tlnfIfegQN/edit?usp=sharing&ouid=101345460619737628000&rtpof=true&sd=true
        // window.open("https://cdn.www.gob.pe/uploads/document/file/5810150/5154626-plan-operativo-institucional-2024.pdf?v=1707145120", "_blank")
    };

    return (
        <>
            <h2>
                Documentos de POI 2024
            </h2>
            <hr />
            <h2>POI</h2>
            <button
                onClick={() => descargarPoi(1)}
                className='btn btn-success'>Descargar aquí</button>
            <h2>Cuadro de necesidades</h2>
            <button
                onClick={() => descargarPoi(2)}
                className='btn btn-success'>Descargar aquí</button>
            <h2>Resolución que aprueba el poi 2024</h2>
            <button
                onClick={() => descargarPoi(3)}
                className='btn btn-success'>Descargar aquí</button>
        </>
    )
}

export default Poi