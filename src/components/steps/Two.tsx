import React, { useState } from "react";
import { Input } from "@app/components/Input";
import { StepProps } from ".";

interface FormError {
  cardError: boolean;
  cvvError: boolean;
  expiryError: boolean;
}

export const Two = ({ handleData, setData, activeStep, data }: StepProps) => {
  const [formData, setFormData] = useState({
    cardNumber: data?.cardNumber || "",
    cvv: data?.cvv || "",
    expiryDate: data?.expiryDate || "",
  });

  const handlePrevious = () => {
    if (activeStep === 1) return;
    setData!(activeStep! - 1);
  };

  const [errors, setErrors] = useState({
    cardError: false,
    cvvError: false,
    expiryError: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formToError = new Map<string, keyof FormError>();
    formToError.set("cardNumber", "cardError");
    formToError.set("cvv", "cvvError");
    formToError.set("expiryDate", "expiryError");

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const key = formToError.get(name);

    // This is done for real time form validation
    setErrors({
      ...errors,
      [key!]: false,
    });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors = {
      cardError: !formData.cardNumber,
      cvvError: !formData.cvv,
      expiryError: !formData.expiryDate,
    };
    setErrors(newErrors);

    // Proceed if no errors
    if (!newErrors.cardError && !newErrors.cvvError && !newErrors.expiryError) {
      handleData({
        cardNumber: formData.cardNumber,
        cvv: formData.cvv,
        expiryDate: new Date(formData.expiryDate as string),
      });
    }
  };

  return (
    <form onSubmit={handleNext}>
      <div className="flex flex-col gap-2">
        <label htmlFor="cardNumber">Card Number</label>
        <Input
          id="cardNumber"
          placeholder="828282828282"
          value={formData.cardNumber}
          onChange={handleChange}
          isError={errors.cardError}
          name="cardNumber"
          type="number"
        />
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <label htmlFor="cvv">CVV</label>
        <Input
          id="cvv"
          type="number"
          placeholder="825"
          value={formData.cvv}
          onChange={handleChange}
          isError={errors.cvvError}
          name="cvv"
        />
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <label htmlFor="expiryDate">Card Expiry Date</label>
        <Input
          id="expiryDate"
          type="date"
          value={new Date(formData.expiryDate).toLocaleDateString("en-CA")}
          onChange={handleChange}
          isError={errors.expiryError}
          name="expiryDate"
        />
      </div>
      <div className="mt-4 flex gap-2">
        <button
          onClick={handlePrevious}
          className="px-4 py-2 inline-flex justify-center items-center bg-blue-500 rounded-md text-white w-full"
        >
          Previous
        </button>
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
