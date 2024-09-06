import supabase from "./supabase";

// function for fetch all settings
export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Could not load settings");
  }

  return data;
}

// function for update settings
export async function updateSettings(newSettings) {
  const { data, error } = await supabase
    .from("settings")
    .update(newSettings)
    .eq("id", 1);

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
  return data;
}
