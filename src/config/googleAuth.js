export const googleAuthConfig = {
  webClientId:
    "439204702970-odlva2ha6j3it68b5pq0fn8mqmtkrqe2.apps.googleusercontent.com",
  iosClientId:
    "REPLACE_WITH_GOOGLE_IOS_CLIENT_ID",
  androidClientId:
    "439204702970-sbqgk3d02kaqsl1tpr7vj7tm3br9lh96.apps.googleusercontent.com",
};

export function hasGoogleClientId() {
  return Object.values(googleAuthConfig).some(
    (clientId) =>
      clientId &&
      !clientId.startsWith("REPLACE_WITH_")
  );
}
