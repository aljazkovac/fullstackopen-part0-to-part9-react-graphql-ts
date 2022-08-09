import Part from './Part'

const Content = (props) => {
  return (
    <div>
      {props.parts.map(part => 
        <p key={part.id}>{part.name} {part.exercises}</p>)}
    </div>
  )
}

export default Content