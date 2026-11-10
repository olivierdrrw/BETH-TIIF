interface Props {

  current: number;

  projected30: number;

  projected90: number;
}

export function PredictionCard({
  current,
  projected30,
  projected90,
}: Props) {

  return (

    <div
      className="
      rounded-3xl
      border
      border-white/10
      p-6
      "
    >

      <h3
        className="
        text-xl
        font-semibold
        "
      >
        Human Twin Forecast
      </h3>

      <div
        className="
        mt-6
        space-y-4
        "
      >

        <div>
          Current:
          {current}%
        </div>

        <div>
          30 Days:
          {projected30}%
        </div>

        <div>
          90 Days:
          {projected90}%
        </div>

      </div>

    </div>
  );
}