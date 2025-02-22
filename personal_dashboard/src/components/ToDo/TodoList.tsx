import { GET_USER_TODOS } from "../../queries/Queries";
import { UPDATE_TODOS, DELETE_TODO } from "../../queries/Mutations";
import { useParams, useNavigate } from "react-router-dom";
import { Button, ListGroup, Container, Spinner, Form, Dropdown } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import NavBar from "../NavBar";
import { useEffect, useState } from "react";

const TodoList = () => {
    const { id } = useParams();
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [status, setStatus] = useState<string>('all') // 'all', 'complete', 'incomplete'
    const navigate = useNavigate();

    useEffect(():void => {
        if (id === 'undefined') {
            navigate('/');
        };
    }, [])

    const { loading, error, data, refetch } = useQuery(GET_USER_TODOS, {
        variables: { id }
    })


    const [updateTodo, {loading: updateLoading, error: updateError}] = useMutation(UPDATE_TODOS)

    const [deleteTodo] = useMutation(DELETE_TODO)

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to remove this task from the Todo List?")) {
            try {
                await deleteTodo({ variables: { id }});
                refetch();
                console.log('Todo item deleted.')
            } catch (error) {
                console.error("Error deleting post:", error)
            }
        }
    }

    const handleCheck = (todoId: string, completed: boolean) => {
        updateTodo({
            variables: {
                id: todoId,
                input: { completed: !completed }
            },
        });
    };

    const filteredTodos = data?.user?.todos?.data.filter((todo: any) => 
        searchQuery ? todo.title.toLowerCase().includes(searchQuery.toLowerCase()) : data.user.todos.data    
    ).sort((a: any, b: any) => {
        if (status === 'complete') {
            return a.completed === b.completed ? 0 : a.completed? -1 : 1;
        } else if (status === 'incomplete') {
            return a.completed === b.completed ? 0 : a.completed ? 1: -1;
        } else {
            return 0;
        }
    })


    if (loading) return <p>Loading post data...</p>
    if (error) return <p>Error fetching todos: {error.message}</p>
    if (updateError) return <p>Error updating Todo: {updateError.message}</p>



    return (
        <Container>
            <NavBar />
            <h2>User Todo List</h2>
            <Button variant="primary" onClick={() => navigate(`/post-list/${id}`)}>View Posts</Button>
            <Button variant="secondary" onClick={() => navigate(`/photos/${id}`)}>View Photos</Button>
            <Form.Group controlId="searchPosts">
                <Form.Label>Search Posts</Form.Label>
                <Form.Control
                 type="text"
                 placeholder="Search posts by title"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Form.Group>
            <ListGroup>
            <Dropdown>
                <Dropdown.Toggle variant="info" id="dropdown-sort">
                    Sort by Status
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setStatus('all')}>Unsorted</Dropdown.Item>
                    <Dropdown.Item onClick={() => setStatus('complete')}>Complete</Dropdown.Item>
                    <Dropdown.Item onClick={() => setStatus('incomplete')}>Incomplete</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
                {filteredTodos.map((todo: any) => (
                    <ListGroup.Item key={todo.id}>
                        Todo #{todo.id} - {todo.title}
                        <Form>
                                    <Form.Check
                                    type="checkbox"
                                    label="Mark as Complete"
                                    className="d-flex"
                                    checked={todo.completed}
                                    onChange={() => handleCheck(todo.id, todo.completed)}
                                    disabled={updateLoading}
                                    />                            
                                    <Button variant="danger" onClick={() => handleDelete(todo.id)}>Delete Item</Button>
                        </Form>
                        {updateLoading && <Spinner animation="border" size="sm" className="ms-2" />}
                    </ListGroup.Item>
            ))}
            </ListGroup>
        </Container>
    );
};

export default TodoList;