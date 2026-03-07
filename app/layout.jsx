import { Poppins } from "next/font/google";
import "@/assets/styles/main.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalProvider } from "@/context/GlobalContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: {
    default: "PropertyPulse",
    template: "%s | PropertyPulse",
  },
  description:
    "PropertyPulse is a rental property marketplace to find, list, and manage rental homes, apartments, and more.",
  keywords: [
    "rental properties",
    "apartments for rent",
    "houses for rent",
    "property listings",
    "PropertyPulse",
  ],
};

export default function MainLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans antialiased flex flex-col min-h-screen">
        <AuthProvider>
          <GlobalProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <ToastContainer />
          </GlobalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}