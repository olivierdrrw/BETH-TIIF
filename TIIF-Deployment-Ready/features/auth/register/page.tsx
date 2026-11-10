"use client";

import {
  useState,
} from "react";

import {
  register,
} from "@/features/auth/services/auth-service";

export default function RegisterPage() {
  const [email, setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  async function handleRegister() {
    await register(
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
        Create Account
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
        onClick={
          handleRegister
        }
        className="
          w-full
          rounded-xl
          bg-navy-600
          p-3
        "
      >
        Register
      </button>
    </div>
  );
}