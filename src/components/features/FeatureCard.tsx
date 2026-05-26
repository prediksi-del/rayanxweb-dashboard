'use client';
import { useCommand } from '@/hooks/useCommand';
import { Feature } from '@/types';

export const FeatureCard = ({ feature }: { feature: Feature }) => {
  const { send } = useCommand();

  return (
    <button
      onClick={() => send(feature.id)}
      className="p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-cyan-500 transition flex flex-col items-center gap-2"
    >
      <span className="text-2xl">{feature.icon}</span>
      <span className="text-sm font-medium">{feature.label}</span>
    </button>
  );
};
