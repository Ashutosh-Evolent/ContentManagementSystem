
import { useEffect, useState } from "react";
import {Button, Input, Segment } from "semantic-ui-react";
import styled from "styled-components";
import { CMSFooter } from "../CMSFooter/CMSFooter";
import { CMSHeader } from "../CMSHeader/CMSHeader";
import { CMSTable } from "../CMSTable/CMSTable";
import { CMSModel } from "./CMSModel";
import axios from "axios";

const api=axios.create({
    baseURL:`https://localhost:44361/Employee`
})

const tableData = [
    { id:'1',firstName: 'rohan', lastName: 'patil',email:'rohan@gmail.com',contactNumber:'123456789',status: 'active'},
    { id:'2',firstName: 'rohan', lastName: 'patil',email:'rohan@gmail.com',contactNumber:'123456786',status: 'inactive'},
    { id:'3',firstName: 'rohan', lastName: 'patil',email:'rohan@gmail.com',contactNumber:'123456785',status: 'active'}  
  ]

  const StyleSegment=styled(Segment)`
  &&&&&{
    margin: 5rem;
    padding: 5rem 2rem;
    display:block;
     height:37rem;
     overflow:auto;
  }`
  const getdata=()=>{
    api.get('/EmployeeList').then(res=>{
        console.log(res.data)
    })
  }
export const CMSPage=()=>{

    
    // const [search,setSearch]=useState("");
    // const[filteredData,setFilteredData]=useState([]);

    // useEffect(()=>{
    //     setFilteredData([])
    //     tableData.filter((val)=>{
    //         if(search===""){
    //         return val;
    //         }
    //         else if(val.firstName.toLowerCase().includes(search.toLowerCase())){
    //           return val;
    //         }
    //     })
    //     console.log(filteredData)
    // },[search])
    return (
        <><StyleSegment>
            <Button  onClick={getdata}>show</Button>
        <CMSHeader title="Contact Management System"/>           
        <CMSFooter>cms</CMSFooter>
        {/* <Input placeholder="search"value={search} onChange={(e)=>{setSearch(e.target.value)}}/> */}
        <CMSModel name={'Add'}/>
        <CMSTable contactList={tableData}/>
        
       </StyleSegment></>
    );
}