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
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

const StyleSegment = styled.div`
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
  const [isLoading, setIsLoading] = useState(false);
  const emailregex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
  const cnregex = /^([+]\d{2}[ ])?\d{10}$/;
  const nameregex = /^[a-zA-Z]{1,30}$/;
  const navigate = useNavigate();
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    stat: "Active",
  });
  useEffect(() => {
    if (id !== undefined) {
      setIsLoading(true);
      setBtnState("Update");
      axios
        .get(`https://localhost:44361/Employee/GetEmployee/${id}`)
        .then((Response) => {
          setContact(Response.data);
          setIsLoading(false);
        })
        .catch((err) => {
          swal(err.Response.data, "error");
        });
    }
  }, [id]);

  const { firstName, lastName, email, contactNumber, stat } = contact;
  const onInputChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  }

  const HandleSubmit = () => {
    if (
      emailregex.test(contact.email) &&
      cnregex.test(contact.contactNumber) &&
      nameregex.test(contact.firstName) &&
      nameregex.test(contact.lastName)
    ) {
      if (id !== undefined) {
        axios
          .put("https://localhost:44361/Employee/Update", contact)
          .then((Response) => {
            navigate("/");
            swal("Done", Response.data, "success");
          })
          .catch((err) => {
            swal(err.Response.data, "error");
          });
      } else {
        axios
          .post("https://localhost:44361/Employee/AddEmployee", contact)
          .then((Response) => {
            navigate("/");
            swal("Done", Response.data, "success");
          })
          .catch((err) => {
            swal(err.response.data);
          });
      }
    } else {
      let msg = "";
      msg +=
        contact.firstName.length < 1 || contact.firstName.length >= 30
          ? "- First Name length should be between 0 and 30\n"
          : nameregex.test(contact.firstName)
          ? ""
          : "- First Name must be contain only alphabets\n";
      msg +=
        contact.lastName.length < 1 || contact.lastName.length >= 30
          ? "- Last Name length should be between 0 and 30\n"
          : nameregex.test(contact.lastName)
          ? ""
          : "- Last Name must be contain only alphabets\n";
      msg += emailregex.test(contact.email) ? "" : "- Email\n";
      msg += cnregex.test(contact.contactNumber) ? "" : "- Contact Number";
      swal("Invalid", msg, "warning");
    }
  };
  return (
    <>
      <Dimmer active={isLoading} inverted>
        <Loader size="big" content="Please Wait" />
      </Dimmer>
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
            <Form.Field></Form.Field>
          </Form.Group>
          <FormGroup>
            <Form.Field
              control={Button}
              onClick={() => {
                HandleSubmit();
              }}
              color="purple"
            >
              {BtnState}
            </Form.Field>
            <Form.Field
              control={Button}
              onClick={() => {
                navigate(-1);
              }}
              color="purple"
            >
              {"Cancel"}
            </Form.Field>
          </FormGroup>
        </Form>
      </StyleSegment>
    </>
  );
};
