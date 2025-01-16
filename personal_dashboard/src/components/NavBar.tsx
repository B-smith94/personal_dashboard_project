import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import React from "react";

const NavBar: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    return (
        <div>
            <Navbar bg="light" expand='md' as='header' role="navigation" className="rounded">
                <Navbar.Brand as={NavLink} to={`/user-profile/${id}`}>Personal Dashboard</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link as={NavLink} to={`/user-profile/${id}`}>User Profile</Nav.Link>
                        <Nav.Link as={NavLink} to={`/post-list/${id}`}>View Posts</Nav.Link>
                        <Nav.Link as={NavLink} to={`/create-post/${id}`}>Create Post</Nav.Link>
                        <Nav.Link as={NavLink} to={`/photos/${id}`}>View Photos</Nav.Link>
                        <Nav.Link as={NavLink} to={`/todos/${id}`}>View Todo List</Nav.Link>
                        <Nav.Link as={NavLink} to={'/'}>Enter New User ID</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default NavBar