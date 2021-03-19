import { useState } from "react";
import styles from "./MessageInput.module.scss";
import { useUpdateMessage } from "hooks/useData";

const MessageInput = ({ channel }) => {
  const [message, setMessage] = useState("");
  const { mutate } = useUpdateMessage();
  function onSubmit() {
    mutate({
      id: channel,
      message: message,
    });
    setMessage("");
  }
  return (
    <div className={styles.inputcontainer}>
      <textarea
        className={styles.inputbox}
        rows={10}
        placeholder='Enter Awesome Message'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={() => onSubmit()}>Submit</button>
    </div>
  );
};

export default MessageInput;
