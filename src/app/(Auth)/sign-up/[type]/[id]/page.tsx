import FormRegister from "@/components/Auth/register-form";
import React from "react";

const RegisterUserAccountPage = () => {
  return (
    <div className="h-screen flex justify-center items-center p-4">
      <div className="flex justify-center items-center">
        <FormRegister />
      </div>
    </div>
  );
};

export default RegisterUserAccountPage;
