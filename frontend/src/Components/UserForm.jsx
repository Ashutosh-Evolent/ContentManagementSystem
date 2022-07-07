import styled from "styled-components"
import {Segment,Input,Button}from 'semantic-ui-react'
import { useState } from "react";
import axios from'axios';
import {useNavigate,useParams} from 'react-router-dom';

const StyleSegment=styled(Segment)`
&&&&&{
  margin: 5rem;
  padding: 5rem 2rem;
  display:block;
   height:37rem;
   overflow:auto;
}`
export const UserForm=()=>{
    const {id}=useParams();
    console.log(id);
    const navigate=useNavigate();
    const [contact,setContact]=useState({
        firstName:"",
        lastName:"",
        email:"",
        contactNumber:"",
        stat:""
    });
    if(id!==undefined){
        axios.get(`https://localhost:44361/Employee/GetEmployee/${id}`).then((Response)=>{
            console.log(Response.data);
            setContact(Response.data)
        })
    }
    const{firstName,lastName,email,contactNumber,stat}=contact;
    const onInputChange=(e)=>{
        setContact({...contact,[e.target.name]:e.target.value})
    }

    const HandleSubmit=()=>{
        console.log(contact)
        axios.post('https://localhost:44361/Employee/AddEmployee',contact).then((Response)=>{
            console.log(Response.data);
            navigate("/");
        }).catch((err)=>{
            console.log(err);
        })
    }
    return(
    <StyleSegment>
 <Input
          type="text"
          placeholder="First Name"
          value={firstName}
          name='firstName'
          onChange={(e) => onInputChange(e)}
        />
        <Input
          type="text"
          placeholder="Last Name"
          value={lastName}
          name='lastName'
          onChange={(e) =>onInputChange(e)}
        />
        <Input
          type="text"
          placeholder="Email"
          value={email}
          name='email'
          onChange={(e) => onInputChange(e)}
        />
        <Input
          type="text"
          placeholder="Contact Number"
          value={contactNumber}
          name='contactNumber'
          onChange={(e) => onInputChange(e)}
        />
        <select name="stat" onChange={(e) => onInputChange(e)}>
            <option value="active">Active</option>
        <option value="Inactive">Inactive</option>
  
</select>
        <Button onClick={()=>{HandleSubmit()}}>Add</Button>

    </StyleSegment>
    )
}