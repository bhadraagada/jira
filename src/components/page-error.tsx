import { AlertTriangleIcon } from "lucide-react";

interface PageErrorProps {
  message: string;
}

export const PageError = ({
  message = "Something went worng",
}: PageErrorProps) => {
  return (
    <div className="flex items-center flex-col justify-center h-full">
      <AlertTriangleIcon className="size-6 text-muted-foreground mb-2" />
      <p className="text-center text-sm font-semibold text-muted-foreground">
        {message}
      </p>
    </div>
  );
};
