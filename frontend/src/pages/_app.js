import "@/styles/globals.css";
import MainLayout from "@/components/MainLayout";

export default function App({ Component, pageProps }) {
  return (
    <div className="h-screen flex justify-center items-center">
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </div>
  );
}
