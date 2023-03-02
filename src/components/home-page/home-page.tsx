import { collection, where,DocumentData, getDocs ,onSnapshot,doc,query} from 'firebase/firestore';
import React,{FC, ReactNode, useContext, useEffect, useState} from 'react';
import {db} from '../../firebase';
import { AuthContext } from '../../providers/auth';
import { AddTodo } from '../add-todo';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Box, Card, IconButton, ListItemText } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Radio from '@mui/material/Radio';
import { Todo } from '../../models/todo';
import Grid from '@mui/material/Grid'
import {CheckIcon, CrossIcon} from '../Icons';
import Button from "@mui/material/Button";
type HomePageButtonProps={
    isActive?: boolean;
    children:ReactNode;
    onClick?:()=>void;
}
const HomePageButton :FC<HomePageButtonProps>=(props)=>{
    const {isActive=false}=props;
    return (<Button sx={{color: isActive?'info.light':'text.secondary'}}
    {...props}>
        {props.children}</Button>
    )
}
export const HomePage = () => {
    const [todos,setTodos]=useState<Todo[]|null>(null);
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
              const todos: Todo[] = [];
              querySnapshot.forEach((doc) => {
                  todos.push(doc.data() as Todo);
                  
              });
              setTodos(todos);
          });
          return unsub;
      }, []);
      const handleRadioCheck=(todo:Todo)=>{

      };
      const activeTodos=todos?.filter(todo=>!todo.isCompleted)??[];
      const todoItems=todos?.map((todo:Todo)=>(
        <ListItem
         disablePadding sx={{p:0 ,m:0,borderBottom: '1px solid #dfdfdf',
         '& .delete-icon':{
            visibility:'hidden',
         },
         '&:hover.delete-icon':{
            visibility:'visible',
         },
         }}>
            <ListItemButton>
                {
                    todo.isCompleted?(<CheckIcon/>):
            (<Radio
            checked={todo.isCompleted}
            onChange={()=>handleRadioCheck(todo)}
            name="radio-buttons"
            inputProps={{ 'aria-label': todo.title }}
          />
            )}
                <ListItemText>
                    <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center">
                        <span>{todo.title}</span>
                        <IconButton className='delete-icon'>
                            <CrossIcon/>
                        </IconButton>
                    </Grid>
                </ListItemText>
            </ListItemButton></ListItem>
      ));
      return <div>
        <AddTodo/>
        <Card sx={{mt: 2}}>
            <CardContent sx={{p:0}}>
                <List>
                {todoItems}</List>
                </CardContent>
        <CardActions>
<Grid container
alignItems={'center'}
    justifyContent="space-between">
        <Box component='span'>{activeTodos?.length} items lefts</Box>
        <Box sx={{display: 'flex'}}>
       <HomePageButton
        isActive>All</HomePageButton>
       <HomePageButton>Active</HomePageButton>
       <HomePageButton>Completed</HomePageButton>
       </Box>
      <Box>
        <HomePageButton>
            Clear Completed
        </HomePageButton>
      </Box>
</Grid>
        </CardActions>
        </Card>
      </div>
};
 export default HomePage;

