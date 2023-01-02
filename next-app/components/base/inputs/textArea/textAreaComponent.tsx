import React, { FunctionComponent, ReactElement } from 'react';

import Label from '../../label';
import { ITextAreaProps } from './properties';

/**
 * Multiline text input.
 *
 * @param {ITextAreaProps} props The component properties.
 * @returns {ReactElement} The text area component.
 */
const TextArea: FunctionComponent<ITextAreaProps> = (props): ReactElement => {
    return (
        <div className="form-control max-w-full w-full">
            {props.label && props.label !== '' && <Label text={props.label} />}
            <textarea
                className={`w-full textarea textarea-bordered ${props.isResizable ? '' : 'resize-none'}`}
                placeholder={props.placeholder}
                value={props.value}
                onChange={(e) => props.onChange && props.onChange(e.target.value)}
                rows={props.rows}
                disabled={props.disabled}
            />
        </div>
    );
};

export default TextArea;
