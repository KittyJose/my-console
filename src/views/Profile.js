import React, { useState } from "react";
import {
    Grid,
    Row,
    Col,
    FormGroup,
    ControlLabel,
    FormControl
} from "react-bootstrap";
import { Button, Container } from "reactstrap"
import Loading from "../components/Loading";
import { useAuth0 } from "../react-auth0-spa";
import NavBar from "../components/NavBar"
import { UserCard } from "../components/Card/UserCard"
import { FormInputs } from "../components/Form/FormInputs"
import { Card } from "../components/Card/Cards"
import { CardDecks } from "../components/Card/CardDeck";
import { PaymentModal } from "../components/Modals/Payment";

const Profile = () => {
  const { loading, user } = useAuth0();
  const [ modal, setModal ] = useState(false);
  const toggle = () => setModal(!modal);

  if (loading || !user) {
    return <Loading />;
  }


  return (
      <Container fluid className="h-100 pl-0 pr-0">
          <NavBar resetDB = {true}/>
          <Container className="flex-grow-1">
            <hr className="my-5"/>
            <div className="content">
              <Grid fluid>
                <Row>
                <Col md={4} className="user-card">
                  <UserCard bgImage={'https://terminusdb.com/img/placeholders/half-background-mobile.png'}
                             avatar={user.picture}
                             name={user.name}
                             userName={user.nickname}
                             description={<span>
                                            Some description about me
                                          </span>}/>
                </Col>
                <Col md={8}>
                    <Card
                      title="Profile"
                      content={
                        <form>
                          <FormInputs
                            ncols={["col-md-5", "col-md-3", "col-md-4"]}
                            properties={[
                              {
                                label: "Company",
                                type: "text",
                                bsClass: "form-control",
                                placeholder: "Company",
                                defaultValue: "datachemist",
                                disabled: true
                              },
                              {
                                label: "Username",
                                type: "text",
                                bsClass: "form-control",
                                placeholder: "Username",
                                defaultValue: "kitzkan"
                              },
                              {
                                label: "Email address",
                                type: "email",
                                bsClass: "form-control",
                                placeholder: "Email"
                              }
                            ]}
                          />
                          <FormInputs
                            ncols={["col-md-6", "col-md-6"]}
                            properties={[
                              {
                                label: "First name",
                                type: "text",
                                bsClass: "form-control",
                                placeholder: "First name",
                                defaultValue: "Kitty"
                              },
                              {
                                label: "Last name",
                                type: "text",
                                bsClass: "form-control",
                                placeholder: "Last name",
                                defaultValue: "Jose"
                              }
                            ]}/>
                          <hr className="my-space"/>
                          <Button color="primary"> Edit </Button>
                          <hr className="my-space"/>
                          <legend className="pr-hding-sp">{'Current Plan'}</legend>
                          <hr className="my-3"/>
                          <CardDecks/>
                          <hr className="my-space"/>
                          <Button color="primary" onClick={toggle}> Upgrade </Button>
                          <PaymentModal isOpen={modal} toggle={toggle}/>
                          <hr className="my-space"/>
                          <div className="clearfix" />
                        </form>
                      }
                    />
                  </Col>
                </Row>
              </Grid>
            </div>
          </Container>
       </Container>
  );
 }


/*  return (
      <Container fluid className="h-100 pl-0 pr-0">
          <NavBar />
          <Container className="flex-grow-1">
              <hr className="my-5" />
              <Col md={4}>
                <UserCard bgImage="https://terminusdb.com/img/cards/card-shape-3.svg"
                          avatar={user.picture}
                          name={user.nickname}
                          email={user.email}
                          description={
                                <span>
                                  Some description about Kitty
                                </span>}
                                socials={
                                    <div>
                                      <Button simple>
                                        <i className="fa fa-twitter" />
                                      </Button>
                                      <Button simple>
                                        <i className="fa fa-google-plus-square" />
                                      </Button>
                                      <Button simple>
                                        <i className="fa fa-github" />
                                      </Button>
                                    </div>}/>
              </Col>
      </Container>
    </Container>
);
};*/

/*
<Row className="profile-header mb-6 text-center text-md-left">
  <Col md={3}>
     <img
      src={user.picture}
      alt="Profile"
      className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
    />
    <p className="lead">{user.name}</p>
    <hr className="my-2" />
    <p className="lead">
      <Button color="primary " style={{width:'100%'}}>Edit Profile</Button>
    </p>
  </Col>
  <Col md>
    <Container fluid className="border">
        <h4 >About terminusHub</h4>
        <p className="lead">Structured, semantically meaningful data for rapid delivery of data driven applications. Join the data-centric revolution!.</p>
    </Container>
  <Jumbotron fluid>
  <Container fluid>
    <h4 >About terminusHub</h4>
    <p className="lead">Structured, semantically meaningful data for rapid delivery of data driven applications. Join the data-centric revolution!</p>
  </Container>
</Jumbotron>
 <Jumbotron fluid>
  <Container fluid>
    <h4 >About terminusHub</h4>
    <p className="lead">Structured, semantically meaningful data for rapid delivery of data driven applications. Join the data-centric revolution!</p>
  </Container>
</Jumbotron>
  </Col>
</Row>
*/

export default Profile;
