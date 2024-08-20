import Image from "next/image";
import { Inter } from "next/font/google";
import AuthComponent from "@/components/Auth";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={` flex justify-center items-center min-h-screen ${inter.className}`}
    >
    <ToastContainer />
    <AuthComponent/>
    </main>
  );
}
