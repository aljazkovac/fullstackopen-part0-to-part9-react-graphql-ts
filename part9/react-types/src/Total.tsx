import { ContentProps } from "./Content";

const Total = (props: ContentProps) => {
  return (
    <div>
      <p className="title">
        Total number of exercises{" "}
        {props.content.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};

export default Total;
