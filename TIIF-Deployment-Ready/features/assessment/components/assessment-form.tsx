"use client";

import { useState } from "react";

import { traumaQuestions }
from "../data/trauma-questions";

export function AssessmentForm() {

  const [answers,
  setAnswers] =
  useState<Record<string, number>>(
    {}
  );

  return (

    <div
      className="
      space-y-8
      "
    >

      {traumaQuestions.map(
        (question) => (

          <div
            key={question.id}
          >

            <p
              className="
              mb-4
              "
            >
              {question.question}
            </p>

            <select

              onChange={(e) =>
                setAnswers({

                  ...answers,

                  [question.id]:
                    Number(
                      e.target
                        .value
                    ),

                })
              }

            >

              <option value="0">
                Never
              </option>

              <option value="1">
                Rarely
              </option>

              <option value="2">
                Sometimes
              </option>

              <option value="3">
                Often
              </option>

              <option value="4">
                Always
              </option>

            </select>

          </div>

        )
      )}

    </div>

  );
}