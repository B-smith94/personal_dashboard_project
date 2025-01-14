import { gql } from "urql";
// Create New Post
export const CREATE_POST = gql`
    mutation CreatePost(
        $input: CreatePostInput!
    ) {
        createPost(input: $input) {
            id
            title
            body
        }
    }
`;
// Edit a Post
export const UPDATE_POST = gql`
    mutation UpdatePost(
        $id: ID!,
        $input: UpdatePostInput!
    ) {
        updatePost(id: $id, input: $input) {
            id
            title
            body
        }
    }
`;
// Delete a Post
export const DELETE_POST = gql`
    mutation DeletePost(
        $id: ID!
    ) {
        deletePost(id: $id)
    }
`
// Update Todos
export const UPDATE_TODOS = gql`
    mutation UpdateTodos (
        $id: ID!,
        $input: UpdateTodosInput!
    ) {
        updateTodos(id: $id, input: $input) {
            id
            completed
        }    
    }
`