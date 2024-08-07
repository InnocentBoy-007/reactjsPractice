import { React, useState, useEffect } from 'react'
import { Container, Row, Col, Table, Button, Modal, Alert, Form, InputGroup } from 'react-bootstrap';
export default function Rendering() {

    const [users, setUsers] = useState([]);

    const fetchingAPI = async () => {
        try {
            const response = await fetch('https://66ab5e09636a4840d7ca5c11.mockapi.io/task', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                throw new Error('API not fetch!');
                //or throw another error
            }
        } catch (error) {
            console.error(error);
            //or do something with the error
        }
    }
    useEffect(() => {
        fetchingAPI();
    }, []);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const [inputClose, setInputClose] = useState(false);

    const handleSubmit = async () => {
        if (name === "" || email === "" || address === "") {
            setErrorMessage("All fields are required!");
        } else {

            const submitData = {
                name: name,
                email: email,
                address: address
            }
            setInputClose(true);
            try {
                const response = await fetch('https://66ab5e09636a4840d7ca5c11.mockapi.io/task', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(submitData)
                })
                if (response.ok) {
                    fetchingAPI();
                } else {
                    throw new Error('Error! Data not post!');
                    //or throw other error
                }
            } catch (error) {
                console.error(JSON.stringify(error));
                //or do something with the error
            }
        }
    }

    const [modalShow, setModalShow] = useState(false);
    const modalShowtoHide = () => setModalShow(false);
    const modalShowtoShow = () => setModalShow(true);

    return (
        <Container>
            <Modal show={modalShow}>
                <Modal.Header closeButton onClick={modalShowtoHide}>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {errorMessage.length > 0 && <Alert variant='danger'>
                        {errorMessage}
                    </Alert>}
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">
                            Name
                        </InputGroup.Text>
                        <Form.Control name='name' value={name} onChange={(e) => {
                            setName(e.target.value);
                            setErrorMessage("");
                        }}
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">
                            Email
                        </InputGroup.Text>
                        <Form.Control name='email' value={email} onChange={(e) => {
                            setEmail(e.target.value);
                            setErrorMessage("");
                        }}
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">
                            Address
                        </InputGroup.Text>
                        <Form.Control name='address' value={address} onChange={(e) => {
                            setAddress(e.target.value);
                            setErrorMessage("");
                        }}
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </InputGroup>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={modalShowtoHide}>Close</Button>
                    <Button variant="primary" onClick={handleSubmit}>Save changes</Button>
                </Modal.Footer>
            </Modal>
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Sl no.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.address}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Button variant="primary" onClick={modalShowtoShow}>Add candidate</Button>
                </Col>
            </Row>
        </Container>
    )
}
