"use client";
import {apiClient} from "@/lib/shared/constants/ApiClient.gen";
import {UserModel} from "@/lib/shared/models/User.model";
import Image from "next/image";
import {useEffect, useState} from "react";

export const CoreHeader = () => {
  const [user, setUser] = useState<UserModel>();

  useEffect(() => {
    const fetch = async () => {
      const response: UserModel =
        (await apiClient.UserService.getUser()) as UserModel;

      setUser(response);
    };

    fetch();
  }, []);

  if (!user) return <span>Loading</span>;

  return (
    <header className="flex h-17 flex-1 items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
      <div />
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-4">
          <div className="text-sm">
            <p className="text-right font-medium">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
          <div className="relative size-8 overflow-hidden rounded-full">
            <Image
              alt="User avatar"
              className="size-full object-cover"
              data-nimg="1"
              height="32"
              src={user.photoUrl}
              width="32"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
