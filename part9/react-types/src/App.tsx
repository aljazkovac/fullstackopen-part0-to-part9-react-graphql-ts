import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const App = () => {
  const header = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  return (
    <div>
      <Header header={header} />
      <Content content={courseParts} />
      <Total content={courseParts} />
    </div>
  );
};

export default App;
