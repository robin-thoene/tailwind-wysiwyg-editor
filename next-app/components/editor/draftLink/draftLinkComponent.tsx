import Link from 'next/link';
import React, { FunctionComponent } from 'react';

import { IDraftLinkProps } from './properties';

/**
 * Custom render component to display links in the draft js editor.
 * @param {IDraftLinkProps} props The draft link properties.
 * @returns {FunctionComponent} The draft link component.
 */
const DraftLink: FunctionComponent<IDraftLinkProps> = (props) => {
    /** Get url and link text. */
    const { url, linkText } = props.contentState.getEntity(props.entityKey).getData();

    /**
     * Callback to execute when the user press the link in editor edit mode.
     */
    const onLinkClick = () => {
        window?.open(url)?.focus();
    };

    return (
        <Link href={url} className="link link-primary" onClick={onLinkClick}>
            {linkText || props.children}
        </Link>
    );
};

export default DraftLink;
