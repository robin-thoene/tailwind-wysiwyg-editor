import { ReactNode } from 'react';

/**
 * The properties of the tooltip component.
 */
interface ITooltipProps {
    /** The children to target with the tooltip. */
    children: ReactNode;
    /** The text to display inside the tooltip. */
    text: string;
}

export type { ITooltipProps };
