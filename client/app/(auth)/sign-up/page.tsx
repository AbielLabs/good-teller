import AuthForm from "@/components/AuthForm";
import React from "react";

const Signup = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <AuthForm type="sign-up" />
    </div>
  );
};

export default Signup;
