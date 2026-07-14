import type { Template } from '@/types'
import { TEMPLATE_CONFIGS } from '@/types'

interface TemplateGalleryProps {
  selectedTemplate: Template
  onTemplateChange: (template: Template) => void
}

export function TemplateGallery({ selectedTemplate, onTemplateChange }: TemplateGalleryProps) {
  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <h3 className="text-xs font-black text-white/50 uppercase tracking-widest">Templates</h3>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
      
      {/* Template Categories */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-2">
        {TEMPLATE_CONFIGS.map((template) => {
          const isSelected = selectedTemplate === template.id
          
          return (
            <button
              key={template.id}
              onClick={() => onTemplateChange(template.id)}
              className={`
                group relative w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 text-left overflow-hidden
                ${isSelected 
                  ? 'bg-gradient-to-r from-[#7f13eb]/20 to-[#8b5cf6]/10 border-[#7f13eb]/40 shadow-lg shadow-[#7f13eb]/20' 
                  : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15]'
                }
              `}
            >
              {isSelected && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#7f13eb]/10 to-transparent" />
              )}
              <div className={`relative w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all duration-300 ${
                isSelected 
                  ? 'bg-gradient-to-br from-[#7f13eb] to-[#8b5cf6] shadow-lg shadow-[#7f13eb]/30' 
                  : 'bg-white/10 group-hover:bg-white/15'
              }`}>
                {template.icon}
              </div>
              <div className="relative flex-1">
                <div className={`text-sm font-bold uppercase tracking-tight transition-colors duration-300 ${
                  isSelected ? 'text-white' : 'text-white/60 group-hover:text-white/80'
                }`}>
                  {template.name}
                </div>
              </div>
              {isSelected && (
                <div className="relative w-1.5 h-1.5 bg-[#7f13eb] rounded-full shadow-lg shadow-[#7f13eb]" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
