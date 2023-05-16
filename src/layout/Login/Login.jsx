import React, {useState, useEffect} from 'react'
import { BASE_URL } from '../../services/Api';
import axios from 'axios';
import { v4 as uuid} from 'uuid';
import { useNavigate } from 'react-router-dom';

import styles from './login.module.scss';
const Login = () => {
const navigate = useNavigate();
const [users, setUsers ] = useState([])
const [logUser, setLogUser] = useState({
    Username:'',
    Password: ""
})
const fetchUser = async() => {
    const {data} = await axios(BASE_URL+'users')
    setUsers(data)
}
const handleChange = (e) => {
    const {value, name } = e.target
    setLogUser({...logUser, [name]: value})
}

const userSuccessLogIn = (submitLogUser) => {
    localStorage.setItem('user',JSON.stringify(submitLogUser))
    navigate('/todo')
    setLogUser({
        Username:'',
        Password: ""
    })
}
const handleSubmit = (e) => {
    e.preventDefault();
    const submitLogUser = users.filter(item => {
        if(item.Username === logUser.Username && item.Password === logUser.Password){
            return item
        }else{
            return null
        }
    })
    
    // submitLogUser.length !== 0 ? navigate('/todo') : alert('error')
    // submitLogUser.length !== 0 && localStorage.setItem('user',submitLogUser)  
    submitLogUser.length !== 0 ? userSuccessLogIn(submitLogUser) : alert('error')
}

useEffect(() => {
    fetchUser()
},[])

    return (
        <main className={styles.login_container}>
            <h1 className={styles.login_title}>Login</h1>
            <form className={styles.form_container} onSubmit={handleSubmit}>
                <input 
                    className={styles.input}
                    type="text"
                    placeholder='Username'
                    name="Username"
                    value={logUser.Username || ''}
                    onChange={handleChange}
                    />
                <input 
                    className={styles.input}
                    type="password"
                    placeholder='Password'
                    name="Password"
                    value={logUser.Password || ''}
                    onChange={handleChange}
                    />

                    <button type='submit' className={styles.btnSubmit}>
                        Login
                    </button>
            </form>
            <p>Dont have an account yet? <span className={styles.toreg} onClick={() => navigate('/register')}>register here</span></p>
        </main>
    )
}

export default Login