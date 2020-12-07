import { CHANGE_THEME } from '../pages/Configuration/actions';

const themeReducer = (
    previousState = 'light',
    action
) => {
    if (action.type === CHANGE_THEME) {
        return action.payload;
    }
    return previousState;
};

export default themeReducer;
