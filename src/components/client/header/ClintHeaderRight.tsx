import MuiButton from "@/common/MaterialUi/MuiButton";
import TogglerOptions from "@/common/MaterialUi/TogglerOptions";
import { signOut } from "next-auth/react";
import React from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthProvider";
import { Skeleton } from "@mui/material";
import unkown_person from "@/data/unkown_person";
import { useSetting } from "@/context/SettingProvider";
import FIcon from "@/common/FIcon";

export default function ClientHeaderRight() {
  const { setting } = useSetting();
  const { loading, fetched, setLoading, user } = useAuth();

  function signOutHandle() {
    setLoading(true);
    signOut().finally(() => {
      setLoading(false);
    });
  }

  if (!fetched)
    return (
      <div className="w-[130px] flex items-center gap-2">
        <Skeleton height={50} width={50} />
        <div className="w-full">
          <Skeleton height={20} width="100%" />
          <Skeleton height={14} width="100%" />
        </div>
      </div>
    );

  return user?.email ? (
    <TogglerOptions
      size="small"
      title={
        <div className="flex items-center gap-2 sm:gap-4 py-0.5">
          <Image
            src={user?.image || unkown_person}
            width={30}
            height={30}
            className="rounded"
            alt=""
          />

          <div className="flex flex-col gap-0 leading-5 items-start">
            <span className="block max-w-[80px] sm:max-w-[120px] truncate font-medium">
              {user?.name}
            </span>
            <div className="flex items-center gap-1">
              <span className="text-orange-600 dark:text-orange-300 text-xs">
                {setting?.public?.currency} {user?.balance?.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      }
      items={[
        {
          text: "Profile",
          href: "/profile",
          icon: "user",
        },
        {
          text: "Wallet",
          href: "/profile/wallet",
          icon: "money-bill",
        },
        {
          text: "Add Balance",
          href: "/profile/add-balance",
          icon: "money-bill-transfer",
        },

        {
          text: "Servicecs",
          href: "/services",
          icon: "list",
        },

        {
          text: "Admin",
          href: "/admin",
          icon: "user-gear",
          hidden: user?.role !== "admin",
          blank: true,
        },
        {
          text: "Change Password",
          href: "/profile/change-password",
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
  ) : (
    <>
      <a href="/auth/signin" className="w-fit">
        <MuiButton size="medium">
          <FIcon icon="lock" /> Login
        </MuiButton>
      </a>

      <a href="/auth/signup" className="w-fit">
        <MuiButton size="medium" color="info">
          <FIcon icon="user" /> Signup
        </MuiButton>
      </a>
    </>
  );
}
