import RegisterForm from "@/components/member/register-form";
import React from "react";

type Props = {};

const RegisterPage = (props: Props) => {
  return (
    <div className="h-full flex justify-center items-center">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
