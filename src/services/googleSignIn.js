// import * as Linking from "expo-linking";
// import * as WebBrowser from "expo-web-browser";

// import {
//   googleAuthConfig,
//   hasGoogleClientId,
// } from "../config/googleAuth";

// WebBrowser.maybeCompleteAuthSession();

// const discovery = {
//   authorizationEndpoint:
//     "https://accounts.google.com/o/oauth2/v2/auth",
// };

// export async function getGoogleIdToken() {
//   if (!hasGoogleClientId()) {
//     throw new Error(
//       "Add your Google OAuth client ID in src/config/googleAuth.js."
//     );
//   }

//   const redirectUri = Linking.createURL("oauthredirect");
//   const nonce = String(Date.now());
//   const clientId = getClientId();
//   const authUrl =
//     `${discovery.authorizationEndpoint}?` +
//     new URLSearchParams({
//       client_id: clientId,
//       redirect_uri: redirectUri,
//       response_type: "id_token",
//       scope: "openid profile email",
//       nonce,
//       prompt: "select_account",
//     }).toString();

//   const result = await WebBrowser.openAuthSessionAsync(
//     authUrl,
//     redirectUri
//   );

//   if (result.type !== "success") {
//     throw new Error("Google sign-in was cancelled.");
//   }

//   const params = parseAuthUrl(result.url);

//   if (params.error) {
//     throw new Error(params.error_description || params.error);
//   }

//   if (!params.id_token) {
//     throw new Error(
//       "Google login did not return an ID token."
//     );
//   }

//   return params.id_token;
// }

// function getClientId() {
//   return (
//     googleAuthConfig.androidClientId ||
//     googleAuthConfig.iosClientId ||
//     googleAuthConfig.webClientId
//   );
// }

// function parseAuthUrl(url) {
//   const queryStart = url.indexOf("?");
//   const hashStart = url.indexOf("#");
//   const paramsText =
//     hashStart >= 0
//       ? url.slice(hashStart + 1)
//       : queryStart >= 0
//       ? url.slice(queryStart + 1)
//       : "";

//   return Object.fromEntries(
//     new URLSearchParams(paramsText)
//   );
// }



import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export async function getGoogleIdToken() {
  throw new Error(
    "Google Sign-In should be implemented using expo-auth-session hook in the screen."
  );
}