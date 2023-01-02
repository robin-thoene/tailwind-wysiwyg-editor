import { ToastType } from '../enumerations';

/**
 * Type for a global notification to display.
 */
interface IGlobalNotification {
    /** The notification type. */
    type: ToastType;
    /** The message to show. */
    message: string;
}

export type { IGlobalNotification };
