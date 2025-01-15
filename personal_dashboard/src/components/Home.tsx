import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { FormEvent, useState } from "react";

const Home = () => {
    const navigate = useNavigate();
    const [ id, setId ] = useState('');
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        navigate(`/post-list/${id}`)
    };

    return (
        <div>
            <h1>Welcome to the Personal Dashboard</h1>
            <p>Enter your User ID to access your profile and posts!</p>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="userId">
                    <Form.Label>User ID</Form.Label>
                    <Form.Control
                     type="text"
                     placeholder="Enter your User ID"
                     value={id}
                     onChange={(e) => setId(e.target.value)}
                     required
                    />
                    <Button variant="primary" type="submit">Submit</Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default Home;