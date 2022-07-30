"use strict";

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
    return (
      <div>
        <Header course={course}/>
        <Content part1={part1} part2={part2} part3={part3} />
        <Total exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises}/>
      </div>
    )
}

const Header = (props) => {
  return (
    <>
      <p>{props.course}</p>
    </>
  )
}
const Content = (props) => {
  return (
  <>
  <Part partName={props.part1.name} partExercises={props.part1.exercises} />
  <Part partName={props.part2.name} partExercises={props.part2.exercises} />
  <Part partName={props.part3.name} partExercises={props.part3.exercises} />
  </>
  )
}
const Part = (props) => {
  return (
    <>
    <p>{props.partName} {props.partExercises}</p>
    </>
  )
}
const Total = (props) => {
  return (
    <>
    <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
    </>
  )
}

export default App