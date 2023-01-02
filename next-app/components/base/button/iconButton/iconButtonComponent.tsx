import React, { FunctionComponent, ReactElement } from 'react';

import BusySpinner from '../../busy/busySpinner';
import { IIconButtonProps } from './properties';

/**
 * The icon button.
 *
 * @param {IIconButtonProps} props The component properties.
 * @returns {ReactElement} The icon button component.
 */
const IconButton: FunctionComponent<IIconButtonProps> = (props): ReactElement => {
    return (
        <button
            aria-label={props.ariaLabel}
            className={`btn btn-ghost p-3 flex min-h-full max-h-max h-max w-max ${props.additionalClassNames ? props.additionalClassNames : ''}`}
            onClick={props.onClick}
            disabled={props.disabled || props.isBusy}>
            {props.isBusy ? <BusySpinner /> : props.icon}
        </button>
    );
};

export default IconButton;
