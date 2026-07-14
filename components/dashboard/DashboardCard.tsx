import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: number;
  description: string;
  icon: LucideIcon;
  href: string;
}

export default function DashboardCard({
  title,
  value,
  description,
  icon: Icon,
  href,
}: DashboardCardProps) {
  return (
    <Link href={href}>
      <div className="group cursor-pointer rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/10 hover:shadow-xl hover:shadow-cyan-500/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400">
              {title}
            </p>

            <h2 className="mt-3 text-4xl font-bold text-white">
              {value}
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              {description}
            </p>
          </div>

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 transition group-hover:bg-cyan-500/20">
            <Icon
              size={30}
              className="text-cyan-400"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}