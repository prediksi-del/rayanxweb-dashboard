export default function StatCard({ title, value, color = "text-cyan-400" }: { title: string, value: string, color?: string }) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
      <p className="text-[10px] text-slate-500 uppercase tracking-widest">{title}</p>
      <h3 className={`text-2xl font-bold ${color}`}>{value}</h3>
    </div>
  );
}
