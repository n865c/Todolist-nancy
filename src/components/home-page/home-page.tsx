import { collection, DocumentData, getDocs ,onSnapshot,doc,query} from 'firebase/firestore';
import React,{useEffect, useState} from 'react';
import {db} from '../../firebase';
export const HomePage = () => {
    const [todos,setTodos]=useState<DocumentData[]|null>(null);
    async function getTodos() {
        const todosCol = collection(db, 'todos');
        const todoSnapshot = await getDocs(todosCol);
        const todoList = todoSnapshot.docs.map((doc)=> doc.data());
        setTodos(todoList);
      }
        const q = query(collection(db, "todos"));
        useEffect(() => {
          const unsub = onSnapshot(q, (querySnapshot) => {
              const todos: DocumentData[] = [];
              querySnapshot.forEach((doc) => {
                  todos.push(doc.data());
                  
              });
              setTodos(todos);
              console.log('Current todo: ', todos.join(', '));
          });
          return unsub;
      }, []);
      const todoItems=todos?.map((todo:DocumentData)=>(
        <span>{todo.title}</span>
      ));
      return <div>{todoItems}</div>;
};
 export default HomePage;
