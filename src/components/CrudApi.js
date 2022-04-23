import React, { useEffect, useState } from 'react'
import { helpHttp } from '../helpers/helpHttp'
import CrudForm from './CrudForm'
import CrudTale from './CrudTale'
import Loader from './Loader'
import Message from './Message'

const CrudApi = () => {
    const [db, setDb] = useState(null)
    const [dataToEdit, setDataToEdit] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    let api = helpHttp()
    let url = "http://localhost:5000/users"

    useEffect(() => {
        api.get(url).then((res) => {
            //console.log(res)
            if(!res.err){
                setDb(res)
                setError(null)
            }else{
                setDb(null)
                setError(res)
            }

            setLoading(false)
        })
    }, [])
    

    const createData = (data) => {
        data.id = Date.now()

        let options = {
            body:data, 
            headers: {'Content-Type': 'application/json'}}

        api.post(url, options)
        .then(
            (res) => {
                console.lod(res)
                if(!res.err){
                    setDb(...db, res)
                }
                else{
                    setError(res)
                }
            }
        )

        setDb([...db, data])
    }

    const updateData = (data) => {
        let endpoint = `${url}/${data.id}`
    //console.log(endpoint)

        let options = {
        body: data,
        headers: { "content-type": "application/json" },
        }

        api.put(endpoint, options).then((res) => {
            //console.log(res)
            if (!res.err) {
              let newData = db.map((el) => (el.id === data.id ? data : el))
              setDb(newData)
            } else {
              setError(res)
            }
        })

    }
    const deleteData = (id) => {
        let isDelete = window.confirm(`¿Estas seguro de eliminar el registro con el id: '${id}'?`)
        if(isDelete){
            let endpoint = `${url}/${id}`
            let options = {
            headers: { "content-type": "application/json" },
            }
            
            api.del(endpoint, options).then((res) => {
                //console.log(res)
                if (!res.err) {
                  let newData = db.filter((el) => el.id !== id)
                  setDb(newData)
                } else {
                  setError(res)
                }
              })
        }else{
            return
        }
    }
  return (
    <div>
        <h1>Api Json-server</h1>
        <article className="grid-1-2">
            <CrudForm createData={createData}
            updateData={updateData} 
            dataToEdit={dataToEdit}
            setDataToEdit={setDataToEdit}
            />
            {loading && <Loader/>}
            {error && (
            <Message
            msg={`Error ${error.status}: ${error.statusText}`}
            bgColor="#dc3545"
            />
            )}
            {db && (
            <CrudTale 
            data={db} 
            setDataToEdit={setDataToEdit}
            deleteData={deleteData}
            />
            )}
        </article>
    </div>
    
  )
}



export default CrudApi