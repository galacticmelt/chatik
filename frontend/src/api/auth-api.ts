import { resErrorCheck } from "./resErrorCheck";

interface IUserSignUp {
  username: string;
  email: string;
  password: string;
}

export interface IUserLogIn {
  email: string;
  password: string;
}

export const signUp = async (user: IUserSignUp) => {
  try {
    const res = await fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      credentials: 'include',
      body: JSON.stringify(user)
    });
    resErrorCheck(res);
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e);
    }
  }
};

export const fetchAuthData = async (user: IUserLogIn) => {
  try {
    const res = await fetch('http://127.0.0.1:5000/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      credentials: 'include',
      body: JSON.stringify(user)
    });
    resErrorCheck(res);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e);
    }
  }
};

export const fetchUserById = async (id: string) => {
  const res = await fetch(`http://localhost:5000/users?${id}`);
  const data = await res.json();
  return data;
};
