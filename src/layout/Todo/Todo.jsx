import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoItem from './TodoItem/TodoItem';
import axios from 'axios';
import { BASE_URL } from '../../services/Api';
import {v4 as uuid} from 'uuid'
import styles from './todo.module.scss';


const Todo = () => {

const navigate = useNavigate();
const [logUser, setLogUser] = useState()
const [userId, setUserId] = useState()
const [getTodo, setGetTodo] = useState([])
const [newTodo, setNewTodo] = useState({
    todo: '',
    comments: [{
        id:'',
        title:''
    }],
    isComplete: '',
    id:'',
    userId: ''
})

const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/')
}

const getUserTodo = async() => {
    const {data} = await axios(BASE_URL+'todos')
    const logUserStore = localStorage.getItem('user')
    const getId = JSON.parse(logUserStore)    
    const logUserTodo = data.filter((item) => {
        if(item.userId === getId[0].id){
            return item
        }
    })
    setGetTodo(logUserTodo)
}
const addUserTodo = async() => {
    return await axios.post(BASE_URL+'todos' , {...newTodo,id:uuid(),userId })
}
const deleteTodo = async(id) => {
    try{
        await axios.delete(`${BASE_URL}todos/${id}`)
        await getUserTodo()
    }catch(err){
        console.log(err)
    }
}

const updateTodo = async(id,todo) => {
    try{
        await axios.patch(`${BASE_URL}todos/${id}`,{
            todo
        })
        await getUserTodo()
    }catch(err){
        console.log(err)
    }
}
// const deleteAll = async() => {
//     return await axios.patch(BASE_URL+'todos',)
// }

const handleTodoChange = (e) => {
    const {value,name} = e.target;
    setNewTodo({
        ...newTodo, [name]: value
    })
}
const handleCommentChange = (e) => {
    const {value} = e.target;
    setNewTodo({
        ...newTodo, comments: [{
            id: uuid(),
            title:value
        }]
    })
}

const handleSubmit = async(e) => {
    e.preventDefault();
    await addUserTodo();
    await getUserTodo();
    setNewTodo({...newTodo,todo:'',comments:[{title:''}]})
    
}


useEffect(() => {
    getUserTodo()
    const logUserStore = localStorage.getItem('user')
    const getId = JSON.parse(logUserStore)
    setLogUser(getId)      
    setUserId(getId[0].id)
},[])
    return (
        <main className={styles.todo_container}>
            <header className={styles.todo_header}>
                <h3 className={styles.todo_title}>Todo</h3>
                <button className={styles.user_logout} onClick={handleLogout}>logout</button>
            </header>
            <form className={styles.todo_form} onSubmit={handleSubmit} >
                <section className={styles.input_container}>
                    <input 
                        type="text"
                        className={styles.input_todo}
                        placeholder='Add To do'
                        value={newTodo.todo || ""}
                        name='todo'
                        onChange={handleTodoChange}
                        />
                    <input 
                        type="text"
                        className={styles.input_todo}
                        placeholder='Add comment'
                        value={newTodo.comments[0].title || ""}
                        name='comment'
                        onChange={handleCommentChange}
                        />
                </section>
                    <button type='submit' className={styles.addTodo}>
                        Add
                    </button>
            </form>
            <section className={styles.todoList_container}>
                <div>
                    {
                        getTodo.map((todoItem) => (
                            <TodoItem 
                                key={todoItem.id} 
                                data={todoItem} 
                                handleUpdate={updateTodo}
                                handleComplete={null}
                                handleDelete={deleteTodo}
                                getUserTodo={getUserTodo}
                                />
                        ))
                    }
                </div>
            </section>
            {/* {
                getTodo.length !== 0 && 
                <button className={styles.delete_all_btn} onClick={deleteAll}>DELETE ALL</button>
            } */}
                
        </main>
    )
}

export default Todo