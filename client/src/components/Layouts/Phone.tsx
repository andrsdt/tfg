type PhoneLayoutProps = {
  children: React.ReactNode;
};

export const PhoneLayout = ({ children }: PhoneLayoutProps) => {
  return (
    <div className="mobile-view-parent h-screen items-center justify-center bg-light-gray md:px-2">
      <div className="mobile-view relative h-screen max-h-[930px] justify-start drop-shadow-2xl">
        {children}
      </div>
    </div>
  );
};
