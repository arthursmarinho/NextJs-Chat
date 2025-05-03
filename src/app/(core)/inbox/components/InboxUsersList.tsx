"use client";

import {apiClient} from "@/lib/shared/constants/ApiClient.gen";
import {UserModel} from "@/lib/shared/models/User.model";
import {useAuthentication} from "@/lib/ui/hooks/firebase/useAuthentication";
import Image from "next/image";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";

export const InboxUsersList = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [users, setUsers] = useState<UserModel[]>([]);
  const {getCurrentUser} = useAuthentication();
  const me = getCurrentUser();

  useEffect(() => {
    const fetchUsers = async () => {
      let response: UserModel[] =
        (await apiClient.UserService.getAllUsers()) as UserModel[];

      if (me) response = response.filter((user) => user.email !== me.email);

      setUsers(response);
    };

    fetchUsers();
  }, [me]);

  const handleConversationClick = async (userId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("withUserId", userId);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="w-full flex-1">
      <p className="mb-6 font-semibold text-gray-500">Contatos</p>
      <div className="flex flex-col gap-4">
        {users.map((user) => (
          <InboxUsersListItem
            key={user.email}
            onClick={() => handleConversationClick(user.id)}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

interface InboxUsersListItemProps {
  onClick: () => void;
  user: UserModel;
}

export const InboxUsersListItem = ({
  onClick,
  user,
}: InboxUsersListItemProps) => {
  return (
    <button
      className="flex h-20 w-full cursor-pointer items-center gap-6 rounded-md px-4 hover:bg-gray-50"
      onClick={onClick}
    >
      <div className="relative size-10 rounded-full">
        <Image
          alt={user.email}
          className="rounded-full"
          fill
          src={user.photoUrl}
        />
      </div>
      <div className="flex flex-col justify-center font-medium">
        <span>{user.name}</span>
      </div>
    </button>
  );
};
