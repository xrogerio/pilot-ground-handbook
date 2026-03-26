import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { HANDBOOK_SECTIONS } from '@/data/mockHandbookData'
import { FileText } from 'lucide-react'

interface HandbookSidebarProps {
  activeSectionId: string
  onSelect: (id: string) => void
}

export function HandbookSidebar({ activeSectionId, onSelect }: HandbookSidebarProps) {
  return (
    <div className="w-full lg:w-72 shrink-0 bg-white rounded-xl border border-slate-200 shadow-sm p-2">
      <div className="p-3 pb-2 border-b border-slate-100 mb-2">
        <h3 className="font-semibold text-sm text-slate-500 uppercase tracking-wider">
          Índice do Manual
        </h3>
      </div>
      <ScrollArea className="w-full lg:h-[calc(100vh-16rem)] lg:pr-3">
        <div className="flex flex-row lg:flex-col gap-1.5 p-1 pb-4 lg:pb-1">
          {HANDBOOK_SECTIONS.map((section) => {
            const Icon = section.icon
            const isActive = activeSectionId === section.id
            return (
              <Button
                key={section.id}
                variant={isActive ? 'secondary' : 'ghost'}
                onClick={() => onSelect(section.id)}
                className={cn(
                  'justify-start font-medium transition-all shrink-0 whitespace-nowrap lg:whitespace-normal h-auto py-3',
                  isActive
                    ? 'bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 border border-blue-100'
                    : 'text-slate-600 hover:text-primary hover:bg-slate-50 border border-transparent',
                )}
              >
                <div
                  className={cn(
                    'mr-3 p-1.5 rounded-md transition-colors',
                    isActive ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400',
                  )}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-left w-full truncate lg:whitespace-normal">
                  {section.id}. {section.title}
                </span>
              </Button>
            )
          })}

          <div className="hidden lg:block my-2 border-t border-slate-100" />
          <div className="lg:hidden w-px h-10 bg-slate-200 mx-1 self-center" />

          <Button
            variant={activeSectionId === 'docs' ? 'secondary' : 'ghost'}
            onClick={() => onSelect('docs')}
            className={cn(
              'justify-start font-medium transition-all shrink-0 whitespace-nowrap lg:whitespace-normal h-auto py-3',
              activeSectionId === 'docs'
                ? 'bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800 border border-red-100'
                : 'text-slate-600 hover:text-primary hover:bg-slate-50 border border-transparent',
            )}
          >
            <div
              className={cn(
                'mr-3 p-1.5 rounded-md transition-colors',
                activeSectionId === 'docs'
                  ? 'bg-red-100 text-red-600'
                  : 'bg-slate-100 text-slate-400',
              )}
            >
              <FileText className="w-4 h-4" />
            </div>
            <span className="text-left w-full truncate lg:whitespace-normal">
              Documentos Originais
            </span>
          </Button>
        </div>
        <ScrollBar orientation="horizontal" className="lg:hidden" />
      </ScrollArea>
    </div>
  )
}
