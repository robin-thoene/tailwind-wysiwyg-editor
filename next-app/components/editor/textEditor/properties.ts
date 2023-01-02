/**
 * Properties of the text editor.
 */
interface ITextEditorProps {
    /** The initial content as string. */
    initialContent?: string;
    /** The content type to import / export. */
    contentType: 'markdown' | 'html';
    /** Callback to execute when the value changes. */
    handleContentUpdate: (newContent: string) => void;
}

export type { ITextEditorProps };
