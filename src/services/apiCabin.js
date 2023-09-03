import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error(error);
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  console.log(newCabin, id);
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // NOTE💡: Image name should be differnet and should not contain any slashes otherwise supabse will create folder in our bucket.
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/images/${imageName}`;

  //1. Create/Edit Cabin
  let query = supabase.from("cabins");

  // A) Create Cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]); // we have to add below 2 methods bcz insert() method does not immediately return that below created row so if we wnt we do it by adding these 2  methods below. Single method is used to rteurn a single object instead of array of object.

  // B) Edit Cabin
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be created");
  }

  console.log(data);
  //2 ) Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("images")
    .upload(imageName, newCabin.image);

  //3. Delete the cabin if there was a error uploading image.
  if (storageError) {
    console.log(storageError);
    await deleteCabin(data.id);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error.message + "😀");
    throw new Error("Could not delete cabin");
  }
  return data;
}
