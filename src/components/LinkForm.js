import React, { useState, useEffect } from 'react'
import { db } from '../firebase'

export const LinkForm = (props) => {

     

    const initialState = {
        url:"",
        name:"",
        description:""
    }

    const [values, setValues] = useState(initialState)

    const handleInputChange = (e) =>{
        const {name, value}= e.target
        setValues({...values, [name]:value})
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        props.addOrEditLink(values)

        setValues({...initialState})
    }

    const getLinkById = async (id) =>{
        const doc = await db.collection('links').doc(id).get()
        setValues({...doc.data()})
    }


    useEffect(() => {
        if(props.currentId===''){
            setValues({...initialState})
        }else{
            //si estamos editando
            getLinkById(props.currentId)

        }
    }, [props.currentId])

    return (
        <form className="card card-body" onSubmit={handleSubmit}>
            <div className="form-group input-group">
                <div className="input-group-text bg-ligth">
                    <i className="material-icons">insert_link</i>
                </div>
                <input
                    type="text"
                    name="url"
                    placeholder="https://someUrl/.com"
                    value={values.url} 
                    onChange={handleInputChange}
                />
            </div>

            <div className="form-group input-group">
                <div className="input-group-text bg-ligth">
                    <i className="material-icons">create</i>
                </div>
                <input
                    type="text"
                    name="name"
                    placeholder="website name"
                    value={values.name}
                    onChange={handleInputChange}
                />
            </div>

            <div className="form-group input-group">
                <textarea
                    name="description"
                    placeholder="write something"
                    row="3"
                    className="form-control"
                    value={values.description}
                    onChange={handleInputChange}
                ></textarea>
            </div>

            <button className="btn btn-primary btn-block">
                {props.currentId==='' ? 'Save':'Update'}
            </button>


        </form>
    )
}
