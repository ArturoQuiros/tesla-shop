import { maxWidth, padding } from "@mui/system";
import Head from "next/head";
import { FC, PropsWithChildren } from "react";
import { Navbar } from "../ui";
import { Sidebar } from "../ui/Sidebar";

interface Props {
  title: string;
  description: string;
  imageFullUrl?: string;
}

export const ShopLayout: FC<PropsWithChildren<Props>> = ({
  children,
  title,
  description,
  imageFullUrl,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />

        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />

        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
      </Head>
      <nav>
        <Navbar></Navbar>
      </nav>

      <Sidebar />

      <main
        style={{ margin: "80px auto", maxWidth: "1440px", padding: "0px 30px" }}
      >
        {children}
      </main>

      <footer></footer>
    </>
  );
};
