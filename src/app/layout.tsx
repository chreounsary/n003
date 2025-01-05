"use client";
import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import "@/css/satoshi.css";
import "@/css/style.css";
import Loader from "@/components/common/Loader";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="dark:bg-boxdark-2 dark:text-bodydark"
        suppressHydrationWarning={true}
      >
        <DefaultLayout>
          
          <Provider store={store}>
            {children}
          </Provider>

        </DefaultLayout>
      </body>
    </html>
  );
}
