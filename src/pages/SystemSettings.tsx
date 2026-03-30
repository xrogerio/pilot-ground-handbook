import { useRef } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { useThemeContext } from '@/contexts/ThemeContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { ImagePlus, Settings, Moon, Sun, Trash2, Save, Loader2, RotateCcw } from 'lucide-react'

export default function SystemSettings() {
  const { profile } = useAuth()
  const {
    logoUrl,
    setLogoUrl,
    title,
    setTitle,
    subtitle,
    setSubtitle,
    primaryColor,
    setPrimaryColor,
    isDarkMode,
    setIsDarkMode,
    menuSections,
    setMenuSections,
    saveSettings,
    resetDefaults,
    isSaving,
  } = useThemeContext()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const isAdmin = profile?.role === 'admin'

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setLogoUrl(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSectionRename = (id: string, newTitle: string) => {
    setMenuSections(menuSections.map((s) => (s.id === id ? { ...s, title: newTitle } : s)))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2 text-primary">
            <Settings className="w-7 h-7" />
            {isAdmin ? 'Configurações do Sistema' : 'Configurações de Aparência'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isAdmin
              ? 'Personalize a identidade visual e o comportamento geral da aplicação.'
              : 'Ajuste as preferências de visualização da sua conta.'}
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {isAdmin && (
            <Button
              variant="outline"
              onClick={resetDefaults}
              disabled={isSaving}
              className="gap-2 w-full sm:w-auto"
            >
              <RotateCcw className="w-4 h-4" />
              Restaurar Padrões
            </Button>
          )}
          <Button
            onClick={saveSettings}
            disabled={isSaving}
            className="gap-2 shrink-0 w-full sm:w-auto"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Salvar Configurações
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isAdmin && (
          <Card className="shadow-sm border-border">
            <CardHeader>
              <CardTitle>Identidade Visual</CardTitle>
              <CardDescription>Logo e títulos da barra de navegação principal.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Logo do Sistema</Label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl border-2 border-dashed border-border flex items-center justify-center bg-muted/30 overflow-hidden shrink-0">
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt="Preview"
                        className="w-full h-full object-contain p-1"
                      />
                    ) : (
                      <ImagePlus className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleLogoUpload}
                    />
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full"
                      >
                        Fazer Upload
                      </Button>
                      {logoUrl && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setLogoUrl(null)}
                          className="px-3"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Recomendado: PNG ou SVG, fundo transparente.
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="bg-border" />

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título Principal</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Pilot Ground-Handbook"
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subtitle">Subtítulo</Label>
                  <Input
                    id="subtitle"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Ex: Voo Seguro"
                    className="bg-background"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className={`shadow-sm border-border ${!isAdmin ? 'md:col-span-2 max-w-2xl' : ''}`}>
          <CardHeader>
            <CardTitle>Tema e Cores</CardTitle>
            <CardDescription>
              {isAdmin
                ? 'Ajuste as cores principais e o modo de visualização em tempo real.'
                : 'Alterne entre o modo de visualização diurno e noturno.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <div className="bg-background p-2 rounded-md shadow-sm border border-border">
                  {isDarkMode ? (
                    <Moon className="w-5 h-5 text-indigo-400" />
                  ) : (
                    <Sun className="w-5 h-5 text-amber-500" />
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-sm">Modo Escuro</h4>
                  <p className="text-xs text-muted-foreground">Alternar tema diurno e noturno</p>
                </div>
              </div>
              <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
            </div>

            {isAdmin && (
              <div className="space-y-3">
                <Label>Cor Principal (Marca)</Label>
                <div className="flex gap-3 items-center">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden border-2 border-border shadow-sm shrink-0">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer"
                    />
                  </div>
                  <Input
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    placeholder="#000000"
                    className="font-mono uppercase bg-background"
                  />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mt-2">
                  Escolha a cor base da sua marca. As cores de fundo, bordas e botões serão
                  ajustadas automaticamente para criar uma paleta harmônica na aplicação inteira.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {isAdmin && (
          <Card className="md:col-span-2 shadow-sm border-border">
            <CardHeader>
              <CardTitle>Nomes das Seções do Manual</CardTitle>
              <CardDescription>
                Renomeie as seções padrão exibidas no menu lateral dos manuais de voo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {menuSections.map((section) => (
                  <div key={section.id} className="space-y-2">
                    <Label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                      {section.id === 'docs' ? 'Documentos' : `Seção ${section.id}`}
                    </Label>
                    <Input
                      value={section.title}
                      onChange={(e) => handleSectionRename(section.id, e.target.value)}
                      className="bg-background"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
