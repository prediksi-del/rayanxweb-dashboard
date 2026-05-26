export default function FeatureButton({ label, onClick, icon }: { label: string, onClick: () => void, icon: string }) {
  return (
    <button onClick={onClick} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col items-center gap-2 hover:border-cyan-500 transition">
      <span className="text-cyan-400 text-xl">{icon}</span>
      <span className="text-[10px] font-bold uppercase">{label}</span>
    </button>
  );
}
