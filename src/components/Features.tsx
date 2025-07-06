import React from 'react';
import { Network, Users, BarChart3, Sparkles, ArrowRight } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: Network,
      title: 'Network Discovery',
      description: 'Visualize complex relationships between music creators and collaborators in an interactive network graph.',
      color: 'neon',
      bgColor: 'bg-green-400/10',
      hoverColor: 'hover:border-green-400'
    },
    {
      icon: Users,
      title: 'Find Collaborators',
      description: 'Discover hidden connections and find potential collaboration opportunities through smart network analysis.',
      color: 'coral',
      bgColor: 'bg-red-400/10',
      hoverColor: 'hover:border-red-400'
    },
    {
      icon: BarChart3,
      title: 'Industry Insights',
      description: 'Track trends, emerging artists, and industry movement patterns with powerful analytics and data visualization.',
      color: 'mint',
      bgColor: 'bg-teal-400/10',
      hoverColor: 'hover:border-teal-400'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`
                bg-white p-6 border-2 border-dashed border-gray-200 rounded-2xl 
                transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl
                ${feature.hoverColor} group
                ${index === 0 ? 'transform rotate-1' : 
                  index === 1 ? 'transform rotate-[-1deg]' : 'transform rotate-2'}
                hover:rotate-0
              `}
            >
              <div className={`
                w-16 h-16 rounded-2xl flex items-center justify-center mb-4
                transform rotate-2 group-hover:rotate-0 transition-transform duration-300
                ${feature.bgColor}
              `}>
                <feature.icon className="w-6 h-6 text-gray-700" />
                <Sparkles className="absolute top-[-2px] right-[-2px] w-6 h-6 text-yellow-400 opacity-60" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-2 font-fredoka">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {feature.description}
              </p>
              
              <ArrowRight className="w-6 h-4 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}