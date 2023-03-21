interface IUser {
  username: string;
  email: string;
  password: string;
}

export const signIn = async (user: IUser) => {
  try {
    const res = await fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(user)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(JSON.stringify(err));
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e);
    }
  }
};

export const logIn = async (user: IUser) => {
  try {
    const res = await fetch('http://localhost:5000/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(user)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(JSON.stringify(err));
    }
    const data = await res.json();
    return data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e);
    }
  }
};
