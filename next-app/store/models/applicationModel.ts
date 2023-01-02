import { Action, action } from 'easy-peasy';

import { IGlobalNotification } from '../../types';

/**
 * Interface for the application store model.
 */
interface IApplicationModel {
    /** The notification to show globally. */
    globalNotification?: IGlobalNotification;
    /** Action to update the notification to show globally. */
    updateGlobalNotificationMessage: Action<IApplicationModel, IGlobalNotification | undefined>;
}

/**
 * The application store model.
 */
const ApplicationModel: IApplicationModel = {
    updateGlobalNotificationMessage: action((state, payload) => {
        state.globalNotification = payload;
    }),
};

export type { IApplicationModel };
export default ApplicationModel;
