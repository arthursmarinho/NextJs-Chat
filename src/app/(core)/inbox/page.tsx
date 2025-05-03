import {InboxUsersList} from "./components/InboxUsersList";

const InboxPage = () => {
  return (
    <div className="flex size-full">
      <div className="flex-[1]">
        <InboxUsersList />
      </div>
      <div className="flex-[2]"></div>
    </div>
  );
};

export default InboxPage;
