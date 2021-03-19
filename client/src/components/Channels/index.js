import { useChannels } from "hooks/useData";
import { Link } from "react-router-dom";
import styles from "./Channels.module.scss";

const Channels = () => {
  const { isLoading, data } = useChannels();
  return (
    !isLoading &&
    data && (
      <div>
        {data.map((channel) => {
          return (
            <div className={styles.card} key={channel.id}>
              <Link to={`/channels/${channel.id}`}>{channel.title}</Link>
            </div>
          );
        })}
      </div>
    )
  );
};

export default Channels;
