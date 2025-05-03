import {apiClient} from "@/lib/shared/constants/ApiClient.gen";
import {UserModel} from "@/lib/shared/models/User.model";
import Image from "next/image";
import {useEffect, useState} from "react";

export const InboxMe = () => {
  const [me, setMe] = useState<UserModel>();

  useEffect(() => {
    const fetchMe = async () => {
      const response = await apiClient.UserService.getMe();

      setMe(response as UserModel);
    };

    fetchMe();
  }, []);

  if (!me) return null;

  return (
    <div className="flex h-60 w-full flex-col items-center justify-center gap-8">
      <div className="relative size-24">
        <Image
          alt={me.name}
          className="size-16 rounded-full"
          fill
          src={me.photoUrl}
        />
      </div>
      <p className="text-xl font-medium text-gray-700">{me.name}</p>
    </div>
  );
};
