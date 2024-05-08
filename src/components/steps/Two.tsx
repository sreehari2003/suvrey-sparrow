import React, { useState } from "react";
import { Input } from "@app/components/Input";
import { StepProps } from ".";

export const Two = ({ handleData }: StepProps) => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cvv: "",
    expiryDate: "",
  });

  const [errors, setErrors] = useState({
    cardError: false,
    cvvError: false,
    expiryError: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
          value={formData.expiryDate}
          onChange={handleChange}
          isError={errors.expiryError}
          name="expiryDate"
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
