import axios from "axios";

const API_KEY = "AIzaSyBhnvDKaa9bdbz3Aft5Up6s-3ku77L5ysk";

async function authenticate(mode, { email, password }) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  });

  return response.data.idToken;
}

export async function createUser(credentials) {
  return authenticate("signUp", credentials);
}

export async function login(credentials) {
  return authenticate("signInWithPassword", credentials);
}
