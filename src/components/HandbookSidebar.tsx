import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { AlertTriangle, BookOpen, ShieldAlert, Activity, Scale, FileText } from 'lucide-react'
import { useThemeContext } from '@/contexts/ThemeContext'

const ICON_MAP: Record<string, React.ElementType> = {
  '1': AlertTriangle,
  '2': BookOpen,
  '3': ShieldAlert,
  '4': Activity,
  '5': Scale,
  docs: FileText,
}

interface HandbookSidebarProps {
  activeSectionId: string
  onSelect: (id: string) => void
}

export function HandbookSidebar({ activeSectionId, onSelect }: HandbookSidebarProps) {
  const { menuSections } = useThemeContext()
  const mainSections = menuSections.filter((s) => s.id !== 'docs')
  const docsSection = menuSections.find((s) => s.id === 'docs')

  return (
    <div className="w-full lg:w-72 shrink-0 bg-card rounded-xl border border-border shadow-sm p-2">
      <div className="p-3 pb-2 border-b border-slate-100 mb-2">
        <h3 className="font-semibold text-sm text-slate-500 uppercase tracking-wider">
          Índice do Manual
        </h3>
      </div>
      <ScrollArea className="w-full lg:h-[calc(100vh-16rem)] lg:pr-3">
        <div className="flex flex-row lg:flex-col gap-1.5 p-1 pb-4 lg:pb-1">
          {mainSections.map((section) => {
            const Icon = ICON_MAP[section.id] || FileText
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

          {docsSection && (
            <>
              <div className="hidden lg:block my-2 border-t border-border/50" />
              <div className="lg:hidden w-px h-10 bg-border/50 mx-1 self-center" />

              <Button
                variant={activeSectionId === 'docs' ? 'secondary' : 'ghost'}
                onClick={() => onSelect('docs')}
                className={cn(
                  'justify-start font-medium transition-all shrink-0 whitespace-nowrap lg:whitespace-normal h-auto py-3',
                  activeSectionId === 'docs'
                    ? 'bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800 border border-red-100 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-900/40 dark:border-red-900/30'
                    : 'text-muted-foreground hover:text-primary hover:bg-secondary/50 border border-transparent',
                )}
              >
                <div
                  className={cn(
                    'mr-3 p-1.5 rounded-md transition-colors',
                    activeSectionId === 'docs'
                      ? 'bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400'
                      : 'bg-secondary text-muted-foreground',
                  )}
                >
                  <FileText className="w-4 h-4" />
                </div>
                <span className="text-left w-full truncate lg:whitespace-normal">
                  {docsSection.title}
                </span>
              </Button>
            </>
          )}
        </div>
        <ScrollBar orientation="horizontal" className="lg:hidden" />
      </ScrollArea>
    </div>
  )
}
