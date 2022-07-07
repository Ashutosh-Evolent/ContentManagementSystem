import styled from "styled-components";
import {
  Segment,
  Input,
  Button,
  Form,
  Select,
  Option,
} from "semantic-ui-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import swal from 'sweetalert';

const StyleSegment = styled(Segment)`
  &&&&& {
    margin: 5rem;
    padding: 5rem 2rem;
    display: block;
    // height: 37rem;
    overflow: auto;
  }
`;

const genderOptions = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" },
  { key: "o", text: "Other", value: "other" },
];
export const UserForm = () => {
  const { id } = useParams();
  const [BtnState, setBtnState] = useState("SAVE");
  console.log(id);
  const navigate = useNavigate();
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    stat: "active",
  });
  useEffect(() => {
    if (id !== undefined) {
      setBtnState("Update");
      axios
        .get(`https://localhost:44361/Employee/GetEmployee/${id}`)
        .then((Response) => {
          console.log(Response.data);
          setContact(Response.data);
        });
    }
  }, []);
  const { firstName, lastName, email, contactNumber, stat } = contact;
  const onInputChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const HandleSubmit = () => {
    const emailregex=/(^$|^.*@.*\..*$)/;
    const cnregex=/^([+]\d{2}[ ])?\d{10}$/;
    console.log(contact);
    if(emailregex.test(contact.email)&&cnregex.test(contact.contactNumber)){
    if (id !== undefined) {
      axios
        .put("https://localhost:44361/Employee/Update", contact)
        .then((Response) => {
          console.log(Response.data);
          navigate("/");
          swal('Contact Details Updated Successfully');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
     
      
        axios
        .post("https://localhost:44361/Employee/AddEmployee", contact)
        .then((Response) => {
          console.log(Response.data);
          navigate("/");
          swal('Contact Details Save Successfully');
        })
        .catch((err) => {
          console.log(err);
        });
     
     
    }
  }else{
    console.log('invalid email')
    swal("invalid Email")
  }
  };
  return (
    <StyleSegment>
      <Form>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            placeholder="First name"
            value={firstName}
            name="firstName"
            onChange={(e) => onInputChange(e)}
          />
          <Form.Field
           value={lastName}
           name="lastName"
           onChange={(e) => onInputChange(e)}
            control={Input}
            placeholder="Last name"
          />
        </Form.Group>
        <Form.Group widths="equal">
        <Form.Field
           
            control={Input}
            placeholder="Contact Number"
            value={contactNumber}
            name="contactNumber"
            onChange={(e) => onInputChange(e)}
          />
           <Form.Field
            id="form-input-control-first-name"
            control={Input}
            placeholder="email"
            value={email}
            name="email"
            onChange={(e) => onInputChange(e)}
          />
        </Form.Group>
        <Form.Group>
        <select
            class="ui dropdown"
            name="stat"
            value={stat}
            onChange={(e) => onInputChange(e)}
          >
            <option value="active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
         
          
      </Form.Group>
      <Form.Field
          control={Button}
        onClick={() => {
          HandleSubmit();
        }}
      >
        {BtnState}
      </Form.Field>
      </Form>
      
      
    </StyleSegment>
  );
};
