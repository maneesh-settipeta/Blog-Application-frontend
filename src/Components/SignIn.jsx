// App.js
import React from "react";
import { useAuth } from "react-oidc-context";

function SignIn() {
    const auth = useAuth();

    const signOutRedirect = () => {
        const clientId = "1j24h7u8qs554gfsl8m449jj5d";
        const logoutUri = "<logout uri>";
        const cognitoDomain = "https://us-east-1owt33rz2g.auth.us-east-1.amazoncognito.com";
        window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    };

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }

    if (auth.error) {
        return <div>Encountering error... {auth.error.message}</div>;
    }

    if (auth.isAuthenticated) {
        return (
            <div>
                <pre> Hello: {auth.user?.profile.email} </pre>
                <pre> ID Token: {auth.user?.id_token} </pre>
                <pre> Access Token: {auth.user?.access_token} </pre>
                <pre> Refresh Token: {auth.user?.refresh_token} </pre>

                <button onClick={() => auth.removeUser()}>Sign out</button>
            </div>
        );
    }

    return (
        <div>
            <button onClick={() => auth.signinRedirect()}>Sign in</button>
            <button onClick={() => signOutRedirect()}>Sign out</button>
        </div>
    );
}

export default SignIn;