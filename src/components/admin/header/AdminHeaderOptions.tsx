import FIcon from "@/common/FIcon";
import TogglerOptions from "@/common/MaterialUi/TogglerOptions";
import { useAuth } from "@/context/AuthProvider";
import { Skeleton } from "@mui/material";
import { signOut } from "next-auth/react";
import Image from "next/image";

export default function AdminHeaderOptions() {
  const { fetched, loading, user, setLoading, api_balance } = useAuth();

  function signOutHandle() {
    setLoading(true);
    signOut().finally(() => {
      setLoading(false);
    });
  }

  return (
    <TogglerOptions
      size="small"
      title={
        !fetched ? (
          <div className="w-[130px] flex items-center gap-2">
            <Skeleton height={40} width={40} />
            <div className="w-full">
              <Skeleton height={20} width="100%" />
              <Skeleton height={14} width="100%" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-4">
            {user?.image ? (
              <Image
                src={user?.image || "/"}
                width={30}
                height={30}
                className="rounded"
                alt=""
              />
            ) : (
              <div className="border dark:border-gray-600 p-1 rounded w-8 h-8">
                <FIcon icon="user" />
              </div>
            )}
            <div className="flex flex-col gap-0 leading-4 justify-center items-start">
              <span className="block max-w-[120px] truncate">{user?.name}</span>
              <div className="flex items-center gap-1">
                <span className="text-orange-600 dark:text-orange-300 font-semibold text-sm">
                  ₽ {api_balance?.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )
      }
      items={[
        {
          text: "Services",
          href: "/services",
          icon: "list",
        },
        {
          text: "Profile",
          href: "/profile",
          icon: "user",
        },
        {
          text: "Change Password",
          href: "change-password",
          icon: "lock",
        },
        {
          text: "Logout",
          icon: "sign-out",
          button: {
            onClick: signOutHandle,
          },
          loading,
        },
      ]}
    />
  );
}
