import { Loader } from "lucide-react";

export const LoaderUI = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <Loader className="w-10 h-10 animate-spin" />
    </div>
  );
};
