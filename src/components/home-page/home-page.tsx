import { collection, where,DocumentData, getDocs ,onSnapshot,doc,query} from 'firebase/firestore';
import React,{useContext, useEffect, useState} from 'react';
import {db} from '../../firebase';
import { AuthContext } from '../../providers/auth';
import { AddTodo } from '../add-todo';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Card } from '@mui/material';
export const HomePage = () => {
    const [todos,setTodos]=useState<DocumentData[]|null>(null);
    const {user}= useContext(AuthContext);
    // async function getTodos() {
    //     const todosCol = collection(db, 'todos');
    //     const todoSnapshot = await getDocs(todosCol);
    //     const todoList = todoSnapshot.docs.map((doc)=> doc.data());
    //     setTodos(todoList);
    //   }
        const q = query(collection(db, "todos"),where("userId", "==", user?.uid));
        
        useEffect(() => {
          const unsub = onSnapshot(q, (querySnapshot) => {
              const todos: DocumentData[] = [];
              querySnapshot.forEach((doc) => {
                  todos.push(doc.data());
                  
              });
              setTodos(todos);
          });
          return unsub;
      }, []);
      const todoItems=todos?.map((todo:DocumentData)=>(
        <span>{todo.title}</span>
      ));
      return <div>
        <AddTodo/>
        <Card>
            <CardContent>{todoItems}</CardContent>
        <CardActions>Buttons will come here</CardActions>
        </Card>
      </div>
};
 export default HomePage;
