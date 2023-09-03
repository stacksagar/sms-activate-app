import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import FIcon from "../FIcon";
import Link from "next/link";

interface Props {
  links: {
    title: string;
    icon?: IconProp;
    href?: string;
  }[];
}

export default function MuiBreadcrumbs({ links }: Props) {
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        {links.map((item) =>
          item?.href ? (
            <a
              key={item?.title}
              href={item?.href}
              className="flex items-center gap-1"
            >
              <FIcon icon={item?.icon || "link"} />
              {item?.title}
            </a>
          ) : (
            <Typography
              key={item.title}
              sx={{ display: "flex", alignItems: "center", gap: "1" }}
              color="text.primary"
            >
              <FIcon icon={item?.icon || "link"} />
              {item?.title}
            </Typography>
          )
        )}
      </Breadcrumbs>
    </div>
  );
}
