export function PreviewSidebar() {
  return (
    <aside
      className="
      w-20
      border-r
      border-white/5
      bg-white/[0.02]
      backdrop-blur-xl
    "
    >
      <div className="flex h-full flex-col items-center gap-6 py-8">

        <div className="h-12 w-12 rounded-2xl bg-[#3E63B0]/20" />

        {[1,2,3,4,5].map((i)=>(
          <div
            key={i}
            className="
              h-11
              w-11
              rounded-xl
              bg-white/[0.04]
            "
          />
        ))}

      </div>
    </aside>
  );
}