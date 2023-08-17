import ClientHeader from "@/components/client/header/ClientHeader";
import React from "react";
import {Button} from '@mui/material'
export default function Server() {
  return (
    <div>
      <ClientHeader />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui error
      corporis unde consequuntur incidunt? Quasi consequuntur eos temporibus ut
      eligendi asperiores corporis molestiae esse, aliquid pariatur. Distinctio
      beatae dolor perferendis!
      <Button variant="contained" color="primary">Submit</Button>
    </div>
  );
}
