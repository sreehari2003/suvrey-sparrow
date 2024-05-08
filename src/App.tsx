import { Stepper } from "@app/components/Stepper";
import { Input } from "@app/components/Input";
import { useState } from "react";

export const App = () => {
  const [activeStep, setActiveStep] = useState(1);
  return (
    <article className="flex justify-center items-center h-screen bg-[#FFD598] lg:px-[450px] md:px-[200px] shadow-md">
      <div className="h-[80%] bg-white w-full text-black p-4">
        <Stepper activeStep={activeStep} />
        <h2 className="mt-4">Payments</h2>
        <div className="mt-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <Input id="name" isError />
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <label htmlFor="email">Email</label>
            <Input id="email" type="email" />
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <label htmlFor="number">Mobile Number</label>
            <Input id="number" type="number" />
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <label htmlFor="name">Name</label>
            <Input id="name" />
          </div>
        </div>
      </div>
    </article>
  );
};
