import {useSearchParams} from "next/navigation";
import {useEffect} from "react";

export const InboxChat = () => {
  const searchParams = useSearchParams();
  const chatId = searchParams.get("chatId");

  useEffect(() => {}, []);

  return (
    <div className="size-full rounded-lg bg-slate-100">Chat ID: {chatId}</div>
  );
};

const InboxInput = () => {};
