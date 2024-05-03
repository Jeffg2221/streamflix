import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { IUser } from '../../models/IUser';
import axios from 'axios';
import { isDisabled } from '@testing-library/user-event/dist/utils';

function GetAllUsers() {
    const [users, setUsers] = useState<IUser[]>([]);
    const navigate = useNavigate();

    let getUsers = async () => {

        let response = await axios.get('http://localhost:8080/users', 
        {withCredentials: true}
        ).then((response) => {
            setUsers(response.data);
        }).catch((error) => {
            console.error(error);
        });
    }

    let compare = (a: IUser, b: IUser) => {
        if (a.username < b.username) {
            return -1;
        }
        if (a.username > b.username) {
            return 1;
        }
        return 0;
    }

    let addAdmin = async (id: number) => {
        let response = await axios.patch(`http://localhost:8080/users/admin/setAdmin/${id}`, {},
        {withCredentials: true}
        ).then((response) => {
            document.getElementById(`admin-status${id}`)!.innerHTML = "true";
            document.getElementById(`button${id}`)!.setAttribute("disabled", "true");
            //setUpdate(!update);
        }).catch((error) => {
            console.error(error);
        });
    }

    let checkAdmin = () => {
        let response = axios.get('http://localhost:8080/users/admin',
        {withCredentials: true}
        ).then((response) => {
            if(!response.data) {
                navigate("/");
            } else {
                getUsers();
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(checkAdmin, [])

    return (
        <div>
            <h1 className="movie-form-header">All Users</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Balance</th>
                        <th>Admin</th>
                        <th>Set Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {users.sort(compare).map((user) => {
                        return (
                            <tr key={user.userId}>
                                <td>{user.userId}</td>
                                <td>{user.username}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>${user.balance}</td>
                                <td id={`admin-status${user.userId}`}>{user.admin ? "true" : "false"}</td>
                                <td>{!user.admin&&<button id={`button${user.userId}`} className="btn btn-primary" type="button" onClick={() => addAdmin(user.userId)}>Add</button>}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
} export default GetAllUsers;