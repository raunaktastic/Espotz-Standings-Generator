import type { Template } from '@/types'
import { TEMPLATE_CONFIGS } from '@/types'

interface TemplateGalleryProps {
  selectedTemplate: Template
  onTemplateChange: (template: Template) => void
}

export function TemplateGallery({ selectedTemplate, onTemplateChange }: TemplateGalleryProps) {
  return (
    <div className="space-y-2 h-full flex flex-col">
      <h3 className="text-sm font-semibold text-purple-200/80 uppercase tracking-wider">Templates</h3>
      
      {/* Template Categories */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-1">
        {TEMPLATE_CONFIGS.map((template) => {
          const isSelected = selectedTemplate === template.id
          
          return (
            <button
              key={template.id}
              onClick={() => onTemplateChange(template.id)}
              className={`
                w-full flex items-center gap-2 p-2 rounded-lg border transition-all duration-200 text-left
                ${isSelected 
                  ? 'bg-purple-600/20 border-purple-500/50 shadow-lg shadow-purple-500/20' 
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-500/30'
                }
              `}
            >
              <span className="text-xl">{template.icon}</span>
              <div>
                <div className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-white/80'}`}>
                  {template.name}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
