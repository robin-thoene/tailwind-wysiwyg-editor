import { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

/**
 * Framework file by NextJS https://nextjs.org/docs/advanced-features/custom-document
 * @returns {Element} Document outline
 */
export default function Document(): JSX.Element {
    return (
        <Html>
            <Head>
                <link rel="shortcut icon" href="/favicon.ico" />
                <meta name="robots" content="index, follow" />
                <meta name="description" content="This is a WYSIWYG editor using Draft.js with controls styled using TailwindCSS and DaisyUI." />
                <meta property="og:title" content="tailwind-wysiwyg-editor" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
