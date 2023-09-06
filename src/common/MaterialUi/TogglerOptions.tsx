import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FIcon from "@/common/FIcon";
import { uid } from "uid";
import useString from "@/hooks/state/useString";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
import CircleSpinner from "./CircleSpinner";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

type Item = {
  text: string;
  icon?: IconProp;
  href?: string;
  loading?: boolean;
  button?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  hidden?: boolean;
  blank?: boolean;
};

interface Props {
  title: React.ReactNode | string;
  items: Item[];
  size?: "small" | "medium" | "large";
}

export default function TogglerOptions({ title, items, size }: Props) {
  const buttonID = useString(uid().toString());
  const menuID = useString(uid().toString());
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id={buttonID.value}
        aria-controls={open ? menuID.value : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="outlined"
        disableElevation
        onClick={handleClick}
        size={size || "medium"}
      >
        {title}

        <div className="pl-4">
          {open ? <FIcon icon="chevron-up" /> : <FIcon icon="chevron-down" />}
        </div>
      </Button>
      <StyledMenu
        id={menuID.value}
        MenuListProps={{
          "aria-labelledby": buttonID.value,
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {items?.map((item) =>
          item.href ? (
            item?.hidden ? null : (
              <a
                key={item.text}
                href={item.href}
                target={item?.blank ? "_blank" : "_self"}
              >
                <MenuItem>
                  <button {...item.button}>
                    <span className="text-left w-8 inline-block">
                      <FIcon icon={item.icon || "circle-notch"} />
                    </span>
                    <span>{item.text}</span>
                  </button>
                  {item?.loading ? <CircleSpinner /> : null}
                </MenuItem>
              </a>
            )
          ) : item?.hidden ? null : (
            <MenuItem key={item.text}>
              <button {...item.button}>
                <span className="text-left w-8 inline-block">
                  <FIcon icon={item.icon || "circle-notch"} />
                </span>
                <span>{item.text}</span>
              </button>
              {item?.loading ? <CircleSpinner /> : null}
            </MenuItem>
          )
        )}
      </StyledMenu>
    </div>
  );
}
