import { gql } from "urql";

// Fetch User Information
export const GET_USER_INFO = gql`
    query ($id: ID!) {
        user(id: $id) {
            name
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
            id
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
// fetch a single post for editing purposes
export const GET_POST = gql`
  query($id: ID!) {
    post(id: $id) {
      id
      title
      body
      user {
        id
      }
    }
  }
`
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