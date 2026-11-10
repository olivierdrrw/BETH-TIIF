export function PreviewTopbar() {
  return (
    <header
      className="
      flex
      h-20
      items-center
      justify-between
      border-b
      border-white/5
      px-8
    "
    >
      <div
        className="
        h-12
        w-80
        rounded-2xl
        bg-white/[0.03]
      "
      />

      <div className="flex gap-4">

        <div className="h-12 w-12 rounded-full bg-white/[0.04]" />

        <div className="h-12 w-12 rounded-full bg-white/[0.04]" />

        <div className="h-12 w-12 rounded-full bg-[#3E63B0]/20" />

      </div>

    </header>
  );
}