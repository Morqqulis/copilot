export default function BackgroundBlur({ isHero }) {
  function BlurredShape({ className }) {
    return (
      <div className={`${className} absolute aspect-square rounded-full`}></div>
    );
  }

  return (
    <div className="flex absolute top-0 left-0 w-full h-full blur-[15rem] mix-blend-hard-light opacity-40 -z-10">
      <BlurredShape className="bg-cp-secondary-blue top-0 left-0 w-52" />
      <BlurredShape
        className={`bg-cp-secondary-blue bottom-0 md:top-0 right-0 w-44 opacity-80 ${
          isHero ? "hidden md:block" : ""
        }`}
      />
    </div>
  );
}
