import React, { FunctionComponent, ReactElement } from 'react';

import DarkModeToggle from '../../darkModeToggle';
import LanguageSelector from '../../languageSelector';

/**
 * Basic top navigation to display the logo.
 * @returns {ReactElement} The top navigation component.
 */
const NavigationTop: FunctionComponent = (): ReactElement => {
    return (
        <div className="navbar p-3 bg-base-100 border-b border-base-200 shadow-sm min-h-max">
            <div className="w-full">
                <div className="ml-auto flex justify-end items-center">
                    <DarkModeToggle />
                    <LanguageSelector />
                </div>
            </div>
        </div>
    );
};

export default NavigationTop;
