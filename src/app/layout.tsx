"use client";
import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import './globals.css'

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
    <ClerkProvider>
      <html lang="en">
        <body
          className="dark:bg-boxdark-2 dark:text-bodydark"
          suppressHydrationWarning={true}
        >
          <DefaultLayout>
            <Provider store={store}>
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
              {children}
            </Provider>
          </DefaultLayout>
        </body>
      </html>
    </ClerkProvider>
  );
}
