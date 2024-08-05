import React from 'react'
import FetchingAPI from './FetchingAPI'
import { Row, Col, Container, Modal, Button } from 'react-bootstrap';
import { useState } from 'react';

export default function Mainpage() {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleUsersLoaded = (datas) => {
        setUsers(datas);
    }

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    return (
        <div>
            <FetchingAPI onUsersLoaded={handleUsersLoaded} />
            <Container fluid="md">
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>User List</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {users.length > 0 ? users.map(user => {
                            return <div key={user.id}>
                                <p>Name: {user.name}</p>
                                <p>Email: {user.email}</p>
                            </div>
                        }) : <p>Users not found!</p>}
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" onClick={handleCloseModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
                <Row>
                    <Col>Hi</Col>
                </Row>
                <button onClick={handleShowModal}>Click here</button>
            </Container>
        </div>
    )
}
