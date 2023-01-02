import { ReactElement } from 'react';

import { IButtonProps } from '../properties';

/**
 * The properties of a single icon button.
 */
interface IIconButtonProps extends IButtonProps {
    /** The icon displayed inside the button */
    icon: ReactElement;
    /** The additional class names to apply. */
    additionalClassNames?: string;
}

export type { IIconButtonProps };
