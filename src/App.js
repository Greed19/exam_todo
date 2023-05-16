import { useEffect } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom'
import Login from './layout/Login/Login';
import Register from './layout/Register/Register';
import Todo from './layout/Todo/Todo';
import styles from './app.module.scss';
function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const isUserLog = localStorage.getItem('user')
    if(!!isUserLog){
      navigate('/todo')
    }else{
      navigate('/')
    }
  },[])
  return (
    <main className={styles.app_container}>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='todo' element={<Todo />} />
      </Routes>
    </main>
  );
}

export default App;
