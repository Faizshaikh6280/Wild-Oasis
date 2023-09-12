import supabse from "./supabase";

export async function login({ email, password }) {
  let { data, error } = await supabse.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getUser() {
  const { data: session } = await supabse.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabse.auth.getUser();
  if (error) {
    throw new Error(error.message);
  }
  return data?.user;
}
export async function logout() {
  const { error } = await supabse.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}
