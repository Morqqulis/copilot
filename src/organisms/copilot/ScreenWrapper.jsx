import SidePanel from "@/organisms/copilot/SidePanel";
import NavCopilot from "@/organisms/copilot/NavCopilot";
import Link from "next/link";
import Image from "next/image";
import UtcClock from "@/atoms/UtcClock";
import logo from "@/assets/logo.svg";

export default function ScreenWrapper({ children }) {
  return (
    <>
      <aside className="bg-sidePanel p-5 rounded-md w-[min(30rem,50%)] h-full min-h-svh">
        <Link href="/">
          <Image
            className="mb-7 w-full cursor-pointer"
            src={logo}
            alt="logo"
            width={28}
            height={28}
          />
        </Link>

        <div className="mx-auto mb-5 w-full text-center">
          <UtcClock />
        </div>

        <SidePanel />
      </aside>
      <div className="flex flex-col w-full">
        <NavCopilot />
        {children}
      </div>
    </>
  );
}
