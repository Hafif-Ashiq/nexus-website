"use client"


import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Provider } from 'react-redux';
import { store } from '../redux/store';


const poppins = Poppins({ subsets: ["latin"], weight: '400' });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={`${poppins.className} bg-accentColorLight w-full`}>
        {/* <body className="font-poppins bg-accentColorLight"> */}
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
