import axios from "axios";
import { useEffect, useState } from "react";
import { Segment, Table, Button, Dimmer, Loader } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert";

const StyleSegment = styled(Segment)`
  &&&&& {
    margin: 0.5rem 5rem 0rem 5rem;
    display: block;
    height: 30rem;
    overflow: auto;
  }
`;

const ButtonSegment = styled.div`
  &&&& {
    margin: 5rem 5rem 0rem 5rem;
    display: block;
    justify-content: right;
    text-align: right;
  }
`;

function HomePage() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const HandleDelete = (id) => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`https://localhost:44361/Employee/Delete/${id}`)
          .then((Response) => {
            swal(Response.data);
            retriveData();
          })
          .catch((err) => {
            swal(err.Response.data, "error");
          });
      }
    });
  };

 
  const retriveData = () => {
    setIsLoading(true);
    axios
      .get("https://localhost:44361/Employee/EmployeeList")
      .then((Response) => {
        setContacts(Response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        swal(err.Response.data, "error");
      });
  };
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
    <>
      <Dimmer active={isLoading} inverted>
        <Loader size="big" content="Please Wait" />
      </Dimmer>
      <ButtonSegment>
        <Button
          as={Link}
          to={"/addUser"}
          color="purple"
          content="Add"
          icon="plus"
          labelPosition="left"
        />
      </ButtonSegment>
      <StyleSegment>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              {headerRow.map((header) => (
                <Table.HeaderCell key={header}>{header}</Table.HeaderCell>
              ))}
              {/* <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Contact Number</Table.HeaderCell>
              <Table.HeaderCell>Status
              </Table.HeaderCell> */}
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
                  <Button
                    as={Link}
                    to={`/edit/${contact.employeeId}`}
                    color="purple"
                    content="Edit"
                    icon="edit"
                    labelPosition="left"
                  />
                  <Button
                    onClick={() => HandleDelete(contact.employeeId)}
                    color="purple"
                    content="Delete"
                    icon="delete"
                    labelPosition="left"
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </StyleSegment>
    </>
  );
}
export default HomePage;
