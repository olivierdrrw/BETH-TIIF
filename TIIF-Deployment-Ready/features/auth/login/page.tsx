"use client";

import {
  useState,
} from "react";

import {
  login,
} from "@/features/auth/services/auth-service";

export default function LoginPage() {
  const [email, setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  async function handleLogin() {
    await login(
      email,
      password
    );
  }

  return (
    <div
      className="
      mx-auto
      mt-20
      max-w-md
      space-y-4
    "
    >
      <h1
        className="
        text-3xl
        font-semibold
      "
      >
        Sign In
      </h1>

      <input
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value
          )
        }
        placeholder="Email"
        className="
          w-full
          rounded-xl
          border
          p-3
        "
      />

      <input
        type="password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
        placeholder="Password"
        className="
          w-full
          rounded-xl
          border
          p-3
        "
      />

      <button
        onClick={handleLogin}
        className="
          w-full
          rounded-xl
          bg-navy-600
          p-3
        "
      >
        Login
      </button>
    </div>
  );
}