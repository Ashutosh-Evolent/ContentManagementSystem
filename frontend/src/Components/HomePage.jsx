import axios from "axios";
import { useEffect, useState } from "react";
import { Segment, Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import swal from 'sweetalert';


const StyleSegment = styled(Segment)`
  &&&&& {
    margin: 5rem;
    // padding: 5rem 2rem;
    display: block;
    height: 37rem;
    overflow: auto;
  }
`;

function HomePage() {
  const [contacts, setContacts] = useState([]);
  const HandleDelete = (id) => {
    axios.delete(`https://localhost:44361/Employee/Delete/${id}`).then((Response)=>{
        console.log(Response.data);
        swal('Contact Details Deleted Successfully')
        retriveData();
    }).catch((err) => {
      console.log(err);
    });
  };
  const retriveData=()=>{
    axios
    .get("https://localhost:44361/Employee/EmployeeList")
    .then((Response) => {
      console.log(Response.data);
      setContacts(Response.data);
    }).catch((err) => {
      console.log(err);
    });;
  }
  useEffect(() => {
   retriveData();
  }, []);
  const headerRow = [
    "Id",
    "First Name",
    "Last Name",
    "Email",
    "ContactNumber",
    "Status",
    "Action",
  ];
  return (
    <StyleSegment>
      <Button as={Link} to={"/addUser"}>
       
        ADD
      </Button>
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            {headerRow.map((header) => (
              <Table.HeaderCell key={header}>{header}</Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {contacts.map((contact) => (
            <Table.Row key={contact.employeeId}>
              <Table.Cell>{contact.employeeId}</Table.Cell>
              <Table.Cell>{contact.firstName}</Table.Cell>
              <Table.Cell>{contact.lastName}</Table.Cell>
              <Table.Cell>{contact.email}</Table.Cell>
              <Table.Cell>{contact.contactNumber}</Table.Cell>
              <Table.Cell>{contact.stat}</Table.Cell>
              <Table.Cell>
                <Button as={Link} to={`/edit/${contact.employeeId}`}>Edit</Button>
                {/* <Button onClick={() => HandleEdit(contact)}>EDIT</Button> */}
                <Button onClick={() => HandleDelete(contact.employeeId)}>
                  DELETE
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </StyleSegment>
  );
}
export default HomePage;
