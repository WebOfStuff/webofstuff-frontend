import LeftMenu from "./LeftMenu";
import TopMenu from "./TopMenu";
import BottomMenu from "./BottomMenu";
import React from "react";
import Head from 'next/head'

export default function Layout({ children,
  title = 'WebOfStuff', }) {
  if (process.env.MODE == "dev") {
    title = '*LOCAL* WebOfStuff'
  }


  return (
    <div id="website" className="bg-base-100 text-base-content h-screen overflow-hidden">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <TopMenu />
      <div id="contentarea" className="h-[92.5vh] flex flex-row w-full">
        <div id="leftmenu" className="w-[10vw]">
          <LeftMenu />
        </div>
        <div id="content" className="w-[90vw]">
          {children}
        </div>
      </div>
      <div id="bottommenu" className="h-[5vh] w-full">
        <BottomMenu />
      </div>
    </div>
  );
}