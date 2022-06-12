import { FunctionComponent } from "react";
import NextHead from "next/head";

const TITLE = "dunayeu.me";
const DESCRIPTION =
  "My personal island on the interweb. Resume, blog and a showcase of my technical abilities.";
const IMAGE = "https://dunayeu.me/profile/avatar.webp";

interface HeadProps {
  title?: string;
  description?: string;
}

const getTitle = (pageTitle?: string) =>
  pageTitle ? `${pageTitle} - ${TITLE}` : TITLE;

const PreloadFont = ({ href }: any) => (
  <link
    href={href}
    rel="preload"
    as="font"
    type="font/ttf"
    crossOrigin="true"
  />
);

const Head: FunctionComponent<HeadProps> = ({
  title,
  description = DESCRIPTION,
}) => (
  <NextHead>
    <title>{getTitle(title)}</title>
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />

    <meta name="description" content={description} />
    <meta property="og:title" content={getTitle(title)} />
    <meta property="og:url" content="https://dunayeu.me/" />
    <meta property="og:image" content={IMAGE} />
    <meta property="og:description" content={description} />

    <meta itemProp="name" content={getTitle(title)} />
    <meta itemProp="description" content={description} />
    <meta itemProp="image" content={IMAGE} />

    <PreloadFont href="/fonts/PTSerif-Regular.ttf" />
    <PreloadFont href="/fonts/PTSerif-Bold.ttf" />
    <PreloadFont href="/fonts/PTSerif-RegularItalic.ttf" />
    <PreloadFont href="/fonts/PTSerif-BoldItalic.ttf" />
    <PreloadFont href="/fonts/Poppins-Regular.ttf" />
    <PreloadFont href="/fonts/Poppins-SemiBold.ttf" />
    <PreloadFont href="/fonts/Poppins-SemiBoldItalic.ttf" />
    <PreloadFont href="/fonts/Poppins-BlackItalic.ttf" />
  </NextHead>
);

export default Head;
