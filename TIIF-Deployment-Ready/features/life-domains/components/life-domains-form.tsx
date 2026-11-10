"use client";

import { useState } from "react";

import { lifeDomainQuestions }
from "../data/questions";

export function LifeDomainsForm() {

  const [answers,
    setAnswers] =
    useState<
      Record<string, number>
    >({});

  return (
    <div className="space-y-8">

      {lifeDomainQuestions.map(
        (question) => (
          <div
            key={question.id}
            className="
              rounded-2xl
              border
              border-white/10
              p-5
            "
          >
            <p>
              {question.question}
            </p>

            <div
              className="
                mt-4
                flex
                gap-2
              "
            >
              {[0,1,2,3,4].map(
                (value) => (
                  <button
                    key={value}
                    onClick={() =>
                      setAnswers(
                        (prev) => ({
                          ...prev,
                          [question.id]:
                            value,
                        })
                      )
                    }
                    className="
                      rounded-lg
                      border
                      px-4
                      py-2
                    "
                  >
                    {value}
                  </button>
                )
              )}
            </div>

          </div>
        )
      )}

    </div>
  );
}