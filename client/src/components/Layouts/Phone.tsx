export const PhoneLayout = ({ children }) => {
  return (
    <div className="h-screen mobile-view-parent bg-light-gray justify-center items-center md:px-2">
      <div className="mobile-view outline-black relative outline outline-1 h-[930px] justify-start">
        {children}
      </div>
    </div>
  );
};
