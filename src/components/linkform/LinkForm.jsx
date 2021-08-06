import React, { useState,useEffect } from 'react'
import { toast } from "react-toastify";
import { dataBase } from '../../firebase/firebase'

export const LinkForm = (props) =>{
    const db = dataBase

    const initialValues = {
        url: '',
        name: '',
        description: ''
    }
    const [values, setValues] = useState(initialValues)

    const validateUrl = string =>{
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(string);
   }

    const handleInputChange = event => {
        setValues({...values, [event.target.name]: event.target.value})
        
    }

    const handleSubmit = (event) =>{
        event.preventDefault()
        
        if (!validateUrl(values.url)) {
            return toast.dark('Url no valida', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }) 
        }

        props.addOrEdit(values)
        setValues({...initialValues})
   }

   const getLink = async (id) => {
       const doc = await db.collection('links').doc(id).get()
       setValues({...doc.data()})
   }

   useEffect(() => {
        if (props.currentId === '') {
            setValues({...initialValues})
        }else{
            getLink(props.currentId)
        }
        // eslint-disable-next-line
   }, [props.currentId])

    return(
        <form className="card card-body" onSubmit={handleSubmit}>
           <div className="form-group input-group mb-3">
               <div className="input-group-text bg-light">
                    <i className="material-icons">insert_link</i>
               </div>
               <input
                    type="text"
                    className="form-control"
                    placeholder="https://"
                    name="url"
                    value={values.url}
                    onChange={handleInputChange}
                />
           </div>
           <div className="form-group input-group mb-3">
               <div className="input-group-text bg-light">
               <i className="material-icons">create</i>
               </div>
               <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre del sitio"
                    name="name"
                    value={values.name}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group mb-3">
                <textarea
                    name="description"
                    rows="3"
                    className="form-control"
                    placeholder="Descripcion"
                    value={values.description}
                    onChange={handleInputChange}
                >
                </textarea>
            </div>
            <button className="btn btn-primary btn-block">
                {props.currentId === '' ? 'GUARDAR' : 'ACTUALIZAR'}
            </button>
       </form>
   ) 
}