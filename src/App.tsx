import { useState, useEffect } from "react";
import { Stepper } from "@app/components/Stepper";
import { One, Two, Three } from "@app/components/steps";
import type { Data } from "@app/components/steps";

export const App = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [highestStep, setHighestStep] = useState(1);

  // used to go back and fourth the steps
  useEffect(() => {
    setHighestStep(Math.max(activeStep, highestStep));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep]);

  const [userData, setUserData] = useState<Data>({
    name: null,
    email: null,
    number: null,
    address: null,
    cvv: null,
    cardNumber: null,
    expiryDate: null,
  });

  const handleData = (data: Partial<Data>) => {
    setActiveStep((prev) => prev + 1);
    setUserData({
      ...userData,
      ...data,
    });
  };

  return (
    <article className="flex justify-center items-center h-screen bg-[#FFD598] sm:px-[100px] md:px-[200px] lg:px-[400px] ">
      <div className="bg-white w-full text-black p-4  shadow-md rounded-md">
        <Stepper
          activeStep={activeStep}
          setStep={setActiveStep}
          highestStep={highestStep}
        />
        <h2 className="mt-4">Payments</h2>
        <div className="mt-5">
          {activeStep === 1 && <One handleData={handleData} />}
          {activeStep === 2 && <Two handleData={handleData} />}
          {activeStep === 3 && <Three />}
        </div>
      </div>
    </article>
  );
};
