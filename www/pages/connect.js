// #region Local Imports
import { generateOauthState } from '../src/utils';
// #endregion Local Imports

function Connect() {
    const oauthState = generateOauthState();
    function onLineClick() {
        window.location.assign(
            `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_OAUTH_LINE_CHANNEL_ID}&redirect_uri=${process.env.NEXT_PUBLIC_OAUTH_LINE_REDIRECT_URI}&state=${oauthState}&scope=profile%20openid`,
        );
    }

    return (
        <div className="container">
            <button className="line-button" onClick={onLineClick}>
                Login with Line
            </button>
            <style jsx>{`
                .container {
                    padding: 80px;
                }
                .line-button {
                    padding: 10px 20px;
                    background-color: #33ac24;
                    color: #fff;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
}

export default Connect;
