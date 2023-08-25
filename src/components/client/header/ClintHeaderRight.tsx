import MuiButton from "@/common/MaterialUi/MuiButton";
import TogglerOptions from "@/common/MaterialUi/TogglerOptions";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthProvider";
import { Skeleton, IconButton } from "@mui/material";
import FIcon from "@/common/FIcon";
import unkown_person from "@/data/unkown_person";

export default function ClientHeaderRight() {
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
      title={
        <div className="flex items-center gap-2 sm:gap-4">
          <Image
            src={user?.image || unkown_person}
            width={35}
            height={35}
            className="rounded"
            alt=""
          />

          <div className="flex flex-col gap-0 leading-5 items-start">
            <span className="block max-w-[80px] sm:max-w-[120px] truncate">
              {user?.name}
            </span>
            <div className="flex items-center gap-1">
              <small className="text-orange-600 dark:text-orange-300 font-medium">
                ৳ {user?.balance?.toFixed(2)}
              </small>
              <Link href="/add-balance">
                <FIcon icon="plus" className="text-xs" />
              </Link>
            </div>
          </div>
        </div>
      }
      items={[
        {
          text: "Dashboard",
          href: "/dashboard",
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
          text: "Admin",
          href: "/admin",
          icon: "user-gear",
          hidden: user?.role !== "admin",
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
      <Link href="/auth/signup" className="w-fit">
        <MuiButton size="medium" color="info">
          Signup
        </MuiButton>
      </Link>
      <Link href="/auth/signin" className="w-fit">
        <MuiButton size="medium">Signin</MuiButton>
      </Link>
    </>
  );
}
