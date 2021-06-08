import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllUsersThunk} from '../2-bll-users/UsersReducer';
import { usersSelector} from './../2-bll-users/UsersSelector';

const Users = () => {
    const users = useSelector(usersSelector)

    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(getAllUsersThunk())
    },[users])

    return (
        <div>
            <ul>
            {users.map((u) =><NavLink to={`/user/${u.id}`}> <li key={u.id}>
                    <div>User Name: {u.username}</div>
                    <div>Email:{u.email}</div>
            </li> </NavLink>)}
            </ul>
        </div>
    )
}




export default Users