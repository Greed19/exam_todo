import React, { useState } from 'react';
import {v4 as uuid} from 'uuid'
import { useNavigate } from 'react-router-dom';
import styles from './register.module.scss';
import axios from 'axios';
import { BASE_URL } from '../../services/Api';

const Register = () => {
    const navigate = useNavigate();
    const [users , setUsers] = useState([])
    const [newUser, setNewUser] = useState({
        Username: "",
        Password: "",
        ConfirmPassword: "",
    })
    const AddUser = async() => {
        return await axios.post(BASE_URL+'users', {...newUser, id:uuid()})
    }
    const fetchUse = async() => {

    }
    const handleRegChange = (e) => {
        const {value,name} = e.target;
        setNewUser({...newUser, [name]:value})
    }

    const handleRegSubmit = (e) => {
        e.preventDefault();
        if(newUser.Password === newUser.ConfirmPassword ) {
            AddUser()
            setNewUser({
                Username: "",
                Password: "",
                ConfirmPassword: "",
            })
            navigate('/')
        }
    }

  return (
    <main className={styles.register_container} onSubmit={handleRegSubmit}>
        <h3 className={styles.reg_title}>Register</h3>
        <form className={styles.form}>
            <input 
                type="text"
                className={styles.reg_input}
                placeholder='Username'                
                name='Username'
                value={newUser.Username || ""}
                onChange={handleRegChange}
                required
                />
            <input 
                type="password"
                className={styles.reg_input}
                placeholder='Password'
                name='Password'
                value={newUser.Password || "" }
                onChange={handleRegChange}
                required
                />
            <input 
                type="password"
                className={styles.reg_input}
                placeholder ='Confirm Password'
                name='ConfirmPassword'
                value={newUser.ConfirmPassword || ""}
                onChange={handleRegChange}
                required
                />

            <button type='submit' className={styles.reg_btn}>Register</button>
        </form>
    </main>
  )
}

export default Register