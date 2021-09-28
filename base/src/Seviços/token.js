const client_id = "0b688bcd941f4648a6a4f572fb13539e";
const client_secret = "bb43fa7166ab4ece9317a14ad68d6d15";

const baseURL = (id, secret) =>
  `https://accounts.spotify.com/api/token?grant_type=client_credentials&client_id=${id}&client_secret=${secret}`;

async function getToken() {
  const data = await fetch(baseURL(client_id, client_secret), {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });
  
  const { access_token, token_type } = await data.json()
  return `${token_type} ${access_token}`
}

export default getToken;