import Image from "next/image";
import logo from "@/assets/logo.svg";
import BackgroundBlur from "@/atoms/BackgroundBlur";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/16/solid";

export default function ErrorWrapper({
  title,
  description,
  buttonText,
  buttonLink,
  imgSrc,
}) {
  return (
    <div className="mx-auto w-[min(90%,60rem)] text-center isolate relative flex flex-col justify-end items-center py-7 px-7 text-sm md:text-base mb-16 md:mb-24">
      <Image
        className="w-[100%,45rem]"
        src={imgSrc}
        alt="logo"
        width={300}
        height={170}
      />
      <h1 className="text-lg md:text-3xl font-bold mb-1 md:mb-3">{title}</h1>
      <p className="text-gray-300 text-sm md:text-base mb-6">{description}</p>
      <Link
        href={buttonLink}
        className="w-auto flex items-center gap-2 bg-transparent border border-white hover:border-slate-200 text-white px-6 py-2 rounded-full font-normal whitespace-nowrap"
      >
        {buttonText} <ArrowRightIcon width={15} />
      </Link>
      <BackgroundBlur isHero={true} />
    </div>
  );
}
