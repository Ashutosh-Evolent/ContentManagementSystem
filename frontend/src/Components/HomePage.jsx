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
import { headerRow, initialState } from "./constant";
import { createLogic } from "./Logic";

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
  const [sorts, setSorts] = useState(initialState);

  const HandleDelete = (id) => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        // var data = await createLogic.deleteContact(`Delete/${id}`);
        var data = await createLogic("delete", `Delete/${id}`);

        swal("Done",data,"success");
        retriveData();
      }
    });
  };

  const retriveData = async () => {
    var data = await createLogic("get", "EmployeeList")
    // var data =createLogic.getContacts("EmployeeList");
    setTotalRecords(data.length);
    setContacts(data);
    setFilteredContacts(data);
    setIsLoading(false);
  };
  useEffect(() => {
    retriveData();
  }, []);

  const HandleSearch = (e) => {
    setSearchTerm(e.target.value);
    var foundRecords = contacts.filter((c) => {
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
    setFoundRecords(foundRecords.length);
    setFilteredContacts(foundRecords);
  };
  const HandleSort = (fieldName, sortOrder) => {
    setSorts({
      ...initialState,
      [fieldName]:
        sortOrder === "sort"
          ? "sort up"
          : sortOrder === "sort up"
          ? "sort down"
          : "sort up",
    });
    filteredContacts.sort((a, b) => {
      return sortOrder === "sort"
        ? a[fieldName].localeCompare(b[fieldName])
        : sortOrder === "sort up"
        ? b[fieldName].localeCompare(a[fieldName])
        : a[fieldName].localeCompare(b[fieldName]);
    });
  };

  if (isLoading) {
    return (
      <Dimmer active inverted>
        <Loader size="big" content="Please Wait" />
      </Dimmer>
    );
  }
  return (
    <>
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
                  />
                </Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filteredContacts.map((contact) => (
              <Table.Row key={contact.employeeId}>
                <Table.Cell content={contact.firstName} />
                <Table.Cell content={contact.lastName} />
                <Table.Cell content={contact.email} />
                <Table.Cell content={contact.contactNumber} />
                <Table.Cell content={contact.stat} />
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
      {searchTerm === "" ? (
        ""
      ) : (
        <BottomSegment>
          {" "}
          Found :{foundRecords} Records Out Of {totalRecods}
        </BottomSegment>
      )}
    </>
  );
}
export default HomePage;
