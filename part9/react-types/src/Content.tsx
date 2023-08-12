import { CoursePart } from "./types";
import Part from "./Part";

export interface ContentProps {
  content: CoursePart[];
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.content.map((part, index) => (
        <Part key={index} {...part} />
      ))}
    </div>
  );
};

export default Content;
