import {
  Info,
  AlertTriangle,
  Siren,
  CheckSquare,
  TrendingUp,
  Scale,
  Settings,
  Wrench,
  BookOpen,
} from 'lucide-react'
import { HandbookSection, ContentBlock } from '@/types/handbook'

export const HANDBOOK_SECTIONS: HandbookSection[] = [
  { id: '1', title: 'Informações Gerais', icon: Info },
  { id: '2', title: 'Limitações', icon: AlertTriangle },
  { id: '3', title: 'Procedimentos de Emergência', icon: Siren },
  { id: '4', title: 'Procedimentos Normais', icon: CheckSquare },
  { id: '5', title: 'Desempenho', icon: TrendingUp },
  { id: '6', title: 'Peso e Balanceamento', icon: Scale },
  { id: '7', title: 'Descrição e Sistemas', icon: Settings },
  { id: '8', title: 'Manuseio e Manutenção', icon: Wrench },
  { id: '9', title: 'Suplementos', icon: BookOpen },
]

export function getMockHandbookContent(aircraftId: string, sectionId: string): ContentBlock[] {
  // Variations based on mock ID (1: Tecnam, 2: Inpaer, 3: Cessna)
  const isCessna = aircraftId === '3'
  const isInpaer = aircraftId === '2'
  const maxSpeed = isCessna ? 163 : isInpaer ? 135 : 145
  const seed = parseInt(aircraftId) || 1

  switch (sectionId) {
    case '1':
      return [
        {
          type: 'text',
          content:
            'Este manual contém as informações, recomendações e procedimentos necessários para a operação segura e eficiente desta aeronave. Recomenda-se que o piloto leia e compreenda totalmente este manual antes do voo inicial.',
        },
        {
          type: 'image',
          url: `https://img.usecurling.com/p/800/400?q=aircraft%20cockpit&seed=${seed}`,
          caption: 'Visão Geral do Painel de Instrumentos e Cabine',
        },
        {
          type: 'text',
          content:
            'A aeronave é projetada como um monomotor, asa alta/baixa, com trem de pouso triciclo fixo, destinado principalmente ao treinamento primário e voos de turismo sob regras VFR e IFR.',
        },
      ]
    case '2':
      return [
        {
          type: 'text',
          content:
            'Esta seção inclui limitações operacionais, marcações de instrumentos e placares de aviso básicos necessários para a operação segura do avião, seu motor, sistemas e equipamentos padrão.',
        },
        {
          type: 'table',
          title: 'Limitações de Velocidade (KIAS)',
          headers: ['Símbolo', 'KIAS', 'Significado'],
          rows: [
            ['Vne', maxSpeed.toString(), 'Velocidade nunca exceder. Não exceder esta velocidade.'],
            [
              'Vno',
              (maxSpeed - 34).toString(),
              'Máxima estrutural de cruzeiro. Não exceder exceto em ar calmo.',
            ],
            [
              'Va',
              (maxSpeed - 54).toString(),
              'Velocidade de manobra. Não aplicar controles abruptos.',
            ],
            [
              'Vfe',
              (maxSpeed - 78).toString(),
              'Máxima com flaps estendidos. Evita danos aos flaps.',
            ],
          ],
        },
      ]
    case '5':
      return [
        {
          type: 'text',
          content:
            'Os dados apresentados nos gráficos a seguir fornecem uma indicação razoavelmente precisa da performance que se pode esperar desta aeronave se operada adequadamente sob as condições indicadas.',
        },
        {
          type: 'chart',
          title: 'Desempenho de Cruzeiro (TAS vs Altitude)',
          data: [
            { alt: 'Nível do Mar', tas: 105 + seed * 3 },
            { alt: '2000 ft', tas: 108 + seed * 4 },
            { alt: '4000 ft', tas: 112 + seed * 5 },
            { alt: '6000 ft', tas: 115 + seed * 5 },
            { alt: '8000 ft', tas: 118 + seed * 4 },
            { alt: '10000 ft', tas: 114 + seed * 3 },
          ],
          config: {
            tas: { label: 'TAS (Nós)', color: 'hsl(var(--primary))' },
          },
          xKey: 'alt',
          lines: [{ key: 'tas', color: 'var(--color-tas)' }],
        },
      ]
    case '6':
      return [
        {
          type: 'text',
          content:
            'É responsabilidade do piloto em comando assegurar que o avião esteja carregado dentro dos limites aprovados de peso e centro de gravidade (CG) antes do início de qualquer voo.',
        },
        {
          type: 'image',
          url: `https://img.usecurling.com/p/800/400?q=balance%20scale&color=blue&seed=${seed}`,
          caption: 'Gráfico Envelope de Centro de Gravidade e Limites de Peso',
        },
      ]
    default:
      return [
        {
          type: 'text',
          content:
            'As informações completas para esta seção específica estão atualmente sendo integradas ao sistema digital ou referem-se a suplementos específicos instalados. Por favor, consulte o documento físico da aeronave a bordo para dados imediatamente necessários.',
        },
      ]
  }
}
