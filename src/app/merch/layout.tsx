import Logo from "@/app/components/svg/logo";

const Navbar = () => {
  return (
    <nav className="w-5xl bg-white w-35">
      <Logo color="#1D71B8" />
    </nav>
  );
};

export default function MerchLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
