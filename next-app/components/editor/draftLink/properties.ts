import { ContentState } from 'draft-js';

/**
 * Properties of the custom draft link component.
 */
interface IDraftLinkProps {
    /** The children to render. */
    children: JSX.Element;
    /** The current editor content state. */
    contentState: ContentState;
    /** The entity key. */
    entityKey: string;
}

export type { IDraftLinkProps };
