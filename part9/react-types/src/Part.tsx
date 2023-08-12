import { CoursePart } from "./types";
import "./App.css";

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props: CoursePart) => {
  switch (props.kind) {
    case "basic":
      return (
        <div>
          <p className="title">
            {props.name} {props.exerciseCount}
          </p>
          <p>{props.description}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <p className="title">
            {props.name} {props.exerciseCount}
          </p>
          <p>project exercises {props.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <p className="title">
            {props.name} {props.exerciseCount}
          </p>
          <p>{props.description}</p>
          <p>
            <a href={props.backgroundMaterial}>Background material</a>
          </p>
        </div>
      );
    case "requirement":
      return (
        <div>
          <p className="title">
            {props.name} {props.exerciseCount}
          </p>
          <p>{props.description}</p>
          <p>
            required skills:
            {props.requirements.map((requirement) => (
              <span key={requirement}>{requirement} </span>
            ))}
          </p>
        </div>
      );
    default:
      return assertNever(props);
  }
};

export default Part;
