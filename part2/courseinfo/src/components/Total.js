const Total = (props) => {
  const { courseParts } = props
  const total = courseParts.reduce((sum, part) =>
    sum + part.exercises, 0)
  return (
    <>
    <b>Number of exercises: {total}</b>
    </>
  )
}

export default Total