// ./src/components/Stepper.tsx
"use client";

import React from "react";

interface StepperProps {
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ currentStep }) => {
  const steps = [1, 2, 3];

  return (
    <div className="flex items-center justify-center my-6 space-x-[50px]">
      {steps.map((step, index) => {
        const isCompleted = step < currentStep;
        const isCurrent = step === currentStep;

        return (
          <div key={index} className="relative flex items-center">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-sm z-10 ${
                isCompleted
                  ? "bg-[#09090B] text-white" 
                  : isCurrent
                  ? "outline outline-1 outline-[#09090B] text-[#09090B]" 
                  : "bg-[#F3F3F3] text-[#09090B]" 
              }`}
            >
              {step}
            </div>
            {index < steps.length - 1 && (
              <div className="absolute top-1/2 left-full w-16 h-0.5 bg-[#F3F3F3] -translate-y-1/2" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
