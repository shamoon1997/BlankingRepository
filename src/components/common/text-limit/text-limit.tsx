type TextLimiterProps = {
  children: React.ReactNode;
};

export const TextLimiter = ({ children }: TextLimiterProps) => {
  return (
    <div className="overflow-hidden text-ellipsis whitespace-nowrap">
      {children}
    </div>
  );
};
