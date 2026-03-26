import { useState, useMemo } from 'react'
import {
  BrainCircuit,
  Loader2,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
} from 'lucide-react'
import { useAppContext } from '@/contexts/AppContext'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  imageUrl?: string
}

export default function QuizGenerator() {
  const { aircrafts, role } = useAppContext()
  const { user } = useAuth()
  const { toast } = useToast()

  const [selectedAircraft, setSelectedAircraft] = useState('')
  const [difficulty, setDifficulty] = useState('medium')
  const [generating, setGenerating] = useState(false)
  const [quiz, setQuiz] = useState<Question[]>([])

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)

  const [scorePercentage, setScorePercentage] = useState(0)

  const availableAircrafts = useMemo(() => {
    return role === 'aluno' ? aircrafts.filter((a) => a.linked) : aircrafts
  }, [aircrafts, role])

  const handleGenerate = async () => {
    if (!selectedAircraft) {
      toast({
        title: 'Atenção',
        description: 'Selecione uma aeronave para gerar o quiz.',
        variant: 'destructive',
      })
      return
    }

    setGenerating(true)
    try {
      const { data, error } = await supabase.functions.invoke('generate-quiz', {
        body: { aircraft_id: selectedAircraft, difficulty },
      })

      if (error) throw error

      if (data && data.questions) {
        setQuiz(data.questions)
        setAnswers({})
        setCurrentQuestionIndex(0)
        setShowResults(false)
        setScorePercentage(0)
        toast({ title: 'Sucesso', description: 'Quiz gerado com sucesso!' })
      } else {
        throw new Error('Formato de quiz inválido')
      }
    } catch (err) {
      console.error('Error generating quiz:', err)
      toast({
        title: 'Erro',
        description: 'Falha ao gerar o quiz. Tente novamente mais tarde.',
        variant: 'destructive',
      })
    } finally {
      setGenerating(false)
    }
  }

  const handleNext = () => {
    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      handleFinish()
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const handleFinish = async () => {
    let scoreCount = 0
    quiz.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) scoreCount++
    })

    const percentage = Math.round((scoreCount / quiz.length) * 100)
    const passed = percentage >= 80

    setScorePercentage(percentage)
    setShowResults(true)

    try {
      if (user) {
        await (supabase as any).from('quiz_results').insert({
          student_id: user.id,
          aircraft_id: selectedAircraft,
          score: percentage,
          passed,
          difficulty,
        })
      }
    } catch (err) {
      console.error('Error saving quiz result', err)
    }
  }

  const resetQuiz = () => {
    setQuiz([])
    setAnswers({})
    setCurrentQuestionIndex(0)
    setShowResults(false)
  }

  const currentQuestion = quiz[currentQuestionIndex]
  const isAnswered = answers[currentQuestionIndex] !== undefined

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-primary flex items-center gap-3">
          <BrainCircuit className="w-8 h-8 text-purple-600" />
          Gerador de Quiz IA
        </h1>
        <p className="text-muted-foreground mt-2 text-lg max-w-2xl">
          Teste seus conhecimentos! Nossa IA gera questões baseadas nos manuais técnicos das suas
          aeronaves.
        </p>
      </div>

      {!quiz.length && !generating && (
        <Card className="max-w-2xl mx-auto border-slate-200 shadow-sm mt-8">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-6">
            <CardTitle>Configurar Novo Quiz</CardTitle>
            <CardDescription>
              Escolha a aeronave e a dificuldade desejada (20 questões).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700">Aeronave</Label>
              <Select value={selectedAircraft} onValueChange={setSelectedAircraft}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Selecione a aeronave..." />
                </SelectTrigger>
                <SelectContent>
                  {availableAircrafts.length === 0 ? (
                    <SelectItem value="none" disabled>
                      Nenhuma aeronave disponível
                    </SelectItem>
                  ) : (
                    availableAircrafts.map((a) => (
                      <SelectItem key={a.id} value={a.id}>
                        {a.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-700">Dificuldade</Label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Selecione a dificuldade..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Fácil</SelectItem>
                  <SelectItem value="medium">Médio</SelectItem>
                  <SelectItem value="hard">Difícil</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleGenerate}
              className="w-full gap-2 bg-purple-600 hover:bg-purple-700 text-white h-11"
              disabled={!selectedAircraft || availableAircrafts.length === 0}
            >
              <BrainCircuit className="w-5 h-5" />
              Gerar Quiz com IA
            </Button>
          </CardContent>
        </Card>
      )}

      {generating && (
        <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
          <div className="relative">
            <div className="absolute inset-0 bg-purple-200 rounded-full animate-ping opacity-75"></div>
            <div className="bg-purple-100 p-4 rounded-full relative z-10">
              <BrainCircuit className="w-10 h-10 text-purple-600 animate-pulse" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-slate-800">A IA está analisando os manuais...</h3>
          <p className="text-slate-500 max-w-md">
            Gerando questões exclusivas baseadas no conteúdo técnico da aeronave selecionada. Isso
            pode levar alguns segundos.
          </p>
        </div>
      )}

      {quiz.length > 0 && !showResults && currentQuestion && (
        <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
          <div className="flex items-center justify-between text-sm font-medium text-slate-500 mb-2">
            <span>
              Questão {currentQuestionIndex + 1} de {quiz.length}
            </span>
            <span>Progresso</span>
          </div>
          <Progress
            value={(currentQuestionIndex / quiz.length) * 100}
            className="h-2 bg-slate-200"
          />

          <Card className="border-slate-200 shadow-md">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-8 leading-snug">
                {currentQuestion.question}
              </h2>

              {currentQuestion.imageUrl && (
                <div className="mb-6 flex justify-center bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <img
                    src={currentQuestion.imageUrl}
                    alt="Referência da questão"
                    className="max-h-64 object-contain rounded-lg mix-blend-multiply"
                  />
                </div>
              )}

              <RadioGroup
                value={answers[currentQuestionIndex]?.toString()}
                onValueChange={(val) =>
                  setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: parseInt(val) }))
                }
                className="space-y-3"
              >
                {currentQuestion.options.map((opt, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      'flex items-center space-x-3 border p-4 rounded-xl cursor-pointer transition-colors',
                      answers[currentQuestionIndex] === idx
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-slate-200 hover:border-purple-300 hover:bg-slate-50',
                    )}
                    onClick={() => setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: idx }))}
                  >
                    <RadioGroupItem
                      value={idx.toString()}
                      id={`opt-${idx}`}
                      className="border-purple-500 text-purple-600"
                    />
                    <Label
                      htmlFor={`opt-${idx}`}
                      className="cursor-pointer flex-1 text-base font-normal"
                    >
                      {opt}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter className="bg-slate-50/50 border-t border-slate-100 p-4 flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Anterior
              </Button>
              <Button
                onClick={handleNext}
                disabled={!isAnswered}
                className="gap-2 bg-purple-600 hover:bg-purple-700 text-white"
              >
                {currentQuestionIndex === quiz.length - 1 ? 'Finalizar Quiz' : 'Próxima'}
                {currentQuestionIndex !== quiz.length - 1 && <ArrowRight className="w-4 h-4" />}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {showResults && (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
          <Card className="overflow-hidden border-0 shadow-lg">
            <div
              className={cn('h-3 w-full', scorePercentage >= 80 ? 'bg-emerald-500' : 'bg-red-500')}
            />
            <CardContent className="p-8 text-center bg-white">
              <div className="flex justify-center mb-6">
                {scorePercentage >= 80 ? (
                  <div className="p-5 bg-emerald-100 text-emerald-600 rounded-full shadow-inner">
                    <CheckCircle2 className="w-16 h-16" />
                  </div>
                ) : (
                  <div className="p-5 bg-red-100 text-red-600 rounded-full shadow-inner">
                    <XCircle className="w-16 h-16" />
                  </div>
                )}
              </div>
              <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Resultado Final</h2>

              <div className="flex justify-center items-end gap-2 mb-4">
                <span
                  className={cn(
                    'text-6xl font-black tracking-tighter',
                    scorePercentage >= 80 ? 'text-emerald-500' : 'text-red-500',
                  )}
                >
                  {scorePercentage}%
                </span>
              </div>

              <p className="text-xl text-slate-600 mb-8 font-medium">
                {scorePercentage >= 80
                  ? 'Excelente! Você demonstrou ótimo conhecimento sobre a aeronave.'
                  : 'Você precisa de 80% para aprovação. Revise o manual e tente novamente.'}
              </p>

              <div className="flex justify-center gap-4">
                <Button onClick={resetQuiz} variant="outline" className="gap-2">
                  <RotateCcw className="w-4 h-4" /> Tentar Novamente
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <BrainCircuit className="w-6 h-6 text-purple-600" />
              Gabarito e Explicações
            </h3>

            {quiz.map((q, idx) => {
              const userAnswer = answers[idx]
              const isCorrect = userAnswer === q.correctAnswer

              return (
                <Card
                  key={idx}
                  className={cn(
                    'border-l-4 overflow-hidden',
                    isCorrect ? 'border-l-emerald-500' : 'border-l-red-500',
                  )}
                >
                  <CardContent className="p-6">
                    <div className="flex gap-3 mb-4">
                      <span
                        className={cn(
                          'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white',
                          isCorrect ? 'bg-emerald-500' : 'bg-red-500',
                        )}
                      >
                        {idx + 1}
                      </span>
                      <p className="font-semibold text-lg text-slate-800 leading-snug">
                        {q.question}
                      </p>
                    </div>

                    <div className="space-y-2 mb-6 pl-9">
                      {q.options.map((opt, optIdx) => {
                        let optStyle = 'bg-slate-50 border-slate-100 text-slate-600'
                        if (optIdx === q.correctAnswer) {
                          optStyle =
                            'bg-emerald-50 border-emerald-200 text-emerald-800 font-medium ring-1 ring-emerald-500/20'
                        } else if (optIdx === userAnswer && !isCorrect) {
                          optStyle = 'bg-red-50 border-red-200 text-red-800'
                        }

                        return (
                          <div
                            key={optIdx}
                            className={cn('p-3 rounded-lg border flex items-start gap-3', optStyle)}
                          >
                            <div className="mt-0.5">
                              {optIdx === q.correctAnswer && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              )}
                              {optIdx === userAnswer && !isCorrect && (
                                <XCircle className="w-4 h-4 text-red-500" />
                              )}
                              {optIdx !== q.correctAnswer && optIdx !== userAnswer && (
                                <div className="w-4 h-4 rounded-full border border-slate-300" />
                              )}
                            </div>
                            <span>{opt}</span>
                          </div>
                        )
                      })}
                    </div>

                    <div className="ml-9 bg-purple-50/50 p-4 rounded-xl border border-purple-100 flex items-start gap-3 text-purple-900 text-sm">
                      <BrainCircuit className="w-5 h-5 shrink-0 mt-0.5 text-purple-500" />
                      <div>
                        <span className="font-bold block mb-1">Explicação da IA:</span>
                        {q.explanation}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
