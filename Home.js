import React, { useEffect, useState, CSSProperties } from 'react'
import useDocumentTitle from './useDocumentTitle'
import { Button, Image, Badge, Carousel, Card, Table, Modal, InputGroup, Form, Alert } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ClipLoader from "react-spinners/ClipLoader";



export default function Home() {
  useDocumentTitle("Home page");


  let [users, setUsers] = useState([])

  let [loading, setLoader] = useState(true)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [emessage, setErrorMessage] = useState("")

  //table edit button
  const [tableData, setTableData] = useState(false)

  const showHandleTableData = function() {
    setTableData(true);
  }

  const handleTableData = function(index, e) {
    e.target.parentNode.parentNode.parentNode.deleteRow(index)
  }

  const [showEdit, setShowEdit] = useState(false);

  const showEditTable = function() {
    setShowEdit(true)
  };
  const closeEditTable = function() {
    setShowEdit(false);
  }

  const getData = () =>{
    fetch('https://66b08ccf6a693a95b53923eb.mockapi.io/api/users/user_list', {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      // handle error
    }).then(data => {
      //console.log("user list " + JSON.stringify(tasks))
      setUsers(data)
      setLoader(false)
      // Do something with the list of tasks
    }).catch(error => {
      // handle error
      setLoader(false)
    })
  }
  useEffect(() => {
    getData()
  }, [])

  const getInputAddress = (e) => {
    setAddress(e.target.value)
  }

  const handleSubmit =()=>{
    if(name === "" || email === "" || address === ""){
      setErrorMessage("All fields are required!")
    }else{
      const submitData = {
        name: name,
        email: email,
        address: address
      }
      fetch('https://66b08ccf6a693a95b53923eb.mockapi.io/api/users/user_list', {
        method: 'POST',
        headers: {'content-type':'application/json'},
        // Send your data in the request body as JSON
        body: JSON.stringify(submitData)
      }).then(res => {
        if (res.ok) {
            return res.json();
        }
        // handle error
      }).then(task => {
        // do something with the new task
        setShow(false)
        getData()

      }).catch(error => {
        // handle error
        setShow(false)
      })
    }
  
  }

  return (
    <Container fluid="md">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {emessage.length > 0 && <Alert  variant={"danger"}>
          {emessage}
        </Alert> }
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Name</InputGroup.Text>
            <Form.Control
              name={"name"}
              onChange={(e) => {
                setName(e.target.value)
                setErrorMessage("")
              }}
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Email</InputGroup.Text>
            <Form.Control
              onChange={(e) => {
                setEmail(e.target.value)
                setErrorMessage("")
              }}
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Address</InputGroup.Text>
            <Form.Control
              onChange={getInputAddress}
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </InputGroup>
          <Button size='sm' variant="primary" onClick={handleSubmit} >Submit</Button>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
      <div className='display: flex;  
    justify-content: center;  
    align-items: center;'>
        <ClipLoader
          color={"blue"}
          loading={loading}
          cssOverride={{
            display: "block",
            margin: "0 auto",
            textAlign: 'center',
            borderColor: "red"
          }}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        /></div>
      {users.length > 0 && <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>

        <tbody>
        <Modal show={showEdit} onHide={closeEditTable}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student's Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {emessage.length > 0 && <Alert  variant={"danger"}>
          {emessage}
        </Alert> }
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Name</InputGroup.Text>
            <Form.Control
              name={"name"}
              onChange={(e) => {
                setName(e.target.value)
                setErrorMessage("")
              }}
              value={name}
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Email</InputGroup.Text>
            <Form.Control
              onChange={(e) => {
                setEmail(e.target.value)
                setErrorMessage("")
              }}
              value={email}
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </InputGroup>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Address</InputGroup.Text>
            <Form.Control
              onChange={getInputAddress}
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </InputGroup>
          <Button size='sm' variant="primary" onClick={handleSubmit} >Update</Button>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditTable}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
          {users?.map((item, index) => <tr key={index}>
            <td>{item.id}</td>
            <td key={index}>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.address}</td>
            <td><Button variant="primary" onClick={e => handleTableData(index,e)}>Delete</Button><Button variant='primary' className='mx-2' onClick={()=>{
              showEditTable()
              setName(item.name);
              setEmail(item.email);
              }}>Edit</Button></td>
          </tr>)}
        </tbody>
      </Table>}
      <Button size='sm' variant="primary" onClick={() => setShow(true)}>Add New</Button>
      <Button size='sm' variant="primary" className='mx-2' onClick={showHandleTableData}>Edit Table</Button>
      <Row className='my-4 px-4'>
        <Col md={6}><Image src="https://picsum.photos/700/300" fluid rounded /></Col>
        <Col md={6}>
          <h3>Headline Text Here</h3>
          <p>Get the same random image every time based on a seed, by adding, Get the same random image every time based on a seed, by adding. Get the same random image every time based on a seed, by adding, Get the same random image every time based on a seed, by adding. Get the same random image every time based on a seed, by adding, Get the same random image every time based on a seed, by adding.</p>
          <h1><Badge bg="primary">Explore now</Badge></h1>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Card >
            <Card.Img variant="top" src="https://picsum.photos/300/130" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Carousel>
            <Carousel.Item>
              <Image src="https://picsum.photos/900/340" fluid rounded />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <Image src="https://picsum.photos/900/340" fluid rounded />
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>

      </Row>

      <Row className='my-5'>
        <Col md={4}>
          <Card >
            <Card.Img variant="top" src="https://picsum.photos/300/130" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card >
            <Card.Img variant="top" src="https://picsum.photos/300/130" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card >
            <Card.Img variant="top" src="https://picsum.photos/300/130" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className='my-5'>

      </Row>
    </Container>
  )
}
