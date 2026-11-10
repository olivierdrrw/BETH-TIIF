"use client";

import {
  logoutUser,
} from "@/features/auth/services/logout";

export function LogoutButton() {

  return (

    <button

      onClick={() =>
        logoutUser()
      }

    >

      Logout

    </button>

  );
}