import "./App.css";

interface HeaderProps {
  header: string;
}

const Welcome = (props: HeaderProps) => {
  return <h1>{props.header}</h1>;
};

export default Welcome;
