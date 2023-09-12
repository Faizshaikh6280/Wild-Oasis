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
