import { useEffect, useState } from 'react'
import './App.css'
import { Button, Form } from 'react-bootstrap'

function App() {
  const [API_URL, setAPI_URL] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [phone_number, setPhone_number] = useState("")
  const [email, setEmail] = useState("")
  const [user_id, setUser_id] = useState("")

  const [isFormValid, setIsFormValid] = useState("")

  const [posts, setPosts] = useState([])

  const [updatingId, setupdatingId] = useState("")

  const checkFormValidity = () => {
    const form = document.querySelector('form')
    setIsFormValid(form.checkValidity())
  }

  const fetchPosts = () => {
    fetch(API_URL + "/bookings", {
      method: "GET",
      headers: { "content-Type": "application/json"},
    })
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));
  };

 
  useEffect(() => {
    fetchPosts()
  
  }, [])

  useEffect(() => {
    checkFormValidity()
  
  }, [])

  const createPost = (e) => {
    e.preventDefault()
    fetch(API_URL + "/bookings", {
      method: "POST",
      headers: { "content-Type": "application/json"}, 
      body: JSON.stringify({title, description, date, time, phone_number, email, user_id})
    })
      .then(res => res.json())
      .then(fetchPosts)
      .catch(err => console.error(err))

      setTitle('')
      setDescription("")
      setDate("")
      setTime("")
      setPhone_number("")
      setEmail("")
      setUser_id("")
  }

  const putIntoValues = (id) => {

    fetch(API_URL + "/bookings/" + id, {
      method: "GET",
      headers: { "content-Type": "application/json"},
    })
    .then(res => res.json())
    .then(data => {
      const {title, description, date, time, phone_number, email, user_id} = data
      setupdatingId(id)
      setTitle(title)
      setDescription(description)
      setDate(date)
      setTime(time)
      setPhone_number(phone_number)
      setEmail(email)
      setUser_id(user_id)
    })

  }

  const editPost = () => {
    
    const id = updatingId

    fetch(API_URL + "/update/" + id, {
      method: "PUT",
      headers: { "content-Type": "application/json"}, 
      body: JSON.stringify({title, description, date, time, phone_number, email, user_id})
    })
      .then(res => res.json())
      .then(fetchPosts)
      .catch(err => console.error(err))

      setupdatingId("")
      setTitle('')
      setDescription("")
      setDate("")
      setTime("")
      setPhone_number("")
      setEmail("")
      setUser_id("")
  }

  const deletePost = (id) => {
    fetch(API_URL + "/delete/" + id, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(fetchPosts)
      .catch(err => console.error(err))
  }

  return (
    <>
      <Form.Group>
        <Form.Label>API_URL</Form.Label>
        <Form.Control
          type="text"
          placeholder='API_URL'
          value={API_URL}
          onChange={(e) => setAPI_URL(e.target.value)}
           required
         />
      </Form.Group>

      <Form onChange={checkFormValidity}>


        <Form.Group>
          <Form.Label>title</Form.Label>
          <Form.Control
            type="text"
            placeholder='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Form.Label>description</Form.Label>
          <Form.Control
            type="text"
            placeholder='description'
            as="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>date</Form.Label>
          <Form.Control
            type="date"
            placeholder='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <Form.Label>time</Form.Label>
          <Form.Control
            type="time"
            placeholder='time'
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>phone_number</Form.Label>
          <Form.Control
            type="tel"
            placeholder='phone_number'
            value={phone_number}
            onChange={(e) => {
              const numericValue = e.target.value.replace(/\D/g, '');
              setPhone_number(numericValue.slice(0, 10))
            }}
            required
          />
          <Form.Label>email</Form.Label>
          <Form.Control
            type="email"
            placeholder='email'
            as="textarea"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>user_id</Form.Label>
          <Form.Control
            type="text"
            placeholder='user_id'
            value={user_id}
            onChange={(e) => setUser_id(e.target.value)}
            required
          />
        </Form.Group>

        <Button onClick={createPost} disabled={!isFormValid} >Submit</Button>

        <Button onClick={editPost} disabled={!isFormValid} >Update</Button>

      </Form>
      <div>
        {posts.map(post => 
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <p>{post.date}</p>
            <p>{post.time}</p>
            <p>{post.phone_number}</p>
            <p>{post.email}</p>
            <p>{post.user_id}</p>
            <Button onClick={() => deletePost(post.id)} variant="danger">delete</Button>
            <Button onClick={() => putIntoValues(post.id)} variant="secondary">update</Button>
          </div>
          )}
      </div>
    </>
  )
}

export default App
