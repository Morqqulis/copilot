import logo from "@/assets/logo.svg"
import UtcClock from "@/atoms/UtcClock"
import NavCopilot from "@/organisms/copilot/NavCopilot"
import SidePanel from "@/organisms/copilot/SidePanel"
import Image from "next/image"
import Link from "next/link"

export default function ScreenWrapper({ children }) {
  return (
    <>
      <aside className="top-0 sticky flex flex-col self-start bg-sidePanel p-5 rounded-md w-[min(30rem,50%)] h-full min-h-[100vh] overflow-y-auto">
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
