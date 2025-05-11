"use client";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import BackgroundBlur from "@/atoms/BackgroundBlur";
import RegisterNowBtn from "@/atoms/RegisterNowBtn";

export default function LandingHero() {
  return (
    <div className="isolate relative flex flex-col justify-end items-center py-7 px-7 text-sm md:text-base mb-16 md:mb-24">
      <Image
        className="mb-8 md:mb-10 w-80 md:w-[28rem]"
        src={logo}
        alt="logo"
        width={300}
        height={170}
      />
      <RegisterNowBtn />
      <BackgroundBlur isHero={true} />
    </div>
  );
}
