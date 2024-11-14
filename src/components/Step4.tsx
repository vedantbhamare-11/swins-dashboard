import React from "react";



const Step4: React.FC = () => {
  return (
    <div className="flex gap-4 mb-6 min-h-[300px] justify-center">

      {/* Success Message */}
      <div className="flex flex-col justify-center items-center mb-16">
        <h2 className="text-2xl font-bold">Welcome aboard!</h2>
        <p className="text-gray-600 mt-2">
          Your organization has been successfully added to our platform.
        </p>
      </div>

    </div>
  );
};

export default Step4;
