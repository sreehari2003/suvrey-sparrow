import React, { useState } from "react";
import { Input } from "@app/components/Input";
import { StepProps } from ".";

export const One = ({ handleData }: StepProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
  });

  const [errors, setErrors] = useState({
    nameError: false,
    emailError: false,
    numberError: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors = {
      nameError: !formData.name,
      emailError: !formData.email,
      numberError: !formData.number,
    };
    setErrors(newErrors);

    // Proceed if no errors
    if (
      !newErrors.nameError &&
      !newErrors.emailError &&
      !newErrors.numberError
    ) {
      handleData(formData);
    }
  };

  return (
    <form onSubmit={handleNext}>
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Name</label>
        <Input
          id="name"
          value={formData.name}
          onChange={handleChange}
          isError={errors.nameError}
          name="name"
        />
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          isError={errors.emailError}
          name="email"
        />
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <label htmlFor="number">Mobile Number</label>
        <Input
          id="number"
          type="number"
          value={formData.number}
          onChange={handleChange}
          isError={errors.numberError}
          name="number"
        />
      </div>
      <div className="mt-4">
        <button
          className="px-4 py-2 inline-flex justify-center items-center bg-blue-500 rounded-md text-white w-full"
          type="submit"
        >
          Next
        </button>
      </div>
    </form>
  );
};
