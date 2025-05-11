import Image from "next/image";

export default function EmailForm({ providerOptionsData }) {
  return (
    <div className="text-sm md:text-base flex flex-col gap-3 items-center justify-center w-full">
      {providerOptionsData.map((op) => {
        return (
          <button
            key={op.provider}
            onClick={op.onSelectHandle}
            className="flex justify-center text-center items-center gap-2 rounded-sm border border-gray-800 hover:border-gray-700 px-3 py-2 w-full"
          >
            <Image width={25} height={25} src={op.icon} alt={op.provider} />
            Sign in with {op.provider}
          </button>
        );
      })}
    </div>
  );
}
