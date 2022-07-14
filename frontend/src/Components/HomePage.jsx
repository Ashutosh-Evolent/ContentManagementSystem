import axios from "axios";
import { useEffect, useState } from "react";
import {
  Segment,
  Table,
  Button,
  Dimmer,
  Loader,
  Input,
  Icon,
} from "semantic-ui-react";
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
    text-align: right;
  }
`;
const BottomSegment = styled.div`&&&&{
  padding 2rem;
  display :block;
  text-align: center;
  
}`;

function HomePage() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [totalRecods, setTotalRecords] = useState(0);
  const [foundRecords, setFoundRecords] = useState(0);
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
        setTotalRecords(Response.data.length);
        setContacts(Response.data);
        setFilteredContacts(Response.data);
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
    { key: 1, value: "employeeId", text: "Id" },
    { key: 2, value: "firstName", text: "First Name" },
    { key: 3, value: "lastName", text: "Last Name" },
    { key: 4, value: "email", text: "Email" },
    { key: 5, value: "contactNumber", text: "ContactNumber" },
    { key: 6, value: "stat", text: "Status" },
    { key: 7, value: "action", text: "Action" },
  ];
  const initialState = {
    firstName: "sort",
    lastName: "sort",
    email: "sort",
    contactNumber: "sort",
    stat: "sort",
  };
  const [sorts, setSorts] = useState(initialState);
  const HandleSearch = async (e) => {
    setSearchTerm(e.target.value);
    var vh = contacts.filter((c) => {
      if (e.target.value === "") {
        return c;
      } else if (
        c.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        c.lastName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        c.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
        c.contactNumber.toLowerCase().includes(e.target.value.toLowerCase())
      ) {
        return c;
      }
    });
    setFoundRecords(vh.length);
    setFilteredContacts(vh);
  };
  const HandleSort = (fieldName, sortOrder) => {
    let s =
      sortOrder === "sort"
        ? "sort up"
        : sortOrder === "sort up"
        ? "sort down"
        : "sort up";
    setSorts({ ...initialState, [fieldName]: s });
    filteredContacts.sort((a, b) => {
      return sortOrder === "sort"
        ? a[fieldName].localeCompare(b[fieldName])
        : sortOrder === "sort up"
        ? b[fieldName].localeCompare(a[fieldName])
        : a[fieldName].localeCompare(b[fieldName]);
    });
  };
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
        <Input
          onChange={(e) => {
            HandleSearch(e);
          }}
          placeholder="Search"
        />
      </ButtonSegment>
      <StyleSegment>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              {headerRow.map((header) => (
                <Table.HeaderCell key={header.key}>
                  {header.text}
                  <Icon
                    name={sorts[header.value]}
                    onClick={() => {
                      HandleSort(header.value, sorts[header.value]);
                    }}
                  ></Icon>
                </Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filteredContacts.map((contact) => (
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
      <BottomSegment hidden={searchTerm === "" ? true : false}>
        {searchTerm === ""
          ? ""
          : `Found :${foundRecords} Records Out Of ${totalRecods}`}
      </BottomSegment>
    </>
  );
}
export default HomePage;
