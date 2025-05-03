import {apiClient} from "@/lib/shared/constants/ApiClient.gen";
import {ChatModel} from "@/lib/shared/models/Chat.model";
import {MessageModel} from "@/lib/shared/models/Message.model";
import {useAuthentication} from "@/lib/ui/hooks/firebase/useAuthentication";
import clsx from "clsx";
import {useSearchParams} from "next/navigation";
import {useCallback, useEffect, useState} from "react";

export const InboxChat = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("withUserId");
  const [chat, setChat] = useState<ChatModel>();
  const {getCurrentUser} = useAuthentication();
  const me = getCurrentUser();

  const fetchChat = useCallback(async () => {
    if (!userId) return;

    const response = (await apiClient.ChatService.getChatWithUser({
      params: {id: userId},
    })) as ChatModel;

    setChat(response);
  }, []);

  useEffect(() => {
    fetchChat();
  }, [userId]);

  const handleSendMessage = async (message: string) => {
    if (!chat || !me) return;

    await apiClient.MessageService.createMessage({
      body: {
        chatId: chat.id,
        message,
        timestamp: new Date().getTime(),
        user: me.uid,
      },
    });

    await fetchChat();
  };

  if (!chat) return null;

  return (
    <div className="flex size-full flex-col rounded-lg bg-slate-100">
      <div className="flex-1 p-4">
        {chat.messages.map((message) => (
          <InboxMessage
            key={message.id}
            message={message}
            mine={me?.uid === message.senderId}
          />
        ))}
      </div>
      <InboxInput onSend={handleSendMessage} />
    </div>
  );
};

interface InboxMessageProps {
  message: MessageModel;
  mine: boolean;
}

const InboxMessage = ({message, mine}: InboxMessageProps) => {
  return (
    <div className="mb-4 flex w-64 flex-col rounded-lg bg-white px-2 py-1">
      <span
        className={clsx(
          "mb-2 text-xs font-semibold",
          mine ? " text-blue-800" : " text-green-800"
        )}
      >
        {mine ? "Você" : "O outro desgraçado"}
      </span>
      <span>{message.content}</span>
      <span className="text-right text-xs font-medium">
        {new Date(message.timestamp).toLocaleDateString()}
      </span>
    </div>
  );
};

interface InboxInputProps {
  onSend: (message: string) => void;
}

const InboxInput = ({onSend}: InboxInputProps) => {
  const [message, setMessage] = useState<string>("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <div className="flex gap-2 px-4 py-2">
      <input
        className="flex-1"
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        value={message}
      />
      <button onClick={handleSend}>Enviar</button>
    </div>
  );
};
