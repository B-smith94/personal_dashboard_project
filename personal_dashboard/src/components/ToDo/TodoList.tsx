import { GET_USER_TODOS } from "../../queries/Queries";
import { UPDATE_TODOS } from "../../queries/Mutations";
import { useParams, useNavigate } from "react-router-dom";
import { Button, ListGroup, Container, Spinner, Form } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import NavBar from "../NavBar";
import { useEffect } from "react";

const TodoList = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(():void => {
        if (id === 'undefined') {
            navigate('/');
        };
    }, [])

    const { loading, error, data } = useQuery(GET_USER_TODOS, {
        variables: { id }
    })

    const [updateTodo, {loading: updateLoading, error: updateError}] = useMutation(UPDATE_TODOS)

    const handleCheck = (todoId: string, completed: boolean) => {
        updateTodo({
            variables: {
                id: todoId,
                input: { completed: !completed }
            },
        });
    };

    if (loading) return <p>Loading post data...</p>
    if (error) return <p>Error fetching todos: {error.message}</p>
    if (updateError) return <p>Error updating Todo: {updateError.message}</p>

    

    return (
        <Container>
            <NavBar />
            <h2>User Todo List</h2>
            <Button variant="primary" onClick={() => navigate(`/post-list/${id}`)}>View Posts</Button>
            <Button variant="secondary" onClick={() => navigate(`/photos/${id}`)}>View Photos</Button>
            <ListGroup>
                {data.user.todos.data.map((todo: any) => (
                    <ListGroup.Item key={todo.id}>
                        Todo #{todo.id} - {todo.title}
                        <Form>
                            <Form.Check
                             type="checkbox"
                             label="Mark as Complete"
                             checked={todo.completed}
                             onChange={() => handleCheck(todo.id, todo.completed)}
                             disabled={updateLoading}
                            />
                        </Form>
                        {updateLoading && <Spinner animation="border" size="sm" className="ms-2" />}
                    </ListGroup.Item>
            ))}
            </ListGroup>
        </Container>
    );
};

export default TodoList;