const Total = (props) => {
  const { courseParts } = props
  const total = courseParts.reduce((sum, part) =>
    sum + part.exercises, 0)
  return (
    <>
    <p>Number of exercises: {total}</p>
    </>
  )
}

export default Total