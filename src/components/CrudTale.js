import React from 'react'
import CrudTableRow from './CrudTableRow'

const CrudTale = ({data, setDataToEdit, deleteData}) => {
  return (
    <div>
        <h3>Tabla de Contenido</h3>
        <table>
            <thead>
            <tr>
               <th>Nombre</th>
               <th>Apellido</th>
               <th>Correo</th>
               <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
                {data.length === 0 ? (
                <tr>
                    <td colSpan="3">Sin Contenido</td>
                </tr>
                ) : (
                    data.map((el) => (
                    <CrudTableRow 
                        key={el.id} 
                        el={el}
                        setDataToEdit={setDataToEdit}
                        deleteData={deleteData}
                    />
                    ))
                )}
            </tbody>
        </table>
    </div>
  )
}

export default CrudTale