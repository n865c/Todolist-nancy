import React, { FC, useContext, useEffect, useState, ReactNode } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
    collection,
    updateDoc,
    onSnapshot,
    doc,
    deleteDoc,
    where,
    query,
} from 'firebase/firestore';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { CrossIcon } from '../Icons/cross-icon';
import { db } from '../../firebase';
import { AuthContext } from '../../providers/auth';
import { AddTodo } from '../add-todo';
import { Todo } from '../../models/todo';

// import { TodoCard } from '../add-todo';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { Checkbox,Card } from '@mui/material';
type HomePageButtonProps = {
    isActive?: boolean;
    children: ReactNode;
    onClick?: () => void;
};
const HomePageButton: FC<HomePageButtonProps> = (props) => {
    const { isActive = false } = props;
    return (
        <Button
            sx={{ color: isActive ? 'info.light' : 'text.secondary' }}
            {...props}
        >
            {props.children}
        </Button>
    );
};

enum FilterState {
    ALL = 'All',
    ACTIVE = 'Active',
    COMPLETED = 'Completed',
}

const HomePage = () => {
    const [todos, setTodos] = useState<Todo[] | null>(null);
    const [activeFilter, setActiveFilter] = useState<FilterState>(
        FilterState.ALL
    );
    const isSmallScreen = useMediaQuery('(max-width:375px)');
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            const q = query(
                collection(db, 'todos'),
                where('userId', '==', user?.uid)
            );

            const subscribeToTodos = () => {
                return onSnapshot(q, (querySnapshot) => {
                    const todos: Todo[] = [];
                    querySnapshot.forEach((doc) => {
                        const todoItem = {
                            id: doc.id,
                            ...doc.data(),
                        };
                        todos.push(todoItem as Todo);
                    });
                    setTodos(todos);
                });
            };

            const unsub = subscribeToTodos();

            return unsub;
        }
    }, [user]);

    const handleRadioCheck = (todo: Todo) => {
        if (todo.id) {
            const docReference = doc(db, 'todos', todo.id);
            if (!todo.isCompleted) {
                updateDoc(docReference, {
                    isCompleted: true,
                });
            } else {
                updateDoc(docReference, {
                    isCompleted: false,
                });
            }
        }
    };

    const deleteTodo = (todo: Todo) => {
        if (todo.id) {
            deleteDoc(doc(db, 'todos', todo.id));
        }
    };

    const activeTodos = todos?.filter((todo) => !todo.isCompleted) ?? [];
    const completedTodos = todos?.filter((todo) => todo.isCompleted) ?? [];
    const filteredTodos =
        activeFilter === FilterState.ALL
            ? todos
            : todos?.filter((todo) => {
                  const filterCondition =
                      activeFilter === FilterState.ACTIVE ? false : true;

                  return todo.isCompleted === filterCondition;
              });

    const clearCompleted = () => {
        completedTodos.forEach(deleteTodo);
    };

    const todoItems = filteredTodos?.map((todo: Todo) => (
        <ListItem
            disablePadding
            sx={{
                p: 0,
                m: 0,
                borderBottom: '1px solid #dfdfdf',
                '& .delete-icon': {
                    visibility: 'hidden',
                },
                '&:hover .delete-icon': {
                    visibility: 'visible',
                },
            }}
        >
            <ListItemButton>
                {todo.isCompleted ? (
                    <Checkbox
                        checked={true}
                        onChange={() => handleRadioCheck(todo)}
                    />
                ) : (
                    <Checkbox
                        checked={false}
                        onChange={() => handleRadioCheck(todo)}
                        inputProps={{ 'aria-label': todo.title }}
                    />
                )}

                <ListItemText>
                    <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Box
                            sx={{
                                textDecoration: todo.isCompleted
                                    ? 'line-through'
                                    : 'none',
                            }}
                            component="span"
                        >
                            {todo.title}
                        </Box>
                        <IconButton
                            className="delete-icon"
                            onClick={() => deleteTodo(todo)}
                        >
                            <CrossIcon />
                        </IconButton>
                    </Grid>
                </ListItemText>
            </ListItemButton>
        </ListItem>
    ));

    return (
        <div>
            <AddTodo />
            <Card>
                <CardContent sx={{ p: 0 }}>
                    <List>{todoItems}</List>
                </CardContent>
                <CardActions>
                    <Grid
                        container
                        alignItems={'center'}
                        justifyContent="space-between"
                    >
                        <Box component="span">
                            {activeTodos?.length} items left
                        </Box>
                        {!isSmallScreen && (
                            <Box sx={{ display: 'flex' }}>
                                <HomePageButton
                                    isActive={activeFilter === FilterState.ALL}
                                    onClick={() =>
                                        setActiveFilter(FilterState.ALL)
                                    }
                                >
                                    All
                                </HomePageButton>
                                <HomePageButton
                                    isActive={
                                        activeFilter === FilterState.ACTIVE
                                    }
                                    onClick={() =>
                                        setActiveFilter(FilterState.ACTIVE)
                                    }
                                >
                                    Active
                                </HomePageButton>
                                <HomePageButton
                                    isActive={
                                        activeFilter === FilterState.COMPLETED
                                    }
                                    onClick={() =>
                                        setActiveFilter(FilterState.COMPLETED)
                                    }
                                >
                                    Completed
                                </HomePageButton>
                            </Box>
                        )}
                        <Box>
                            <HomePageButton onClick={clearCompleted}>
                                {' '}
                                Clear Completed
                            </HomePageButton>
                        </Box>
                    </Grid>
                </CardActions>
            </Card>

            {isSmallScreen && (
                <Card>
                    <CardContent>
                        <HomePageButton
                            isActive={activeFilter === FilterState.ALL}
                            onClick={() => setActiveFilter(FilterState.ALL)}
                        >
                            All
                        </HomePageButton>
                        <HomePageButton
                            isActive={activeFilter === FilterState.ACTIVE}
                            onClick={() => setActiveFilter(FilterState.ACTIVE)}
                        >
                            Active
                        </HomePageButton>
                        <HomePageButton
                            isActive={activeFilter === FilterState.COMPLETED}
                            onClick={() =>
                                setActiveFilter(FilterState.COMPLETED)
                            }
                        >
                            Completed
                        </HomePageButton>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};
export default HomePage;
