import styled from "styled-components";
import {
  Input,
  Button,
  Form,
  Dimmer,
  Loader,
  FormGroup,
} from "semantic-ui-react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { nameRegex,emailRegex,contactNumberRegex, contactInitialState } from "./constant";
import { createLogic, validateData } from "./Logic";

const StyleHeader=styled.h1`&&&&{
  margin:6rem 2rem 2rem 2rem;
  display: block;
  text-align:center;
  color:purple;
}`
const StyleSegment = styled.div`
  &&&&& {
     margin:0rem 5rem;
    padding:0rem 2rem;
    display: block;
    height: 35rem;
    overflow: auto;
  }
`;
export const UserForm = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [contact, setContact] = useState(contactInitialState);
  const { firstName, lastName, email, contactNumber, stat } = contact;

  const onInputChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  }

  const retriveData=async()=>{
    // var data=await createLogic.getContacts(`GetEmployee/${id}`)
    var data=await createLogic("get",`GetEmployee/${id}`)

    setContact(data);
    setIsLoading(false);
  }

  useEffect(() => {
    id !== undefined?
      retriveData():setIsLoading(false);
  },[]);
  const HandleSubmit = async() => {
    if (validateData(contact)) {
      if (id !== undefined) {
        // let data=await createLogic.updateContact("Update",contact)
        let data=await createLogic("put","Update",contact)
            navigate("/");
            swal("Done",data, "success");
      } else {
        // let data=await createLogic.addContact("AddEmployee",contact)
        let data=await createLogic("post","AddEmployee",contact)
          navigate("/")
          swal("Done",data, "success");
      }
    } else {
      let msg = "";
      msg +=
       firstName.length < 1 || firstName.length >= 30
          ? "- First Name length should be between 0 and 30\n"
          : nameRegex.test(firstName)
          ? ""
          : "- First Name must be contain only alphabets\n";
      msg +=
        lastName.length < 1 || lastName.length >= 30
          ? "- Last Name length should be between 0 and 30\n"
          : nameRegex.test(lastName)
          ? ""
          : "- Last Name must be contain only alphabets\n";
      msg += emailRegex.test(email) ? "" : "- Email\n";
      msg += contactNumberRegex.test(contactNumber) ? "" : "- Contact Number";
      swal("Invalid", msg, "warning");
    }
  };
  if(isLoading){
    return (  <Dimmer active={isLoading} inverted>
      <Loader size="big" content="Please Wait" />
    </Dimmer>)
  }
  return (
    <>
      <StyleHeader>{id===undefined?"Add Contact":"Update Contact"}</StyleHeader>
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
          <Form.Group widths="equal">
            <Form.Field>
              <select
                className="ui dropdown"
                name="stat"
                value={stat}
                onChange={(e) => onInputChange(e)}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </Form.Field>
            <Form.Field/>
          </Form.Group>
          <FormGroup>
            <Form.Field
              control={Button}
              onClick={() => {
                HandleSubmit();
              }}
              color="purple"
              content={id===undefined?"Save":"Update"}
            />
            <Form.Field
              control={Button}
              onClick={() => {
                navigate(-1);
              }}
              color="purple"
              content= {"Cancel"}
            />
          </FormGroup>
        </Form>
      </StyleSegment>
    </>
  );
};
