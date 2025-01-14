import { gql } from "urql";

// Fetch User Information
export const GET_USER_INFO = gql`
    query ($id: ID!) {
        user(id: $id) {
            id
            username
            email
            phone
            website
            company {
                name
                bs
                catchPhrase
            }
            address {
                street
                zipcode
                city
                suite
            }
        }
    }
`;
// Fetch User Posts
export const GET_USER_POSTS = gql`
    query($id: ID!) {
        user(id: $id) {
            posts {
                data {
                    id
                    title
                    body
                    comments {
                        data {
                            id
                            name
                            body
                        }
                    }
                }
            }
        }    
    }
`;
// Fetch User Albums
export const GET_USER_ALBUMS = gql`
    query($id: ID!) {
        user(id: $id) {
            id
            username
            albums {
                data {
                    id
                    title
                    photos {
                        id
                        url
                        title
                    }
                }
            }
        }
    }
`;

// Fetch user Todos
export const GET_USER_TODOS = gql`
    query($id: ID!) {
        user(id: $id) {
            id
            username
            todos {
                data {
                    id
                    title
                    completed
                }
            }
        }
    }
`;