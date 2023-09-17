import supabse, { supabaseUrl } from "./supabase";

export async function signUp({ fullName, email, password }) {
  const { data, error } = await supabse.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avtar: "",
      },
    },
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

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

export async function updateUser({ fullName, avatar, password }) {
  //1. Update fullName or password
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  const { data, error } = await supabse.auth.updateUser(updateData);
  if (error) throw new Error(error.message);

  if (!avatar) return data;

  //2. Upload avatar to supabase bucket
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabse.storage
    .from("avtars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  //3. Update avatar in the user
  const { data: updatedUser, error: error2 } = await supabse.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avtars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);
  return updatedUser;
}
