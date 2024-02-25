import { GetStaticProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect, useState } from 'react';

import TextEditor from '../components/editor';

/**
 * The page component to render at "/".
 * @returns {NextPage} The home page component.
 */
const Home: NextPage = () => {
    /** Access to translations. */
    const { t } = useTranslation();

    /** Whether the view is initialized on the client side or not. */
    const [initialized, setInitialized] = useState<boolean>(false);
    /** The state of the current string content value. */
    const [stringContent, setStringContent] = useState<string>();

    /** Wait for initialization before rendering the editor. */
    useEffect(() => {
        setInitialized(true);
    }, []);

    return (
        <div className="flex flex-1 p-12">
            <div className="flex flex-1 flex-col ml-6">
                <h3 className="flex justify-center">{t('editorHeadline')}</h3>
                {initialized && <TextEditor initialContent={stringContent} contentType={'markdown'} handleContentUpdate={(newContent: string) => setStringContent(newContent)} />}
            </div>
            <div className="flex flex-1 flex-col ml-6">
                <h3 className="flex justify-center">{t('markdownPreviewHeadline')}</h3>
                <textarea className="flex flex-1 bg-transparent resize-none border border-base-content p-3" value={stringContent} />
            </div>
        </div>
    );
};

/**
 * Server side executed method to inject properties into the component.
 * @returns {object} The page properties.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticProps: GetStaticProps = async ({ locale }: { [key: string]: any }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
};

export default Home;
