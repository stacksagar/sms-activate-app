import { ReactNode } from "react";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  text?: string;
}

export default function ButtonWithoutBG({ children, text, ...props }: Props) {
  return (
    <button
      {...props}
      className={`transform hover:scale-[1.02] transition-all font-medium tracking-wider hover:underline ${props.className}`}
    >
      {children} {text}
    </button>
  );
}
