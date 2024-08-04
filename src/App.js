//this code is about handling an api using async await

import React from 'react'

import { useState, useEffect } from 'react'

export default function App() {

    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await fetch('https://66aa0588613eced4eba73a23.mockapi.io/api/users/display1', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            //if the api doesn't work or did not fetch any data
            if (!response.ok) {
                throw new Error('Data not fetch!');
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            {users.map(user => {
                return <div key={user.id}>
                    <h2>Heading: {user.heading}</h2>
                    <h2>SubHeading: {user.subheading}</h2>

                </div>
            })}
        </div>
    )
}
