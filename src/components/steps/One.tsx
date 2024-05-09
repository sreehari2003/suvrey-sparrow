import React, { useState } from "react";
import { Input } from "@app/components/Input";
import { StepProps } from ".";

interface FormError {
  emailError: boolean;
  numberError: boolean;
}

export const One = ({ handleData, data }: StepProps) => {
  const [formData, setFormData] = useState({
    name: data?.name || "",
    email: data?.email || "",
    number: data?.number || "",
    address: data?.address || "",
  });

  const [errors, setErrors] = useState<FormError>({
    emailError: false,
    numberError: false,
  });

  const handleChange = <T extends HTMLInputElement | HTMLTextAreaElement>(
    e: React.ChangeEvent<T>
  ) => {
    const formToError = new Map<string, keyof FormError>();
    formToError.set("email", "emailError");
    formToError.set("number", "numberError");

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const key = formToError.get(name);

    if (key) {
      setErrors({
        ...errors,
        [key]: false,
      });
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: FormError = {
      emailError: !formData.email,
      numberError: !formData.number,
    };
    setErrors(newErrors);

    // Proceed if no errors
    if (!newErrors.emailError && !newErrors.numberError) {
      handleData(formData);
    }
  };

  return (
    <form onSubmit={handleNext}>
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Name</label>
        <Input
          id="name"
          value={formData.name || data?.name || ""}
          onChange={handleChange}
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
      <div className="flex flex-col gap-2 mt-2">
        <label htmlFor="address">Address</label>
        <textarea
          id="address"
          onChangeCapture={handleChange}
          name="address"
          rows={4}
          cols={40}
          className="ring-1 ring-blue-100 rounded-sm p-2"
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
