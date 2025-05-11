import RegisterNowBtn from "@/atoms/RegisterNowBtn";

export default function LandingCallToAction() {
  return (
    <div className="text-sm md:text-base text-center flex flex-col items-center mb-20 md:mb-28">
      <h2 className="text-xl md:text-2xl font-bold mb-3">Get Started Today!</h2>
      <p className="text-gray-400 mb-8 md:mb-5 max-w-96 ">
        Join the growing community of professionals using AI to stay ahead of
        the competition. Sign up for a free trial now!
      </p>
      <RegisterNowBtn />
    </div>
  );
}
