// #region Global Imports
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// #endregion Global Imports

// #region Local Imports
import { isValidOauthState, deleteOauthState } from '../../../src/utils';
// #endregion Local Imports

function LineCallback() {
    const [state, setState] = useState({
        authCode: '',
        authState: '',
        error: '',
        processingMessage: 'Linking your account...',
    });
    const router = useRouter();

    useEffect(() => {
        async function signInUser(code) {
            try {
                const res = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/auth/oauth/line`,
                    { code },
                );
                const { access_token: accessToken } = res.data;
                setState({ ...state, processingMessage: 'Redirecting...' });
                deleteOauthState();
                console.info(`🔐 Successfully logged: ${accessToken}`);
                setTimeout(function () {
                    window.location.assign('/');
                }, 3000);
            } catch (e) {
                deleteOauthState();
                if (e.response && e.response.data) {
                    setState({
                        ...state,
                        error: JSON.stringify(e.response.data),
                    });
                    return;
                }
                setState({
                    ...state,
                    error: 'Something went wrong.',
                });
            }
        }

        const { code, state: oauthState } = router.query;
        const { authCode, authState } = state;
        const canSetAuthCode = !authCode && router.query.code;
        const canSetState = !authState && router.query.state;
        if (canSetAuthCode && canSetState) {
            setState({ ...state, authCode: code, authState: oauthState });
            router.replace(router.pathname);

            if (!isValidOauthState(oauthState)) {
                deleteOauthState();
                setState({ ...state, error: 'An CSRF error occurs.' });
                return;
            }

            signInUser(code);
        }
    }, [router.query]);

    const { error, processingMessage } = state;

    if (error) {
        return (
            <div>
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <div>
            <p>{processingMessage}</p>
        </div>
    );
}

export default LineCallback;
