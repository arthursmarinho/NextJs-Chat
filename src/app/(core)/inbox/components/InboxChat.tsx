import {apiClient} from "@/lib/shared/constants/ApiClient.gen";
import {ChatModel} from "@/lib/shared/models/Chat.model";
import {MessageModel} from "@/lib/shared/models/Message.model";
import {useAuthentication} from "@/lib/ui/hooks/firebase/useAuthentication";
import clsx from "clsx";
import {useSearchParams} from "next/navigation";
import {useCallback, useEffect, useRef, useState} from "react";

export const InboxChat = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("withUserId");
  const [chat, setChat] = useState<ChatModel>();
  const {getCurrentUser} = useAuthentication();
  const me = getCurrentUser();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const fetchChat = useCallback(async () => {
    if (!userId) return;

    const response = (await apiClient.ChatService.getChatWithUser({
      params: {id: userId},
    })) as ChatModel;

    setChat(response);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchChat();
    }, 1500);

    return () => clearInterval(intervalId);
  }, [userId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chat?.messages]);

  const handleSendMessage = async (message: string) => {
    if (!chat || !me) return;

    apiClient.MessageService.createMessage({
      body: {
        chatId: chat.id,
        message,
        timestamp: new Date().getTime(),
        user: me.uid,
      },
    }).then(() => fetchChat());
  };

  if (!chat) return null;

  return (
    <div className="flex size-full flex-col rounded-lg bg-slate-100">
      <div
        className="flex w-full flex-1 flex-col overflow-auto p-4"
        ref={chatContainerRef}
      >
        {chat.messages.map((message) => (
          <InboxMessage
            key={message.id}
            message={message}
            mine={me?.uid === message.sender}
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
    <div
      className={clsx(
        "mb-4 flex w-64 flex-col rounded-lg bg-white px-2 py-1",
        mine && "self-end"
      )}
    >
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
        {new Date(message.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
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
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        type="text"
        value={message}
      />
      <button onClick={handleSend}>Enviar</button>
    </div>
  );
};
