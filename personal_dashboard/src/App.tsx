import CreatePost from './components/Posts/CreatePost'
import PostList from './components/Posts/PostList'
import UpdatePost from './components/Posts/UpdatePost'
import Home from './components/Home'
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import UserInfo from './components/UserOps/UserInfo'
import ViewAlbums from './components/Album/ViewAlbums'
import TodoList from './components/ToDo/TodoList'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/user-profile/:id' element={<UserInfo />} />
      <Route path='/post-list/:id' element = {<PostList />} />
      <Route path='/create-post/:id' element={<CreatePost />} />
      <Route path='/update-post/:id' element={<UpdatePost />} />
      <Route path='/photos/:id' element={<ViewAlbums />} />
      <Route path='/todos/:id' element={<TodoList />} />
    </Routes>
  )
}

export default App
