import { signOut, useSession } from "next-auth/react";
import { Button } from "@mui/material";

export default function HeaderAuth() {
  const { data } = useSession();

  return (
    <div className="flex items-center gap-2">
      <Button variant="outlined">
        <div className="flex flex-col items-start gap-0 leading-4">
          <span className="block max-w-[100px] truncate">
            {data?.user?.name}
          </span>
          <small>
            {data?.user?.email === "bangladeshisoftware@gmail.com" ? 2505 : 0} ৳
          </small>
        </div>
      </Button>
      <Button variant="contained" color="warning" onClick={() => signOut()}>
        {" "}
        Logout{" "}
      </Button>
    </div>
  );
}
