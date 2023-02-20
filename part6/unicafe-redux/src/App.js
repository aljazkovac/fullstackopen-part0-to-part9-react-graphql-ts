import Button from "./Button"
import Votes from "./Votes.js"

const App = () => {
  return (
    <div>
      <h2>Voting</h2>
      <Button type={'GOOD'} />
      <Button type={'OK'} />
      <Button type={'BAD'} />
      <Button type={'RESET'} />
      <Votes />
    </div>
  )
}

export default App