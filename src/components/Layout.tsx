import { ReactNode } from "react";
import ArrowLeft from "../assets/arrow-left.png";

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => (
  <div className="w-full flex items-center justify-center">
    <div className="fixed top-6 left-6">
      <img
        className="cursor-pointer"
        width="36"
        src={ArrowLeft}
        alt="arrow-left"
        onClick={() => window.location.reload()}
      />
    </div>
    <div className="flex flex-col w-1/2">{children}</div>
  </div>
);
