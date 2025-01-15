import CreatePost from './components/Posts/CreatePost'
import PostList from './components/Posts/PostList'
import UpdatePost from './components/Posts/UpdatePost'
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/post-list/:id' element = {<PostList />} />
      <Route path='/create-post' element={<CreatePost />} />
      <Route path='/update-post/:id' element={<UpdatePost />} />
    </Routes>
  )
}

export default App
