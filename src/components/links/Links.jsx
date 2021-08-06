import React, { useEffect, useState } from 'react';
import { LinkForm } from '../linkform/LinkForm'
import { dataBase } from "../../firebase/firebase";
import { toast } from "react-toastify";

export const Links = () =>{
    const db = dataBase
    const [links, setLinks] = useState([])
    const [currentId, setCurrentId] = useState('')

    const addOrEdit = async (linkObject) =>{
        try {
            if (currentId === '') {
                await db.collection('links').doc().set(linkObject)
                toast.success('Link agregado correctamente', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    })
            } else{
                await db.collection('links').doc(currentId).update(linkObject)
                toast.success('Link Actualizado correctamente', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    })
                    setCurrentId('')
            }
        } catch (error) {
            console.error('Error al obtener datos', error);
        }
    }

    const onDelete = async (id) => {
        if (window.confirm('Seguro que queres borrar el link?')) {
            await db.collection('links').doc(id).delete()
            toast.error('Link eliminado correctamente', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
        }
    }

    const getLinks = async () =>{
        db.collection('links').onSnapshot((querySnapshot) =>{
            const docs = []
            querySnapshot.forEach(doc => {
                docs.push({...doc.data(), id: doc.id})
            })
            setLinks(docs)
        })
        
    }

    useEffect(() => {
        getLinks()
    })

    return(
        <div className="d-flex justify-items-center flex-column">
            <h1 className="text-uppercase text-center">Guardado de sitios</h1>
            <div className="p-2">
                <LinkForm {...{addOrEdit, currentId, links}}/>
            </div>
            <div className="p-2">
                {links.map(link => (
                    <div className="card mb-1" key={link.id}>
                        <div className="card-body">
                                <h4>{link.name}</h4>

                            <div className="d-flex justify-content-between">
                                <p>{link.description}</p>
                                <div>
                                    <button className="btn btn-danger" onClick={() => onDelete(link.id)}><i className="material-icons pt-1">close</i></button>
                                    <button className="btn btn-info" onClick={() => setCurrentId(link.id)}><i className="material-icons pt-1">create</i></button>   
                                </div>    
                            </div>
                            <a href={link.url} target="_blank" rel="noopener noreferrer">Ir al Sitio</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}