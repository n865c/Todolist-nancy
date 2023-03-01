import { collection, DocumentData, getDocs } from 'firebase/firestore';
import React,{useEffect, useState} from 'react';
import {db} from '../../firebase';
export const HomePage = () => {
    const [todos,setTodos]=useState<DocumentData[]|null>(null);
    async function getTodos() {
        const todosCol = collection(db, 'todos');
        const todoSnapshot = await getDocs(todosCol);
        const todoList = todoSnapshot.docs.map((doc)=> doc.data());
        setTodos(todoList);}
      useEffect(()=>{
        getTodos();
      },[]);
      const todoItems=todos?.map((todo:DocumentData)=>(
        <span>{todo.title}</span>
      ));
      return <div>{todoItems}</div>;
};
 export default HomePage;
