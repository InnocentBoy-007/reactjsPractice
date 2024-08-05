import { useState, useEffect } from 'react'

export default function FetchingAPI({ onUsersLoaded }) {
    const [users, setUsers] = useState();

    const fetchUsers = async () => {
        try {
            const response = await fetch('https://66b08ccf6a693a95b53923eb.mockapi.io/api/users/user_list', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
                onUsersLoaded(data)
            } else {
                throw new Error("Data not fetch!");

            }

        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return null;
}
