import Image from "next/image";

export const Loader = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 relative animate-spin">
          <Image alt="logo" fill src={'/logo.png'} />
        </div>
        <p className="text-sm foreground ml-2">
          Genius is thinking...
        </p>
      </div>
    </div>
  );
};