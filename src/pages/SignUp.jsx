import { supabase } from '../lib/supabase';
import { useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  if (role !== 'user' && role !== 'org') {
    return <Navigate to="/chooserole" />;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = form;

    console.log("Trying to sign up with:", email, password);

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      console.error("Signup error:", signUpError.message);
      alert(signUpError.message);
      return;
    }

    const userId = signUpData?.user?.id;

    if (!userId) {
      console.error("No user ID returned after signup.");
      return;
    }

    const tableName = role === 'org' ? 'organizations' : 'users';

    const { error: insertError } = await supabase.from(tableName).insert([
        role === 'org'
            ? {
                id: userId,
                org_name: name,  // for organizations
                email,
            }
            : {
                id: userId,
                name,            // for users
                email,
            },
        ]);



    if (insertError) {
      console.error("Error inserting user data:", insertError.message);
      alert("Signup succeeded but storing user data failed.");
    } else {
      console.log("User data stored successfully.");
      alert("Signup successful! Check your email for confirmation.");
      navigate(role === "org" ? "/organization/dashboard" : "/user/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-6">Sign Up as {role === 'org' ? 'Organization' : 'Attendee'}</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800 text-white"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800 text-white"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800 text-white"
        />
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 p-3 rounded font-semibold"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
