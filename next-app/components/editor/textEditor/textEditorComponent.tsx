import 'draft-js/dist/Draft.css';

import { faBold, faItalic, faLink, faLinkSlash, faListDots, faListNumeric, faQuoteLeft, faStrikethrough, faUnderline } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArrowSmallLeftIcon, ArrowSmallRightIcon, ArrowUturnLeftIcon, ArrowUturnRightIcon, CodeBracketIcon } from '@heroicons/react/24/solid';
import { ContentBlock, DraftEditorCommand, DraftHandleValue, Editor, EditorState, RichUtils } from 'draft-js';
import { useTranslation } from 'next-i18next';
import React, { FunctionComponent, KeyboardEvent, MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import IconButton from '../../base/button/iconButton';
import Dialog from '../../base/dialog';
import Input from '../../base/inputs/input';
import Select, { IOption } from '../../base/select';
import Tooltip from '../../base/tooltip';
import { addLink, applyBlockStyle, applyInlineStyle, removeLink } from '../helper';
import { exportEditorStateToHtmlString, exportEditorStateToMarkdownString, getEditorStateFromHtml, getEditorStateFromMarkdown } from '../parser';
import { ITextEditorProps } from './properties';

/**
 * Custom WYSIWYG editor based on draft-js.
 * @param {ITextEditorProps} props The properties of the WYSIWYG editor.
 * @returns {FunctionComponent} The WYSIWYG editor component.
 */
const TextEditor: FunctionComponent<ITextEditorProps> = (props) => {
    /** The maximum allowed indent level for lists. */
    const maxIntend = 4;

    /** Access to translations. */
    const { t } = useTranslation();

    /** React state of the current draft-js editor state. */
    const [editorState, setEditorState] = useState(
        props.initialContent && props.contentType === 'markdown'
            ? getEditorStateFromMarkdown(props.initialContent)
            : props.initialContent && props.contentType === 'html'
            ? getEditorStateFromHtml(props.initialContent)
            : EditorState.createEmpty(),
    );

    /** The currently selected heading type. */
    const [selectedHeadingOptions, setSelectedHeadingOptions] = useState<IOption[]>([{ key: 'paragraph', value: t('editorParagraph') }]);
    /** Whether the bold style is currently active or not. */
    const [isBoldActive, setIsBoldActive] = useState<boolean>(false);
    /** Whether the italic style is currently active or not. */
    const [isItalicActive, setIsItalicActive] = useState<boolean>(false);
    /** Whether the underline style is currently active or not. */
    const [isUnderlineActive, setIsUnderlineActive] = useState<boolean>(false);
    /** Whether the ordered list style is currently active or not. */
    const [isOrderedListActive, setIsOrderedListActive] = useState<boolean>(false);
    /** Whether the unordered list style is currently active or not. */
    const [isUnorderedListActive, setIsUnorderedListActive] = useState<boolean>(false);
    /** Whether the strike through style is currently active or not. */
    const [isStrikeThroughActive, setIsStrikeThroughActive] = useState<boolean>(false);
    /** Whether the blockquote style is currently active or not. */
    const [isBlockquoteActive, setIsBlockquoteActive] = useState<boolean>(false);
    /** Whether the code block style is currently active or not. */
    const [isCodeBlockActive, setIsCodeBlockActive] = useState<boolean>(false);

    /** The current value of the url input. */
    const [urlValue, setUrlValue] = useState<string>('');
    /** Whether the url input is visible or not. */
    const [isUrlInputVisible, setIsUrlInputVisible] = useState<boolean>(false);

    /** Reference to the draft-js editor component. */
    const editorRef = useRef<Editor>();

    /** Options for the heading dropdown */
    const headingOptions: IOption[] = useMemo(
        () => [
            { key: 'paragraph', value: t('editorParagraph') },
            { key: 'header-one', value: t('editorHeadline1') },
            { key: 'header-two', value: t('editorHeadline2') },
            { key: 'header-three', value: t('editorHeadline3') },
        ],
        [t],
    );

    /**
     * Set the user input focus into the text editor.
     */
    const setFocusIntoEditor = () => {
        setTimeout(() => editorRef.current?.focus(), 0);
    };

    /** Handle editor state updates by calling the property callback. */
    useEffect(() => {
        let newContent = '';
        if (props.contentType === 'markdown') {
            newContent = exportEditorStateToMarkdownString(editorState);
        } else if (props.contentType === 'html') {
            newContent = exportEditorStateToHtmlString(editorState);
        }
        props.handleContentUpdate(newContent);
    }, [editorState, props]);

    /**
     * Handle keyboard shortcuts in the draft-js editor.
     * @param {DraftEditorCommand} command The command to execute.
     * @param {EditorState} editorState The editor state to modify.
     * @returns {DraftHandleValue} The draft handle value.
     */
    const handleKeyCommand = useCallback((command: DraftEditorCommand, editorState: EditorState): DraftHandleValue => {
        if (command === 'backspace') {
            return 'not-handled';
        }
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return 'handled';
        }
        return 'not-handled';
    }, []);

    /**
     * Handle what happens when the user presses the return key.
     * @param {KeyboardEvent} event The occurred keyboard event.
     * @returns {DraftHandleValue} The draft handle value.
     */
    const handleReturn = useCallback(
        (event: KeyboardEvent): DraftHandleValue => {
            if (event.shiftKey) {
                setEditorState(RichUtils.insertSoftNewline(editorState));
                return 'handled';
            }
            return 'not-handled';
        },
        [editorState],
    );

    /**
     * Function to apply custom block styles.
     * @param {ContentBlock} contentBlock The content block to format.
     * @returns {string} The CSS classes to apply.
     */
    const blockStyleFn = (contentBlock: ContentBlock): string => {
        const type = contentBlock.getType();
        if (type === 'blockquote') {
            return 'italic text-base';
        }
        return '';
    };

    /**
     * Handle what happens when the user press tab.
     * @param {KeyboardEvent} event The occurred keyboard event.
     */
    const onTab = useCallback(
        (event: KeyboardEvent) => {
            setEditorState(RichUtils.onTab(event, editorState, maxIntend));
        },
        [editorState],
    );

    /**
     * Mouse down handler to apply BOLD style.
     */
    const onBoldMouseDown = () => {
        applyInlineStyle(editorState, setEditorState, 'BOLD');
        setFocusIntoEditor();
    };

    /**
     * Mouse down handler to apply ITALIC style.
     */
    const onItalicMouseDown = () => {
        applyInlineStyle(editorState, setEditorState, 'ITALIC');
        setFocusIntoEditor();
    };

    /**
     * Mouse down handler to apply UNDERLINE style.
     */
    const onUnderlineMouseDown = () => {
        applyInlineStyle(editorState, setEditorState, 'UNDERLINE');
        setFocusIntoEditor();
    };

    /**
     * Mouse down handler to apply UNDERLINE style.
     */
    const onStrikeThroughMouseDown = () => {
        applyInlineStyle(editorState, setEditorState, 'STRIKETHROUGH');
        setFocusIntoEditor();
    };

    /**
     * On change handler for the heading dropdown.
     * Applies the selected heading type to the current editor block.
     * @param {IOption | undefined} newValue The selected dropdown option.
     */
    const onHeadingChange = (newValue: IOption[]) => {
        if (!newValue) {
            return;
        }
        const key = newValue.length > 0 ? newValue[0].key : '';
        switch (key) {
            case 'paragraph':
                applyBlockStyle(editorState, setEditorState, 'paragraph');
                setFocusIntoEditor();
                break;
            case 'header-one':
                applyBlockStyle(editorState, setEditorState, 'header-one');
                setFocusIntoEditor();
                break;
            case 'header-two':
                applyBlockStyle(editorState, setEditorState, 'header-two');
                setFocusIntoEditor();
                break;
            case 'header-three':
                applyBlockStyle(editorState, setEditorState, 'header-three');
                setFocusIntoEditor();
                break;
            default:
                break;
        }
        setSelectedHeadingOptions(newValue);
    };

    /** Handle changes in block type. */
    useEffect(() => {
        // Get the current inline style.
        const currentInlineStyle = editorState.getCurrentInlineStyle();
        // Activate states of applied styles.
        setIsBoldActive(currentInlineStyle.has('BOLD'));
        setIsItalicActive(currentInlineStyle.has('ITALIC'));
        setIsUnderlineActive(currentInlineStyle.has('UNDERLINE'));
        setIsStrikeThroughActive(currentInlineStyle.has('STRIKETHROUGH'));
        // Get the selection.
        const currentSelection = editorState.getSelection();
        // Get the anchor key.
        const anchorKey = currentSelection.getAnchorKey();
        // Get the current content.
        const currentContent = editorState.getCurrentContent();
        // Get the content block of the current content.
        const currentContentBlock = currentContent.getBlockForKey(anchorKey);
        const currentBlockType = currentContentBlock.getType();
        setIsUnorderedListActive(currentBlockType === 'unordered-list-item');
        setIsOrderedListActive(currentBlockType === 'ordered-list-item');
        setIsBlockquoteActive(currentBlockType === 'blockquote');
        setIsCodeBlockActive(currentBlockType === 'code-block');
        const defaultOption = [{ key: 'paragraph', value: t('editorParagraph') }];
        if (currentBlockType === 'unstyled') {
            setSelectedHeadingOptions(defaultOption);
            return;
        }
        // Update the block type dropdown.
        const opt = headingOptions.find((o) => o.key === currentBlockType);
        setSelectedHeadingOptions(opt ? [opt] : defaultOption);
    }, [editorState, headingOptions, t]);

    return (
        <div className="border border-base-content flex flex-1 flex-col overflow-hidden">
            <Dialog
                isOpen={isUrlInputVisible}
                title={t('addLinkDialogTitle')}
                confirmText={t('addLinkDialogConfirmText') ?? undefined}
                onConfirm={() => {
                    addLink(editorState, setEditorState, urlValue);
                    setIsUrlInputVisible(false);
                    setUrlValue('');
                    setFocusIntoEditor();
                }}
                onClose={() => {
                    setIsUrlInputVisible(false);
                    setUrlValue('');
                }}
            >
                <Input
                    value={urlValue}
                    onChange={(newValue) => {
                        if (newValue || newValue === '') {
                            setUrlValue(newValue as string);
                        }
                    }}
                />
            </Dialog>
            <div className="flex m-1 p-3 border-b border-base-content items-center flex-wrap">
                <div className="mr-6 flex w-72">
                    <Select selectedOptions={selectedHeadingOptions} options={headingOptions} onChange={onHeadingChange} />
                </div>
                <div className="mr-6 flex min-w-max">
                    <div className="mr-2">
                        <Tooltip direction="Bottom" text="Ctrl + B / CMD + B">
                            <IconButton
                                additionalClassNames={`${isBoldActive ? 'bg-base-200' : ''}`}
                                icon={<FontAwesomeIcon icon={faBold} className="h-5 w-5" />}
                                onClick={() => {
                                    onBoldMouseDown();
                                }}
                            />
                        </Tooltip>
                    </div>
                    <div className="mr-2">
                        <Tooltip direction="Bottom" text="Ctrl + I / CMD + I">
                            <IconButton
                                additionalClassNames={`${isItalicActive ? 'bg-base-200' : ''}`}
                                icon={<FontAwesomeIcon icon={faItalic} className="h-5 w-5" />}
                                onClick={() => {
                                    onItalicMouseDown();
                                }}
                            />
                        </Tooltip>
                    </div>
                    <div className="mr-2">
                        <Tooltip direction="Bottom" text="Ctrl + U / CMD + U">
                            <IconButton
                                additionalClassNames={`${isUnderlineActive ? 'bg-base-200' : ''}`}
                                icon={<FontAwesomeIcon icon={faUnderline} className="h-5 w-5" />}
                                onClick={() => {
                                    onUnderlineMouseDown();
                                }}
                            />
                        </Tooltip>
                    </div>
                    <IconButton
                        additionalClassNames={`${isStrikeThroughActive ? 'bg-base-200' : ''}`}
                        icon={<FontAwesomeIcon icon={faStrikethrough} className="h-5 w-5" />}
                        onClick={() => {
                            onStrikeThroughMouseDown();
                        }}
                    />
                </div>
                <div className="mr-6 flex min-w-max">
                    <div className="mr-2">
                        <IconButton
                            additionalClassNames={`${isUnorderedListActive ? 'bg-base-200' : ''}`}
                            icon={<FontAwesomeIcon icon={faListDots} className="h-5 w-5" />}
                            onClick={() => {
                                applyBlockStyle(editorState, setEditorState, 'unordered-list-item');
                            }}
                        />
                    </div>
                    <div className="mr-2">
                        <IconButton
                            additionalClassNames={`${isOrderedListActive ? 'bg-base-200' : ''}`}
                            icon={<FontAwesomeIcon icon={faListNumeric} className="h-5 w-5" />}
                            onClick={() => {
                                applyBlockStyle(editorState, setEditorState, 'ordered-list-item');
                            }}
                        />
                    </div>
                    <div className="mr-2">
                        <IconButton
                            icon={<ArrowSmallLeftIcon className="h-5 w-5" />}
                            onClick={() => {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                const e: any = { preventDefault: () => null, shiftKey: true };
                                setEditorState(RichUtils.onTab(e, editorState, maxIntend));
                            }}
                        />
                    </div>
                    <IconButton
                        icon={<ArrowSmallRightIcon className="h-5 w-5" />}
                        onClick={() => {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            const e: any = { preventDefault: () => null };
                            setEditorState(RichUtils.onTab(e, editorState, maxIntend));
                        }}
                    />
                </div>
                <div className="mr-6 flex min-w-max">
                    <div className="mr-2">
                        <IconButton
                            additionalClassNames={`${isBlockquoteActive ? 'bg-base-200' : ''}`}
                            icon={<FontAwesomeIcon icon={faQuoteLeft} className="h-5 w-5" />}
                            onClick={() => {
                                applyBlockStyle(editorState, setEditorState, 'blockquote');
                            }}
                        />
                    </div>
                    <IconButton
                        additionalClassNames={`${isCodeBlockActive ? 'bg-base-200' : ''}`}
                        icon={<CodeBracketIcon className="h-5 w-5" />}
                        onClick={() => {
                            applyBlockStyle(editorState, setEditorState, 'code-block');
                        }}
                    />
                </div>
                <div className="mr-6 flex min-w-max">
                    <div className="mr-2">
                        <IconButton
                            icon={<FontAwesomeIcon icon={faLink} className="h-5 w-5" />}
                            onClick={() => {
                                setIsUrlInputVisible(true);
                            }}
                        />
                    </div>
                    <IconButton
                        icon={<FontAwesomeIcon icon={faLinkSlash} className="h-5 w-5" />}
                        onClick={() => {
                            removeLink(editorState, setEditorState);
                        }}
                    />
                </div>
                <div className="mr-6 flex min-w-max">
                    <div className="mr-2">
                        <Tooltip direction="Bottom" text="Ctrl + Z / CMD + Z">
                            <IconButton
                                icon={<ArrowUturnLeftIcon className="h5 w-5" />}
                                onClick={() => {
                                    setEditorState(EditorState.undo(editorState));
                                }}
                            />
                        </Tooltip>
                    </div>
                    <Tooltip direction="Bottom" text="Ctrl + Y / CMD + Shift + Z">
                        <IconButton
                            icon={<ArrowUturnRightIcon className="h5 w-5" />}
                            onClick={() => {
                                setEditorState(EditorState.redo(editorState));
                            }}
                        />
                    </Tooltip>
                </div>
            </div>
            <div className="p-4 flex flex-1 overflow-auto" onClick={setFocusIntoEditor}>
                <Editor
                    handleReturn={handleReturn}
                    ref={editorRef as MutableRefObject<Editor>}
                    editorState={editorState}
                    onChange={setEditorState}
                    handleKeyCommand={handleKeyCommand}
                    onTab={onTab}
                    blockStyleFn={blockStyleFn}
                />
            </div>
        </div>
    );
};

export default TextEditor;
