import BackgroundBlur from "@/atoms/BackgroundBlur";
import {
  ChartBarIcon,
  CircleStackIcon,
  FlagIcon,
} from "@heroicons/react/16/solid";

export default function LandingFeatures() {
  const featuresData = [
    {
      title: "Instant Content Production",
      description:
        "Generate accurate, up-to-date talk breaks, news, weather, and traffic reports in seconds with AI-crafted segments.",
      link: "#",
      Icon: FlagIcon,
    },
    {
      title: "Effortless Voice Tracking",
      description:
        "Perfect your show with AI-driven voice tracking that syncs seamlessly with your schedule and style.",
      link: "#",
      Icon: ChartBarIcon,
    },
    {
      title: "Caller Engagement Made Easy",
      description:
        "Produce engaging caller segments without the wait – AI handles call intros, outros, and voice customization.",
      link: "#",
      Icon: CircleStackIcon,
    },
  ];

  return (
    <div className="isolate relative text-sm md:text-base text-center mb-20 md:mb-28">
      <h2 className="text-xl md:text-2xl font-bold mb-3">
        Revolutionize Radio with AI-Powered Precision
      </h2>
      <p className="text-gray-400 mb-8 max-w-96 mx-auto">
        Bring more creativity, less hassle. Let Radio Co-Pilot handle the
        routine, so you can focus on the airwaves.
      </p>
      <ul className="text-left flex flex-col md:flex-row gap-5">
        {featuresData.map(({ title, description, link, Icon }) => {
          return (
            <li key={title} className="flex flex-col items-start">
              <div className="p-2 bg-transparent border-2 border-red-500 rounded-lg mb-3">
                <Icon color="white" width={20} />
              </div>
              <h4 className="text-lg font-semibold">{title}</h4>
              <p className="font-light mb-2">{description}</p>
            </li>
          );
        })}
      </ul>
      <BackgroundBlur />
    </div>
  );
}
