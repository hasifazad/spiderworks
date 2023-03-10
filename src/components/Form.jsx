import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Axios from 'axios';

import "../styles/Form.css"



const Form = () => {
    const errStyle = { color: 'red', fontSize: '13px' }

    let [submitSuccessful, setSubmitSuccessful] = useState('')
    let { register, handleSubmit, formState: { errors } } = useForm()

    const onsubmit = (data) => {
        data = {
            name: [data.name],
            email: [data.email],
            company_name: [data.company_name],
            phone_number: [data.phone_number],
            lead_types_id: [data.lead_types_id]
        }
        console.log(data);
        Axios.post("https://dashboard.omnisellcrm.com/api/store", data).then((response) => {
            console.log('response', response);
            setSubmitSuccessful('success')
        }).catch((err) => {
            console.log('err', err);
            setSubmitSuccessful('error')
        })
    }


    return (
        <div>
            <form className='form' onSubmit={handleSubmit(onsubmit)}>
                {submitSuccessful.length == 0 ? null : submitSuccessful === 'error' ?
                    <span style={{ color: 'red' }}>Form submition failed</span> :
                    <span style={{ color: 'green' }}>Form submitted successfully</span>}

                <label>Name</label>
                <input type="text" name='name' {...register("name", { required: true, minLength: 3 })} />
                {errors.name && errors.name.type === "required" && (<span style={errStyle}>This field is required*</span>)}
                {errors.name && errors.name.type === "minLength" && (<span style={errStyle}>Min 3 characters</span>)}

                <label>Email</label>
                <input type="email" name='email' {...register("email", { required: true, pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ })} />
                {errors.email && errors.email.type === "required" && (<span style={errStyle}>This field is required*</span>)}
                {errors.email && errors.email.type === "pattern" && (<span style={errStyle}>Enter valid email ID</span>)}

                <label>Company Name</label>
                <input type="text" name='company_name' {...register("company_name", { required: true, minLength: 3 })} />
                {errors.company_name && errors.company_name.type === "required" && (<span style={errStyle}>This field is required*</span>)}
                {errors.company_name && errors.company_name.type === "minLength" && (<span style={errStyle}>Min 3 characters</span>)}

                <label>Mobile</label>
                <input type="text" name='phone_number' {...register("phone_number", { required: true, pattern: /^[0-9]{10}$/ })} />
                {errors.phone_number && errors.phone_number.type === "required" && (<span style={errStyle}>This field is required*</span>)}
                {errors.phone_number && errors.phone_number.type === "pattern" && (<span style={errStyle}>Enter valid mobile number</span>)}

                <label>Lead type ID</label>
                <input type="text" name='lead_types_id' {...register("lead_types_id", { required: true, minLength: 3 })} />
                {errors.lead_type_id && errors.lead_type_id.type === "required" && (<span style={errStyle}>This field is required*</span>)}
                {errors.lead_type_id && errors.lead_type_id.type === "minLength" && (<span style={errStyle}>Min 3 characters</span>)}

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Form