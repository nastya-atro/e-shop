import { useEffect } from 'react';
import s from './User.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllUsersThunk } from '../2-bll-users/UsersReducer';
import { usersSelector } from './../2-bll-users/UsersSelector';

const Users = () => {
    const users = useSelector(usersSelector)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllUsersThunk())
    }, [users])

    return (
        <div>
            {users.map((u) => <NavLink to={`/user/${u.id}`}> <div key={u.id} className={s.users_list}>
                <div>{u.username}</div>
                <div>{u.email}</div>
            </div> </NavLink>)}

        </div>
    )
}




export default Users