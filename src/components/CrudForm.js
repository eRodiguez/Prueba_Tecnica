import React, { useState, useEffect } from 'react'

const intialForm = {
    id:null,
    name:"",
    lastName:"",
    e_mail:""
}

function CrudForm({createData, updateData, dataToEdit,setDataToEdit}) {
    const [form, setForm] = useState(intialForm)

    useEffect(() => {
        if(dataToEdit){
            setForm(dataToEdit)
        }else{
            setForm(intialForm)
        }
    },[dataToEdit])

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!form.name || !form.lastName || !form.e_mail){
        alert("Datos incompletos")
        return}

        if(form.id === null){
            createData(form)
        }else{
            updateData(form)
        }

        handleReset()
    }

    const handleReset = (e) => {
        setForm(intialForm)
        setDataToEdit(null)
    }

  return (
    <div>
        <h3>{dataToEdit ? "Editar" : "Agregar"}</h3>
        <form onSubmit={handleSubmit}>
            <input type="text" 
            name="name" 
            placeholder="Nombre" 
            onChange={handleChange} 
            value={form.name} 
            />
            <input type="text" 
            name="lastName" 
            placeholder="Apellido" 
            onChange={handleChange}
            value={form.lastName} 
            />
            <input type="text" 
            name="e_mail" 
            placeholder="Correo" 
            onChange={handleChange} 
            value={form.e_mail} 
            />            
            <input type="submit" value="Enviar"/>
            <input type="reset" value="Limpiar" onClick={handleReset}/>
        </form>
    </div>
  )
}

export default CrudForm