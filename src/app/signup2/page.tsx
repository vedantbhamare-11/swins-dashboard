"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/app/assets/logo_dark_theme.png";
import { Eye, EyeOff } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useSearchParams, useRouter } from "next/navigation";


const SignUp2: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || ""; // Retrieve email from query params
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState<{ phoneNumber?: string; password?: string; confirmPassword?: string; isChecked?: string }>({});


  const validateInputs = () => {
    const errors: { phoneNumber?: string; password?: string; confirmPassword?: string; isChecked?: string } = {};

    // Phone number validation
    if (!phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required.";
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      errors.phoneNumber = "Phone number must be 10 digits.";
    }

    // Password validation
    const passwordRules =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password.trim()) {
      errors.password = "Password is required.";
    } else if (!passwordRules.test(password)) {
      errors.password =
        "Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a digit, and a special character.";
    }

    // Confirm password validation
    if (!confirmPassword.trim()) {
      errors.confirmPassword = "Confirm password is required.";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    // Checkbox validation
    if (!isChecked) {
      errors.isChecked = "You must agree to the Terms of Service and Privacy Policy.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      // Add your account creation logic here (e.g., API call for registration)
      router.push("/otp-verification"); // Redirect to the Dashboard page
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Part: Black Background with Logo */}
      <div className="md:w-1/2 bg-black relative flex flex-col justify-between p-8">
        <Image
          src={Logo}
          alt="Small Wins Logo"
          width={170}
          height={50}
          className="mb-4"
        />

        <div className="hidden md:block text-white absolute bottom-4 left-8 right-8">
          <p className="italic">
            “This Library has saved me countless hours of work and helped me
            deliver stunning designs to my clients faster than ever before.”
          </p>
          <p className="mt-2 text-right">— Sofia Davis</p>
        </div>
      </div>

      {/* Right Part: Sign Up Form */}
      <div className="md:w-1/2 bg-white flex flex-col justify-center p-8 relative">
        <div className="w-full md:w-[60%] mx-auto">
          {/* Heading */}
          <h1 className="text-2xl font-semibold mb-2 text-center">Sign Up</h1>
          <p className="text-[#71717A] mb-6 text-center">
            Good Morning, Create your Swins Account
          </p>

          {/* Email Input */}
          <div className="mb-4">
            <Input
              type="email"
              value={email}
              readOnly
              className="w-full bg-gray-100 cursor-not-allowed placeholder:text-[#C3C3C3]"
            />
          </div>

          {/* Phone Number Input */}
          <div className="mb-4">
            <Input
              type="number"
              placeholder="Enter Your Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`w-full placeholder:text-[#C3C3C3] ${
                errors.phoneNumber ? "border-red-500" : ""
              }`}
            />
            {errors.phoneNumber && (
              <p className="text-red-600 text-sm mt-1">{errors.phoneNumber}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4 relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full placeholder:text-[#C3C3C3] ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-[#C3C3C3]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="mb-4 relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full placeholder:text-[#C3C3C3] ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-[#C3C3C3]"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Terms and Privacy Checkbox */}
          <div className="mb-6 flex items-start">
            <Checkbox
              id="terms"
              checked={isChecked}
              onCheckedChange={(checked) => setIsChecked(checked === true)} // Ensure boolean type
            />
            <label htmlFor="terms" className="ml-2 text-sm text-[#71717A]">
              By signing up, you agree to our{" "}
              <Link href="#" className="underline text-[#000]">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="underline text-[#000]">
                Privacy Policy
              </Link>
              .
            </label>
          </div>
          {errors.isChecked && (
            <p className="text-red-600 text-sm mb-4">{errors.isChecked}</p>
          )}

          {/* Create Account Button */}
          <Button className="w-full mb-6" onClick={handleSubmit}>
Submit          </Button>

          {/* Login Link */}
          <p className="text-sm text-[#71717A] text-center">
            Already Have an Account?{" "}
            <Link href="/signin" className="underline text-[#000] font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Quote for smaller screens */}
      <div className="block md:hidden text-white bg-black p-4 text-center">
        <p className="italic">
          “This Library has saved me countless hours of work and helped me
          deliver stunning designs to my clients faster than ever before.”
        </p>
        <p className="mt-2">— Sofia Davis</p>
      </div>
    </div>
  );
};

export default SignUp2;
