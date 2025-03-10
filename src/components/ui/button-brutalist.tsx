export default function ButtonBrutalist({
  className,
  children,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      className={`mt-4 cursor-pointer py-2.5 px-5 relative flex items-center justify-center gap-x-2 rounded-sm text-sm tracking-[.00714em] font-medium border-2 border-black hover:-translate-y-0.5 shadow-[3px_3px_0_0_#000000] bg-blue-200 hover:bg-blue-300 focus:bg-blue-300 text-black transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
