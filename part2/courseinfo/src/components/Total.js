const Total = (props) => {
  const total = props.courseParts.reduce(function(sum, part) {
    return sum + part.exercises
  }, 0)
  return (
    <>
    <p>Number of exercises: {total}</p>
    </>
  )
}

export default Total