export default async (req, res) => {
  let authHeader =
    "Basic " +
    Buffer.from(
      encodeURI(process.env.DOLBYIO_KEY) +
        ":" +
        encodeURI(process.env.DOLBYIO_SECRET)
    ).toString("base64");

  let tokenURL = "https://session.voxeet.com/v1/oauth2/token";
  let tokenParams = {
    method: "POST",
    headers: {
      Authorization: authHeader,
    },
    body: {
      grant_type: "client_credentials",
    },
  };

  try {
    const result = await fetch(tokenURL, tokenParams);
    const data = await result.json();

    res.status(200);
    res.json({
      accessToken: data.access_token,
    });
  } catch (e) {
    console.error(e);
    res.status(500);
    res.end();
  }
};
