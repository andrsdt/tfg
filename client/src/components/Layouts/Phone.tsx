type PhoneLayoutProps = {
  children: React.ReactNode;
};

export const PhoneLayout = ({ children }: PhoneLayoutProps) => {
  return (
    <div className="mobile-view-parent h-screen items-center justify-center bg-light-gray md:px-2">
      <div className="mobile-view relative h-[930px] justify-start outline outline-1 outline-black">
        {children}
      </div>
    </div>
  );
};
