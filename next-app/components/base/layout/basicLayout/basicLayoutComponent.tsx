import React, { FunctionComponent, ReactElement } from 'react';

import NavigationTop from '../../navigation/navigationTop';
import { IBasicLayoutProps } from './properties';

/**
 * Basic layout to wrap children.
 * @param {IBasicLayoutProps} props The component properties.
 * @returns {ReactElement} The basic layout component.
 */
const BasicLayout: FunctionComponent<IBasicLayoutProps> = (props): ReactElement => {
    return (
        <div className="flex flex-col flex-1 max-h-screen">
            <NavigationTop />
            <div className="flex flex-1 overflow-hidden">{props.children}</div>
        </div>
    );
};

export default BasicLayout;
