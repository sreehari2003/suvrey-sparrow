import { cn } from "@app/utils/cn";
import { Success } from "./icons";

interface StepperProps {
  activeStep: number;
  setStep: React.Dispatch<number>;
  highestStep: number;
}

export const Stepper = ({ activeStep, setStep, highestStep }: StepperProps) => {
  const goToStep = (index: number) => {
    if (activeStep === 3) return;

    if (index > highestStep) return;
    setStep(index);
  };

  return (
    <div className="flex">
      <ol className="flex items-center w-full">
        <li
          className={cn(
            "flex w-full items-center justify-center after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block ",
            activeStep > 1 ? "after:border-blue-800" : "after:border-gray-700"
          )}
          onClick={() => goToStep(1)}
        >
          <span
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 hover:cursor-pointer",
              activeStep > 1 ? "bg-blue-800" : "bg-gray-700"
            )}
          >
            {activeStep > 1 ? (
              <svg
                className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-blue-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <Success />
              </svg>
            ) : (
              <span className="text-md text-white">1</span>
            )}
          </span>
        </li>
        <li
          className={cn(
            "flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block  hover:cursor-pointer",
            activeStep > 2 ? "after:border-blue-800" : "after:border-gray-700"
          )}
          onClick={() => goToStep(2)}
        >
          <span
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 hover:cursor-pointer",
              activeStep > 2 ? "bg-blue-800" : "bg-gray-700"
            )}
          >
            {activeStep > 2 ? (
              <svg
                className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-blue-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <Success />
              </svg>
            ) : (
              <span className="text-md text-white">2</span>
            )}
          </span>
        </li>
        <li
          className="flex items-center justify-end hover:cursor-pointer"
          onClick={() => goToStep(3)}
        >
          <span
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 hover:cursor-pointer",
              activeStep > 2 ? "bg-blue-800" : "bg-gray-700"
            )}
          >
            {activeStep > 2 ? (
              <svg
                className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-blue-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <Success />
              </svg>
            ) : (
              <span className="text-md text-white">3</span>
            )}
          </span>
        </li>
      </ol>
    </div>
  );
};
