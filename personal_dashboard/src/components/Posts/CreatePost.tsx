import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../../queries/Mutations";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container } from 'react-bootstrap'
import { useRef, FormEvent, useEffect} from "react";
import NavBar from "../NavBar";

const CreatePost: React.FC = () => {
    const inputTitle = useRef<HTMLInputElement>(null);
    const inputBody = useRef<HTMLTextAreaElement>(null);
    const [createPost, { loading, error }] = useMutation(CREATE_POST)
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(():void => {
        if (id === 'undefined') {
            navigate('/');
        };
    }, [])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (inputTitle.current && inputBody.current) {
            createPost({
                variables: {
                    input: {
                        title: inputTitle.current.value,
                        body: inputBody.current.value,
                    }
  
                },
            });
            inputTitle.current.value = '';
            inputBody.current.value = '';
            console.log('Post successfully created!')
            navigate(`/post-list/${id}`);
        }
    };

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <Container>
            <NavBar />
            <Form onSubmit={handleSubmit}>
                <h1>Create Post</h1>
                <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                     type="text"
                     placeholder="Enter title"
                     ref={inputTitle}
                    />
                </Form.Group>
                <Form.Group controlId="formBody">
                    <Form.Label>Body</Form.Label>
                    <Form.Control
                     as='textarea'
                     placeholder='Enter post body'
                     rows={3}
                     ref={inputBody}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Create Post</Button>
            </Form>
        </Container>
    )
}

export default CreatePost