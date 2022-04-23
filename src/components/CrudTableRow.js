import React from 'react'

const CrudTableRow = ({el, setDataToEdit, deleteData}) => {
    let {name, lastName, e_mail, id} = el
  return (
    <tr>
            <td>{name}</td>
            <td>{lastName}</td>
            <td>{e_mail}</td>
            <td>
                <button onClick={() => setDataToEdit(el)}>Editar</button>
                <button onClick={() => deleteData(id)}>Eliminar</button>
            </td>
    </tr>
  )
}

export default CrudTableRow