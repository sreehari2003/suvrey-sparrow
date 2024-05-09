import { useState } from "react";
import { StepProps } from ".";
import { Input } from "../Input";

interface FormError {
  cardError: string;
  cvvError: string;
  expiryError: string;
}

const errorMessages = {
  cardNumber: "Card number is required",
  cvv: "CVV is required",
  expiryDate: "Expiry date is required",
};

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
    cardError: "",
    cvvError: "",
    expiryError: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "cardNumber") {
      setErrors((prev) => ({
        ...prev,
        cardError: value ? "" : errorMessages.cardNumber,
      }));
    }
    if (name === "cvv") {
      setErrors((prev) => ({
        ...prev,
        cvvError: value
          ? value.length === 3
            ? ""
            : "CVV should be a 3-digit number"
          : errorMessages.cvv,
      }));
    }
    if (name === "expiryDate") {
      setErrors((prev) => ({
        ...prev,
        expiryError:
          value && new Date(value) <= new Date()
            ? "Expiry date must be in the future"
            : "",
      }));
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormError = {
      cardError: formData.cardNumber ? "" : errorMessages.cardNumber,
      cvvError:
        formData.cvv && formData.cvv.length === 3
          ? ""
          : "CVV should be a 3-digit number",
      expiryError:
        formData.expiryDate && new Date(formData.expiryDate) > new Date()
          ? ""
          : "Expiry date must be in the future",
    };

    setErrors(newErrors);

    if (!newErrors.cardError && !newErrors.cvvError && !newErrors.expiryError) {
      handleData({
        cardNumber: formData.cardNumber,
        cvv: formData.cvv,
        expiryDate: new Date(formData.expiryDate as string),
      });
    }
  };

  const isNextDisabled = Object.values(errors).some((error) => error);

  return (
    <form onSubmit={handleNext}>
      <div className="flex flex-col gap-2">
        <label htmlFor="cardNumber">Card Number</label>
        <Input
          id="cardNumber"
          placeholder="828282828282"
          value={formData.cardNumber}
          onChange={handleChange}
          isError={Boolean(errors.cardError)}
          name="cardNumber"
          type="text" // Change type to "text"
          message={errors.cardError}
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
          isError={Boolean(errors.cvvError)}
          name="cvv"
          message={errors.cvvError}
        />
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <label htmlFor="expiryDate">Card Expiry Date</label>
        <Input
          id="expiryDate"
          type="date"
          value={new Date(formData.expiryDate).toLocaleDateString("en-CA")}
          onChange={handleChange}
          isError={Boolean(errors.expiryError)}
          name="expiryDate"
          message={errors.expiryError}
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
          disabled={isNextDisabled} // Disable the button if there are validation errors
        >
          Next
        </button>
      </div>
    </form>
  );
};
