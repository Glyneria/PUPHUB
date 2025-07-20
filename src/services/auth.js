import { supabase } from '../lib/supabase';

export async function signUp({ email, password, role }) {
  if (!email || !password || !role) {
    return { error: 'Email, password, and role are required.' };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { role }, // This is stored in user_metadata
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { user: data.user };
}

export async function signIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  return { user: data.user };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    return { error: error.message };
  }
  return { success: true };
}

export async function signUpUser({ email, password, name, role }) {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) throw error;

  const table = role === 'organization' ? 'organizations' : 'users';

  const insertRes = await supabase.from(table).insert([
    {
      id: data.user.id,
      email,
      name,
      created_at: new Date().toISOString(),
    },
  ]);

  if (insertRes.error) throw insertRes.error;

  return data.user;
}

