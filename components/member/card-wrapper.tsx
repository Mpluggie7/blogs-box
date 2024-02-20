import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Header from "@/components/member/header";
import BackButton from "@/components/member/back-button";

interface CardWrapperProps {
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  children: React.ReactNode;
}

const CardWrapper = ({
  headerLabel,
  backButtonLabel,
  backButtonHref,
  children,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
