"use client";

import { useRouter } from "next/navigation";

export function LanguageSwitcher() {
  const router = useRouter();

  const changeLanguage = (
    lang: string
  ) => {
    localStorage.setItem(
      "language",
      lang
    );

    router.refresh();
  };

  return (
    <select
      onChange={(e) =>
        changeLanguage(
          e.target.value
        )
      }
      className="
      rounded-xl
      border
      px-3
      py-2
      "
    >
      <option value="en">
        English
      </option>

      <option value="rw">
        Kinyarwanda
      </option>

      <option value="fr">
        Français
      </option>

      <option value="sw">
        Kiswahili
      </option>
    </select>
  );
}