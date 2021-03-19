import { useMessages } from "hooks/useData";
import MessageInput from "components/MessageInput";
import styles from "./Messages.module.scss";

const Messages = ({ match }) => {
  const { isLoading, data } = useMessages(match.params.id);
  return (
    !isLoading &&
    data && (
      <div>
        <h1 className={styles.title}>{data.title} Messages</h1>
        <div>
          {data.messages.map((item, i) => {
            return (
              <div className={styles.message} key={i}>
                {item.message}
              </div>
            );
          })}
        </div>
        <MessageInput channel={data.id} />
      </div>
    )
  );
};

export default Messages;
