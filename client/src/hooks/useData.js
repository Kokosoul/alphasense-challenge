import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 *
 * @returns list of channels
 */
export function useChannels() {
  return useQuery(
    "channels",
    () => {
      return api.get("/channels").then((res) => res.data);
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );
}

/**
 *
 * @param {string} id
 * @returns channel
 */

export function useMessages(id) {
  return useQuery(
    ["messages", id],
    () => {
      return api.get(`/channels/${id}`).then((res) => res.data);
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      enabled: true,
    }
  );
}

function updateMessage({ id, message }) {
  return api.put(`/${id}`, { message }).then((res) => res.data);
}

export function useUpdateMessage() {
  const queryClient = useQueryClient();

  return useMutation(updateMessage, {
    onMutate: ({ id, message }) => {
      // This will update the channel message optimistically
      queryClient.setQueryData(["messages", id], (old) => {
        return {
          id: old.id,
          title: old.title,
          messages: [...old.messages, { message }],
        };
      });
    },
    throwOnError: true,
  });
}
