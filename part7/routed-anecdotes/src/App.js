import { useState } from 'react'
import {
  Routes, Route, Link, useParams, useNavigate,
} from 'react-router-dom'
import  { useField } from './hooks'

const Menu = ({ anecdotes, addNew, setNotification, notification }) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <div>
        <Link style={padding} to="/">anecdotes</Link>
        <Link style={padding} to="/create">create new</Link>
        <Link style={padding} to="/about">about</Link>
      </div>
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} notification={notification}/>} />
        <Route path="/create" element={<CreateNew addNew={addNew} setNotification={setNotification} />} />
        <Route path="/about" element={<About />} />
        <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />} />
      </Routes>
    </div>
  )
}

const AnecdoteList = ({ anecdotes, notification }) => {
  const padding = {
    paddingRight: 5
  }
  return (
  <div>
    {notification && <Notification notification={notification} />}
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
        <li key={anecdote.id}> 
          <Link style={padding} to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      )}
    </ul>
  </div>
  )}

const Anecdote = ({ anecdotes }) => {
  const { id } = useParams();
  const anecdoteId = Number(id);
  const anecdote = anecdotes.find(a => a.id === anecdoteId);
  if (!anecdote) {
    return <div>Anecdote not found.</div>;
  }
  return (
  <div>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} votes</p>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const Notification = ({ notification }) => {
  return (
    <div>
      {notification}.
    </div>
  )
}

const CreateNew = (props) => {
  const navigate = useNavigate()
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  // Exclude the reset function from the spread syntax
  const { reset: resetContent, ...contentProps } = content;
  const { reset: resetAuthor, ...authorProps } = author;
  const { reset: resetInfo, ...infoProps } = info;


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    props.setNotification(`You created '${content.value}'`)
    navigate("/")
    setTimeout(() => {
      props.setNotification("")
    }, 5000)
  }
  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentProps} />
        </div>
        <div>
          author
          <input {...authorProps} />
        </div>
        <div>
          url for more info
          <input {...infoProps} />
        </div>
        <button>create</button>
        <button type="button" onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  // const anecdoteById = (id) =>
    // anecdotes.find(a => a.id === id)

  // const vote = (id) => {
    // const anecdote = anecdoteById(id)

    // const voted = {
      // ...anecdote,
      // votes: anecdote.votes + 1
    // }

    // setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  // }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu anecdotes={anecdotes} addNew={addNew} setNotification={setNotification} 
            notification={notification}/>
      <Footer />
    </div>
  )
}

export default App
