import { useEffect, useState, React } from 'react';
import { fetchingAPI } from '../serviceAPI/FetchingAPI';
import { Container, Table } from 'react-bootstrap';

export default function RenderingPage() {

    const [users, setUsers] = useState([]);

    const gettingAPI = async () => {

        const getMethod = {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        }

        try {
            const response = await fetchingAPI('https://66ab5e09636a4840d7ca5c11.mockapi.io/', 'task', getMethod)
            setUsers(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        gettingAPI()
    }, []);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const postingAPI = async () => {
        if (name === '' || email === '' || address === '') {
            setErrorMessage('All fields are required!');
            return;
        }

        const data = {
            name: 'name',
            email: 'email',
            address: 'address'
        }

        const postMethod = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)
        }

        try {
            const response = await fetchingAPI('https://66ab5e09636a4840d7ca5c11.mockapi.io/', 'task', postMethod)
            if (response) {
                gettingAPI()
            } else {
                throw new Error('Data cannot be posted!');
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    return (
        <Container>
            <div>
                <h1>List of Students</h1>
            </div>
            <Table striped bordered hover className='my-3'>
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Student Name</th>
                        <th>Student Email</th>
                        <th>Student Address</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => {
                        return <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                        </tr>
                    })}
                </tbody>
            </Table>
        </Container>
    )
}
