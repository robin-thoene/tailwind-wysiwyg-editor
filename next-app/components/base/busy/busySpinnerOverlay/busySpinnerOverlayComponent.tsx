import React, { FunctionComponent, ReactElement } from 'react';

import BusySpinner from '../busySpinner/busySpinnerComponent';

/**
 * Overlay component that displays a centered busy spinner.
 *
 * Must be placed inside a `relative` container to completely
 * overlay that container.
 *
 * @returns {ReactElement} The busy spinner overlay component.
 */
const BusySpinnerOverlay: FunctionComponent = (): ReactElement => {
    return (
        <div className="absolute top-0 left-0 w-full h-full z-40 bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <BusySpinner size={'Medium'} />
        </div>
    );
};

export default BusySpinnerOverlay;
