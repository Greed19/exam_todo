import React, { useState } from 'react'
import styles from './comment.module.scss';
import axios from 'axios';
import { BASE_URL } from '../../../services/Api';
const Comment = ({item,comments,todoId,getUserTodo}) => {
    const [isShowInput, setIsShowInput] = useState(false)
    const [updateCom, setUpdateCom] = useState("")
    const {title} = item

    const deleteComment = async(id) => {
        const newComments = comments.filter(item => item.id !== id)
        await axios.patch(`${BASE_URL}todos/${todoId}`,  {comments:newComments})
        await getUserTodo()
    }

    const updateComment = async(id) => {
        const newComments = comments.filter(item => item.id !== id)
        await axios.patch(`${BASE_URL}todos/${todoId}`,  {comments:[...newComments,{id,title:updateCom}]})
        await getUserTodo()
        setIsShowInput(false)
    }

    

  return (
    <section className={styles.comment_container}>
        {
            isShowInput ? 
            <div>
            <input 
                type="text"
                className={styles.comment_input}
                value={updateCom || ""}
                name='todo'
                onChange={(e) => setUpdateCom(e.target.value)}
            />
            <button className={styles.com_btn} onClick={() => updateComment(item.id)}>save</button>
            </div>
          :
          <div className={styles.show_comment}>
            <span>{title}</span>                    
            <div className={styles.comment_btn_container}>                
                <button className={styles.com_btn} onClick={() => setIsShowInput(true)}>update</button>
                <button className={styles.com_btn} onClick={() => deleteComment(item.id)}>delete</button>
            </div>
          </div>
        }

    </section>
  )
}

export default Comment