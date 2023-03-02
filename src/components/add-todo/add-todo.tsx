import { Box, Card, CardContent, TextField } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle';
import React, { useState,KeyboardEvent, useContext } from 'react'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../../firebase';
import {AuthContext} from '../../providers/auth';
export const AddTodo = () => {
  const [todoText,setTodoText]=useState();
  const {user}=useContext(AuthContext);
  const onKeyPress=(event:KeyboardEvent<HTMLInputElement>)=>{
    if(event.key==='Enter'){
    const inputValue=(event.target as HTMLInputElement).value;
if(inputValue){
addDoc(collection(db,'todos'),{
title:inputValue,
isCompleted:false,
userId:user?.uid
})
}
  }
};
  return (
   <Card>
    <CardContent sx={{p:0,
    '& .MuiInput-underline:hover:not(Mui-disabled):before':
    {
      borderBottom:'none',
    },
    '& .MuiInput-underline:after':{borderBottom:'none'},
  '& .MuiInput-underline:before':{borderBottom:'none'},
}}
>
    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
  <RadioButtonUncheckedIcon
  sx={{color:'action.active',mr:1,my:0.5}}
  />

  <TextField id="i put-with-sx"
  label="Add Todo"
  variant="standard"
  onKeyPress={onKeyPress}
  fullWidth
  />
      </Box>
    </CardContent>
   </Card>
  )
    };