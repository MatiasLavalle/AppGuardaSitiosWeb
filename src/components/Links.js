import React, { useState, useEffect } from 'react';
import {LinkForm} from './LinkForm';
import {toast} from 'react-toastify';
import { db } from '../firebase';


export const Links = () => {

    const [links, setLink] = useState([]);

    const [currentId, setCurrentId] = useState('');

    const  getLinks = async ()=>{
        await db.collection('links').onSnapshot((querySnapshot) =>{
            const docs = []
            querySnapshot.forEach((doc)=>{
                docs.push({...doc.data(), id:doc.id})
            })
            setLink(docs);
        })
    }
    
    const onDeleteLink = async (id) =>{
        if(window.confirm('Are you sure you want to delete?')){
            await db.collection('links').doc(id).delete()
            toast('link Removed Succsesfully',{
                type:"error",
                autoClose:2000
            })
        }
    }


    useEffect(() => {
        getLinks()
    }, [])

    const addOrEditLink = async (linkObject) =>{
        try{
            if(currentId === ''){
                //agregando link nuevo
                await db.collection('links').doc().set(linkObject)
                toast('New link Added', { type: 'success' })
            }else{
                //actualizando
                await db.collection('links').doc(currentId).update(linkObject)
                toast('Link Updated succesfully',{ type: 'info' })
                setCurrentId('')
            }
        }catch(error){
            console.log(error)
        }
    };


    return (
        <>
            <div className="col-md-4 p-2">
                <LinkForm {...{addOrEditLink,links,currentId}} />
            </div>

            <div className="col-md-8 p-2">

                {links.map( (link)=>(
                    <div className="card mb-1" key={link.id}>
                        <div className="card-body">
                            <h4>{link.name}</h4>
                            <div>
                                <i 
                                    className="material-icons text-danger"
                                    onClick={()=>onDeleteLink(link.id)}
                                >close</i>

                                <i
                                    className="material-icons"
                                    onClick={()=>setCurrentId(link.id)}
                                >create</i>
                            </div>

                            <p>{link.description}</p>
                            <a href={link.url} target="_blank" rel="noopener noreferrer">Go to Webside</a>
                        </div>
                    </div>
                ))}

            </div>
        </>
    )

    
}
