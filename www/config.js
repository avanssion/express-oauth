// #region Global Imports
import { v4 as uuidv4 } from 'uuid';
// #endregion Global Imports

const oauthCsrfKey = '_oauth-csrf';

const hasWindow = typeof window !== 'undefined';

function generateOauthState() {
    if (hasWindow) {
        const random = uuidv4().replaceAll('-', '');
        window.localStorage.setItem(oauthCsrfKey, random);
        return random;
    }
}

function getOauthState() {
    if (hasWindow) {
        return window.localStorage.getItem(oauthCsrfKey);
    }
}

function deleteOauthState() {
    if (hasWindow) {
        window.localStorage.removeItem(oauthCsrfKey);
    }
}

function isValidOauthState(value) {
    if (!hasWindow) {
        return false;
    }
    const savedState = window.localStorage.getItem(oauthCsrfKey);
    return savedState === value;
}

export {
    deleteOauthState,
    generateOauthState,
    getOauthState,
    isValidOauthState,
};
