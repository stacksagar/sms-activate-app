import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
  ListItemText,
  Divider,
} from "@mui/material";
import Image from "next/image";

const methods = [
  {
    name: "Cryptomus",
    logo: "https://s3.cryptwerk.com/companies/cryptomus-com_6e683a07d101a6c2154c1295035c2548.jpg",
  },
  {
    name: "Coinbase",
    logo: "https://s3.cryptwerk.com/companies/cryptomus-com_6e683a07d101a6c2154c1295035c2548.jpg",
  },
  {
    name: "Paypal",
    logo: "https://s3.cryptwerk.com/companies/cryptomus-com_6e683a07d101a6c2154c1295035c2548.jpg",
  },
];

export default function AddBalance() {
  return (
    <div>
      <Typography variant="h6"> Choose Payment Option </Typography>

      <Divider />

      <List>
        {methods.map((method) => (
          <ListItem key={method.name} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Image
                  className="9"
                  width={40}
                  height={40}
                  src={method.logo}
                  alt=""
                />
              </ListItemIcon>
              <ListItemText primary={method.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
