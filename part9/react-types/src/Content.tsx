export interface ContentProps {
  content: { name: string; exerciseCount: number }[];
}

const Content = (props: ContentProps) => {
  return (
    <div>
      <p>
        {props.content[0].name} {props.content[0].exerciseCount}
      </p>
      <p>
        {props.content[1].name} {props.content[1].exerciseCount}
      </p>
      <p>
        {props.content[2].name} {props.content[2].exerciseCount}
      </p>
    </div>
  );
};

export default Content;
