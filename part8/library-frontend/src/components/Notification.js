const Notification = (props) => {
  if (!props.error) {
    return null;
  }
  return <div style={{ color: "red" }}>{props.error}</div>;
};

export default Notification;
