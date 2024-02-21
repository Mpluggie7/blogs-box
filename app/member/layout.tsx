const MemberLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex justify-center">
      {children}
    </div>
  );
};

export default MemberLayout;
