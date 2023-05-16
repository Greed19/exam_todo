import React, { useState } from 'react';
import styles from './todoitem.module.scss';
import Comment from '../Comment/Comment';
import axios from 'axios';
import { BASE_URL } from '../../../services/Api';
import {v4 as uuid} from 'uuid'

const TodoItem = ({data,handleUpdate,handleDelete,handleComplete,getUserTodo}) => {
  const [isUpdate , setIsUpdate] = useState(false);
  const {id,todo,comments,userId,isComplete} = data;
  const [oldTodo , setOldTodo] = useState(todo);
  const [newCom, setNewCom] = useState("")
  const [showComments , setShowComments] = useState(false)
  const [isCommentUpdate, setIsCommentUpdate] = useState(false)
  const [showUpdateComment,setShowUpdateComment] = useState(false)



  const handleUpdateChange = (e) => {
    const {value,name} = e.target;
    setOldTodo(value)
  }

  const handleUpdatedData = () => {
    setIsUpdate(true)
  }

  const handleShowComments = () => {
    setShowComments(!showComments)
  }

  const submitUpdate = (id) => {
    setIsUpdate(false);
    handleUpdate(id,oldTodo)
  }

  const addComment = () => {
    setShowUpdateComment(true)
  }
  const handleComChange = (e) => {
    const {value} = e.target
    setNewCom(value)
  }

  const handleSaveComment = async(id) => {
    console.log(id,'!!!')
    await axios.patch(`${BASE_URL}todos/${id}`,  {comments:[...comments,{id:uuid(),title:newCom}]})
    await getUserTodo()
    setShowUpdateComment(false)
    setNewCom('')
  }

  return (
    <section className={styles.todo_item_container}>
      {
        isUpdate ? 
          <input 
            type="text"
            className={styles.todo_input}
            value={oldTodo || ""}
            name='todo'
            onChange={handleUpdateChange}
            />
        :
        <section className={styles.allTodo_container}>
          <div className={styles.todo}>
            {todo}
          </div>
          <button className={styles.btn} onClick={handleShowComments}>
           show comments
          </button>
          {/* commentzxc */}
          {
            showUpdateComment ? 
            <>    
            <input 
            type="text"
            className={styles.todo_input}
            value={newCom || ""}
            name='todo'
            onChange={handleComChange}
            />
            <button className={styles.btn}onClick={() => handleSaveComment(id)}>save</button>
            </>
                : 
                <div className={styles.comments_container}>
                <div>
                  {
                    showComments &&
                    comments.map((item) => (
                      <Comment 
                        key={item.id} 
                        todoId={id} 
                        item={item} 
                        comments={comments}
                        getUserTodo={getUserTodo}
                        />
                    ))
                  }          
                </div>
              </div>
          }

        </section>
      }
      <div className={styles.btn_container}>
        {
          isUpdate ? 
            <button className={styles.btn} onClick={()=> submitUpdate(id)}>Confirm</button>
            :
            <>
              <button className={styles.btn} onClick={addComment}>Add Comment</button>
              <button className={styles.btn} onClick={handleUpdatedData}>Update</button>
              <button className={styles.btn} onClick={() => handleDelete(id)}>Delete</button>                         
            </>
        }
      </div>
    </section>
  )
}

export default TodoItem;