// utils/encodeUtils.js
export const safeBase64Encode = (str) => {
  // First URI encode to handle all special characters
  const uriEncoded = encodeURIComponent(str);
  // Then Base64 encode
  return btoa(uriEncoded)
    .replace(/\+/g, '-') // Replace + with -
    .replace(/\//g, '_') // Replace / with _
    .replace(/=+$/, ''); // Remove padding
};

export const safeBase64Decode = (str) => {
  // Add padding back if needed
  let padded = str;
  while (padded.length % 4) {
    padded += '=';
  }
  // Replace URL-safe characters back
  padded = padded.replace(/-/g, '+').replace(/_/g, '/');
  // First Base64 decode, then URI decode
  return decodeURIComponent(atob(padded));
};