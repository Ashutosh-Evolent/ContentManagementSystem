import styled from "styled-components";
import { Segment, Input, Button, Form } from "semantic-ui-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

const StyleSegment = styled(Segment)`
  &&&&& {
    margin: 5rem;
    padding: 5rem 2rem;
    display: block;
    height: 35rem;
    overflow: auto;
  }
`;
export const UserForm = () => {
  const { id } = useParams();
  const [BtnState, setBtnState] = useState("SAVE");
  const emailregex =/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
  const cnregex = /^([+]\d{2}[ ])?\d{10}$/;
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
          setContact(Response.data);
        });
    }
  }, [id]);
  const { firstName, lastName, email, contactNumber, stat } = contact;
  const onInputChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });  
  };

  const HandleSubmit = () => {
    if (emailregex.test(contact.email)) {
      if (cnregex.test(contact.contactNumber)) {
        if (id !== undefined) {
          axios
            .put("https://localhost:44361/Employee/Update", contact)
            .then((Response) => {   
              navigate("/");
              swal('Done',Response.data,"success");
            })
            .catch((err) => {
              swal(err.Response.data,'error')
            });
        } else {
          axios
            .post("https://localhost:44361/Employee/AddEmployee", contact)
            .then((Response) => {
              navigate("/");
              swal("Done",Response.data,"success");
            })
            .catch((err) => {
              swal(err.response.data);
            });
        }
      } else {
        swal("invalid Contact Number");
      }
    } else {
      swal("invalid Email");
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
            control={Input}
            placeholder="email"
            value={email}
            name="email"
            onChange={(e) => onInputChange(e)}
          />
        </Form.Group>
        <Form.Group widths='equal'>
          
          <Form.Field>
          <select
            className="ui dropdown"
            name="stat"
            value={stat}
            onChange={(e) => onInputChange(e)}
          >
            <option value="active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          </Form.Field>
          <Form.Field></Form.Field>
        </Form.Group>
        <Form.Field
          control={Button}
          onClick={() => {
            HandleSubmit();
          }}
          color='purplr'
        >
          {BtnState}
        </Form.Field>
      </Form>
    </StyleSegment>
  );
};
