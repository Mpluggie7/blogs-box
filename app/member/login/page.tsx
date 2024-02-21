import LoginForm from "@/components/member/login-form";
import React from "react";

type Props = {};

const LoginPage = (props: Props) => {
  return (
    <div className="h-full flex justify-center items-center">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
