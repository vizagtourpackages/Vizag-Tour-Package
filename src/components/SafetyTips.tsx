import { AlertTriangle, Droplets, Sun, Users } from "lucide-react";
import { safetyTips } from "@/data/safetyTips";

const iconMap = {
  AlertTriangle,
  Droplets,
  Sun,
  Users,
};

export default function SafetyTips() {
  return (
    <section className="bg-sand-light py-16">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* Header */}
          <div className="lg:w-1/3 text-center lg:text-left">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-coral/10 text-coral mb-6">
              <AlertTriangle size={32} />
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl text-charcoal mb-4">
              Essential Safety Tips
            </h2>
            <p className="text-charcoal-light leading-relaxed mb-6 lg:mb-0">
              Your safety is our priority. Please review these important guidelines
              before visiting Vizag beaches and the Araku agency areas to ensure a
              memorable and incident-free trip.
            </p>
          </div>

          {/* Grid */}
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {safetyTips.map((tip) => {
              const Icon = iconMap[tip.icon];
              return (
                <div key={tip.id} className="bg-white p-6 rounded-2xl shadow-sm border border-sand/50 flex gap-4">
                  <div className="mt-1 shrink-0">
                    <Icon size={24} className="text-coral" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal mb-2 text-lg leading-tight">
                      {tip.title}
                    </h3>
                    <p className="text-sm text-charcoal-light/80 leading-relaxed">
                      {tip.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
