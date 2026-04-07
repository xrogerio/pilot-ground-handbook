DO $BODY$
DECLARE
  v_aircraft_id text := '7';
  v_json json := $DATA${
  "secoes": [
    {
      "id": "1",
      "titulo": "Geral",
      "subsecoes": [
        {
          "titulo": "1.1 Descrição geral da aeronave",
          "descricao": "A aeronave é do tipo convencional de dois passageiros, asa alta com montantes (semicantilever), trem de pouso tipo triciclo fixo, equipada com motor BRP ROTAX 912 ULS, hélice Warp Drive 68RWT3HPL de três pás com passo fixo.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "1.2 Especificações da aeronave",
          "descricao": "Tabela com características gerais da aeronave em sistema imperial e internacional.",
          "imagens": [],
          "tabelas": [
            {
              "nome": "Tabela 1 – Especificações gerais",
              "colunas": ["DESCRIÇÃO", "SISTEMA IMPERIAL", "SISTEMA INTERNACIONAL"],
              "linhas": [
                {"DESCRIÇÃO": "Envergadura da asa", "SISTEMA IMPERIAL": "28 ft 10 in", "SISTEMA INTERNACIONAL": "8,30 m"},
                {"DESCRIÇÃO": "Área alar", "SISTEMA IMPERIAL": "124 ft²", "SISTEMA INTERNACIONAL": "11,50 m²"},
                {"DESCRIÇÃO": "Comprimento máximo da aeronave", "SISTEMA IMPERIAL": "21 ft", "SISTEMA INTERNACIONAL": "6,40 m"},
                {"DESCRIÇÃO": "Altura máxima da aeronave", "SISTEMA IMPERIAL": "7ft 8 in", "SISTEMA INTERNACIONAL": "2,35 m"},
                {"DESCRIÇÃO": "Peso vazio", "SISTEMA IMPERIAL": "905,2 lb", "SISTEMA INTERNACIONAL": "410,6 kg"},
                {"DESCRIÇÃO": "Peso máximo de decolagem", "SISTEMA IMPERIAL": "1320 lb", "SISTEMA INTERNACIONAL": "600 kg"},
                {"DESCRIÇÃO": "Alcance para tanque cheio, reserva de 30 minutos, a 1000ft e motor a 4800rpm", "SISTEMA IMPERIAL": "780 nm", "SISTEMA INTERNACIONAL": "1440 km"},
                {"DESCRIÇÃO": "Velocidade para melhor ângulo de subida (VX)", "SISTEMA IMPERIAL": "63 mph", "SISTEMA INTERNACIONAL": "55 knots"},
                {"DESCRIÇÃO": "Velocidade para melhor razão de subida (VY)", "SISTEMA IMPERIAL": "75 mph", "SISTEMA INTERNACIONAL": "65 knots"},
                {"DESCRIÇÃO": "Velocidade de estol (flaps em Posição 2) em IAS", "SISTEMA IMPERIAL": "45 mph", "SISTEMA INTERNACIONAL": "39 knots"},
                {"DESCRIÇÃO": "Velocidade de estol (flaps em Posição 0) em IAS", "SISTEMA IMPERIAL": "52 mph", "SISTEMA INTERNACIONAL": "45 knots"},
                {"DESCRIÇÃO": "Velocidade máxima ao nível do mar em IAS", "SISTEMA IMPERIAL": "137 mph", "SISTEMA INTERNACIONAL": "119 knots"},
                {"DESCRIÇÃO": "Velocidade de cruzeiro a 1000 ft - 4500 rpm", "SISTEMA IMPERIAL": "96 mph", "SISTEMA INTERNACIONAL": "84 knots"},
                {"DESCRIÇÃO": "Velocidade de cruzeiro a 1000 ft - 4800 rpm", "SISTEMA IMPERIAL": "104 mph", "SISTEMA INTERNACIONAL": "90 knots"},
                {"DESCRIÇÃO": "Velocidade de cruzeiro a 1000 ft - 5200 rpm", "SISTEMA IMPERIAL": "120 mph", "SISTEMA INTERNACIONAL": "105 knots"},
                {"DESCRIÇÃO": "Potência máxima do motor a 5800 rpm", "SISTEMA IMPERIAL": "98,5 hp", "SISTEMA INTERNACIONAL": "73,5 kW"},
                {"DESCRIÇÃO": "Volume máximo de combustível", "SISTEMA IMPERIAL": "37 gal", "SISTEMA INTERNACIONAL": "140 l"},
                {"DESCRIÇÃO": "Volume máximo de combustível utilizado", "SISTEMA IMPERIAL": "36 gal", "SISTEMA INTERNACIONAL": "136 l"},
                {"DESCRIÇÃO": "Combustível aprovado", "SISTEMA IMPERIAL": "AVGAS 100LL", "SISTEMA INTERNACIONAL": "AVGAS 100LL"}
              ]
            }
          ],
          "graficos": []
        }
      ]
    },
    {
      "id": "2",
      "titulo": "Limitações",
      "subsecoes": [
        {
          "titulo": "2.1 Velocidades limites e faixas do indicador de velocidades",
          "descricao": "Apresenta as marcações no indicador de velocidades e as velocidades limites da aeronave.",
          "imagens": [],
          "tabelas": [
            {
              "nome": "Tabela 2 - Marcações no indicador de velocidades",
              "colunas": ["INDICAÇÃO", "MPH", "KTS", "DESCRIÇÃO"],
              "linhas": [
                {"INDICAÇÃO": "ARCO BRANCO", "MPH": "45 - 90", "KTS": "39 – 78", "DESCRIÇÃO": "Faixa de operação com flaps em Posição 2 (VSO a VF)"},
                {"INDICAÇÃO": "ARCO VERDE", "MPH": "52 - 124", "KTS": "45 – 107", "DESCRIÇÃO": "Faixa de operação com flaps em Posição 0 (VS a VC)"},
                {"INDICAÇÃO": "ARCO AMARELO", "MPH": "124 - 135", "KTS": "107 – 117", "DESCRIÇÃO": "Operação deve ser conduzida com cuidado e ar calmo (VC a VNE)"},
                {"INDICAÇÃO": "TRAÇO VERMELHO", "MPH": "135", "KTS": "117", "DESCRIÇÃO": "Nunca operar acima deste traço (>VNE)"}
              ]
            },
            {
              "nome": "Tabela 3 - Velocidades limites",
              "colunas": ["VELOCIDADE IAS (INDICATED AIRSPEED)", "MPH", "KTS"],
              "linhas": [
                {"VELOCIDADE IAS (INDICATED AIRSPEED)": "Velocidade de estol com flaps em Posição 0 (VS)", "MPH": "52", "KTS": "45"},
                {"VELOCIDADE IAS (INDICATED AIRSPEED)": "Velocidade de estol com flaps em Posição 1 (VS1)", "MPH": "46", "KTS": "40"},
                {"VELOCIDADE IAS (INDICATED AIRSPEED)": "Velocidade de estol com flaps em Posição 2 (VSO)", "MPH": "45", "KTS": "39"},
                {"VELOCIDADE IAS (INDICATED AIRSPEED)": "Velocidade máxima com flaps em Posição 2 (VF)", "MPH": "90", "KTS": "78"},
                {"VELOCIDADE IAS (INDICATED AIRSPEED)": "Velocidade de manobra (VA)", "MPH": "101", "KTS": "88"},
                {"VELOCIDADE IAS (INDICATED AIRSPEED)": "Velocidade de manobra operacional (Vo)", "MPH": "101", "KTS": "88"},
                {"VELOCIDADE IAS (INDICATED AIRSPEED)": "Velocidade máxima (VNE)", "MPH": "135", "KTS": "117"}
              ]
            },
            {
              "nome": "Tabela 4 – Posições dos flaps",
              "colunas": ["POSIÇÃO", "FINALIDADE"],
              "linhas": [
                {"POSIÇÃO": "Posição 0", "FINALIDADE": "Voo de Cruzeiro e Subida"},
                {"POSIÇÃO": "Posição 1", "FINALIDADE": "Decolagem"},
                {"POSIÇÃO": "Posição 2", "FINALIDADE": "Pouso"}
              ]
            }
          ],
          "graficos": []
        },
        {
          "titulo": "2.2 Teto de serviço",
          "descricao": "O teto de serviço da aeronave é 12.500 ft (3.800 m). A aeronave não possui cabine pressurizada, nem fornecimento de oxigênio aos passageiros, portanto é proibido operar em altitudes superiores a 12.500 ft.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "2.3 Fatores de carga",
          "descricao": "Tabela com os fatores de carga limites para diferentes velocidades.",
          "imagens": [],
          "tabelas": [
            {
              "nome": "Tabela 5 - Fatores de carga limites",
              "colunas": ["VELOCIDADE", "FATOR DE CARGA POSITIVO (+)", "FATOR DE CARGA NEGATIVO (-)"],
              "linhas": [
                {"VELOCIDADE": "VA", "FATOR DE CARGA POSITIVO (+)": "+4,0 g", "FATOR DE CARGA NEGATIVO (-)": "-2,0 g"},
                {"VELOCIDADE": "VNE", "FATOR DE CARGA POSITIVO (+)": "+3,8 g", "FATOR DE CARGA NEGATIVO (-)": "-1,3 g"},
                {"VELOCIDADE": "Com flaps estendidos", "FATOR DE CARGA POSITIVO (+)": "+2,0 g", "FATOR DE CARGA NEGATIVO (-)": "0 g"}
              ]
            }
          ],
          "graficos": []
        },
        {
          "titulo": "2.4 Manobras autorizadas",
          "descricao": "A aeronave não se enquadra na categoria acrobática. São permitidas: curva com ângulo de rolamento máximo de 60°; guinada com ângulo máximo de 15°; estol forçado sem rolamento ou parafuso; mergulho com velocidade máxima de 135 mph / 117 kts (VNE); manobra de parafuso. Manobras com fator de carga negativo (menor que -0,5) não devem ter duração maior que 5 segundos. Limites operacionais para manobra de parafuso com e sem uso de flap são detalhados.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "2.5 Especificações de combustível",
          "descricao": "Os tanques de combustível têm capacidade para 140 litros (70 litros por semi-asa). A quantidade utilizável é 136 litros (68 litros por tanque). O combustível recomendado é AVGAS 100LL. A configuração sem combustível possui peso igual a 401,7 kgf.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "2.6 Limitações do motor",
          "descricao": "Especificações e limites operacionais do motor BRP ROTAX 912 ULS, incluindo temperaturas, pressões de óleo e combustível, e faixas de rotação.",
          "imagens": [],
          "tabelas": [
            {
              "nome": "Tabela 6 - Especificações do motor BRP ROTAX 912 ULS",
              "colunas": ["ESPECIFICAÇÕES", "MODELO BRP ROTAX 912 ULS"],
              "linhas": [
                {"ESPECIFICAÇÕES": "Tipo", "MODELO BRP ROTAX 912 ULS": "4 Cilindros horizontalmente opostos"},
                {"ESPECIFICAÇÕES": "Cilindrada", "MODELO BRP ROTAX 912 ULS": "1352 cm³"},
                {"ESPECIFICAÇÕES": "Consumo de combustível a 75% da potência máxima contínua 6000 ft", "MODELO BRP ROTAX 912 ULS": "18,5 l/h"},
                {"ESPECIFICAÇÕES": "Velocidade potência mínima", "MODELO BRP ROTAX 912 ULS": "1400 rpm (mín.)"},
                {"ESPECIFICAÇÕES": "Velocidade de rotação máxima para regime contínuo", "MODELO BRP ROTAX 912 ULS": "5500 rpm"},
                {"ESPECIFICAÇÕES": "Velocidade de rotação máxima para regime de utilização rápido (decolagem)", "MODELO BRP ROTAX 912 ULS": "5800 rpm"},
                {"ESPECIFICAÇÕES": "Máxima potência a 5800rpm", "MODELO BRP ROTAX 912 ULS": "98,5 hp"},
                {"ESPECIFICAÇÕES": "Máxima potência a 5500rpm", "MODELO BRP ROTAX 912 ULS": "92,5 hp"},
                {"ESPECIFICAÇÕES": "Temperatura máxima da cabeça do cilindro", "MODELO BRP ROTAX 912 ULS": "150°C"},
                {"ESPECIFICAÇÕES": "Temperatura máxima do fluido refrigerante", "MODELO BRP ROTAX 912 ULS": "120°C (Monitoramento permanente é necessário)"},
                {"ESPECIFICAÇÕES": "Pressão do óleo do motor - Máximo", "MODELO BRP ROTAX 912 ULS": "102 psi / 7 kgf/cm² / 7 bar (na ignição a frio, permitido por curtos períodos de tempo)"},
                {"ESPECIFICAÇÕES": "Pressão do óleo do motor - Mínimo", "MODELO BRP ROTAX 912 ULS": "12 psi / 0,8 kgf/cm² / 0,8 bar (abaixo de 3500 rpm)"},
                {"ESPECIFICAÇÕES": "Pressão do óleo do motor - Normal", "MODELO BRP ROTAX 912 ULS": "29 – 73 psi / 2 – 5 kgf/cm² / 2 – 5 bar (acima de 3500 rpm)"},
                {"ESPECIFICAÇÕES": "Temperatura do óleo do motor - Máximo", "MODELO BRP ROTAX 912 ULS": "130°C"},
                {"ESPECIFICAÇÕES": "Temperatura do óleo do motor - Desejável", "MODELO BRP ROTAX 912 ULS": "90°C a 110°C"},
                {"ESPECIFICAÇÕES": "Temperatura do óleo do motor - Mínimo", "MODELO BRP ROTAX 912 ULS": "50°C"},
                {"ESPECIFICAÇÕES": "Pressão de combustível - Máximo", "MODELO BRP ROTAX 912 ULS": "5,8 psi / 0,4 kgf/cm² / 0,4 bar"},
                {"ESPECIFICAÇÕES": "Pressão de combustível - Mínimo", "MODELO BRP ROTAX 912 ULS": "2,2 psi / 0,15 kgf/cm² / 0,15 bar"},
                {"ESPECIFICAÇÕES": "Faixa de temperatura ambiente permissível", "MODELO BRP ROTAX 912 ULS": "-25°C a 50°C"}
              ]
            },
            {
              "nome": "Tabela 7 - Informações sobre óleo do motor",
              "colunas": ["CAMPO", "VALOR"],
              "linhas": [
                {"CAMPO": "MARCA", "VALOR": "SHELL"},
                {"CAMPO": "DESCRIÇÃO", "VALOR": "AeroShellOil Sport Plus 4"},
                {"CAMPO": "NÍVEL DE DESEMPENHO", "VALOR": "API SG ou maior"},
                {"CAMPO": "ESPECIFICAÇÃO", "VALOR": "RON 424"},
                {"CAMPO": "VISCOSIDADE", "VALOR": "SAE 10W-40"},
                {"CAMPO": "CAPACIDADE", "VALOR": "3L (mínimo 2,5L)"}
              ]
            }
          ],
          "graficos": []
        },
        {
          "titulo": "2.7 Limitações meteorológicas",
          "descricao": "A aeronave é aprovada para voos VFR diurnos e, com painel 03, voos noturnos VFR sem nuvens em baixas altitudes. A velocidade máxima de rajada suportável é de 10,3 m/s ou 20 kts. São proibidos voos com possibilidade de formação de gelo.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "2.8 Tipo de Operação",
          "descricao": "O Montaer MC01 é aprovado para: VFR diurno para painéis de configuração 1 e 2; VFR noturno para painéis de configuração 3. As luzes do painel possuem potenciômetro (dimmer) para controle da iluminância.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        }
      ]
    },
    {
      "id": "3",
      "titulo": "Procedimentos de Emergência",
      "subsecoes": [
        {
          "titulo": "3.1 Falhas no motor",
          "descricao": "Procedimentos para fogo no motor durante partida no solo, fogo durante decolagem, falha de motor na corrida de decolagem, falha imediatamente após decolagem e falha durante o voo. Inclui procedimentos detalhados passo a passo para cada situação.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "3.1.1 Fogo no motor durante a partida no solo",
          "descricao": "1- Magneto: DESLIGAR. 2- Chave seletora: POSIÇÃO FECHADO. 3- Extintor de incêndio portátil: RETIRAR E PREPARAR PARA O USO CASO NECESSÁRIO. 4- Aeronave: ABANDONAR. Não utilizar capas protetoras ou plásticos Dracon/Nylon para extinguir o fogo.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "3.1.2 Fogo no motor durante a decolagem",
          "descricao": "Se ainda na corrida com espaço para frear: reduzir potência, aplicar freios, desligar ignição, desligar chave geral, fechar seletora, abandonar, extinguir fogo. Se sem espaço para frear: aplicar potência máxima, flaps posição 1, atingir altitude segura, comunicar emergência, proceder com pouso de emergência.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "3.1.3 Falha de motor na corrida de decolagem",
          "descricao": "Se ainda no início com espaço para frear: aplicar freios conforme necessidade, potência mínima, flaps posição 0, desligar ignição, chave seletora posição fechado, desligar chave geral.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "3.1.4 Falha de motor imediatamente após a decolagem",
          "descricao": "Baixar o nariz e estabelecer planeio a cerca de 83 mph (72 kts), manter linha reta com desvios suaves, manete de acordo com situação, destravar portas antes do pouso, toque com cauda levemente abaixada, fechar seletora, abandonar aeronave.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "3.1.5 Falha de motor durante o voo",
          "descricao": "Tentativa de reacionamento: estabelecer planeio a ~83 mph (72 kts), potência mínima, recolher afogador, abrir seletora, ligar ignição, acionar partida. Se não acionar, ligar bomba elétrica e repetir. Se ainda não acionar, proceder com pouso de emergência (Seção 3.2).",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "3.2 Pouso de emergência",
          "descricao": "Procedimentos padrão e específicos para pouso de emergência com motor desligado e com motor ligado.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "3.2.1 Procedimento padrão para todo pouso de emergência",
          "descricao": "Cintos ajustados, velocidade 83 mph (72 kts), transmitir MAYDAY na frequência 121,50 MHz, transponder em 7700, ativar ELT se fora do aeroporto, escolher local adequado, identificar obstáculos e direção do vento, proteger rosto em previsão de impacto severo.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "3.2.2 Pouso de emergência com motor desligado",
          "descricao": "Velocidade 83 mph (72 kts), potência mínima, seletora fechada, ignição ligada, reduzir para 65 mph (56 kts), flaps posição 2, desligar chave geral, ativar ELT, escolher local, pousar contra o vento, destravar portas, toque com cauda levemente abaixada, aplicar freios, abandonar aeronave.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "3.2.3 Pouso de emergência com motor ligado",
          "descricao": "Velocidade 83 mph (72 kts), flaps posição 0, escolher local, sobrevoar e observar terreno, identificar vento, desligar interruptores exceto ignição, reduzir para 65 mph (56 kts), flaps posição 2, destravar portas, desligar chave geral, toque com cauda levemente abaixada, fechar seletora, aplicar freios, abandonar.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "3.3 Fogo",
          "descricao": "Procedimentos para fogo no motor durante o voo, fogo no sistema elétrico durante o voo, fogo na cabine e fogo na asa.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "3.3.1 Fogo no motor durante o voo",
          "descricao": "Fechar seletora, potência mínima até parada do motor, desligar ignição, desligar chave geral, planeio a ~83 mph (72 kts), executar pouso de emergência com motor desligado (Seção 3.2.2).",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "3.3.2 Fogo no sistema elétrico durante o voo",
          "descricao": "Desligar chave geral, manter motor funcionando, fechar ventilação, extinguir fogo, ventilar cabine. Desligar todos os interruptores exceto magnetos. Se necessário reativar energia: abrir ventilação, armar disjuntor de navegação (apenas uma vez), ligar chave geral, comunicação, proceder com pouso com motor ligado.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "3.3.3 Fogo na cabine",
          "descricao": "Desligar chave geral, manter motor funcionando, fechar ventilação das janelas, extinguir fogo, ventilar cabine após extinção, seguir procedimento de pouso de emergência com motor ligado (Seção 3.2.3).",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "3.3.4 Fogo na asa",
          "descricao": "Desligar Pitot Heater, luzes de navegação e strobelight, realizar glissagem para manter chama afastada do tanque, seguir procedimento de pouso com motor ligado, usar flaps somente na aproximação final, desligar chave geral e ignição, fechar seletora, evacuar pela porta oposta à asa em chamas, extinguir fogo.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "3.4 Pressão de óleo do motor",
          "descricao": "3.4.1 Perda de pressão: seguir procedimento de pouso com motor ligado; em caso de falha do motor, pouso com motor desligado. 3.4.2 Pressão acima do normal: velocidade 83 mph (72 kts), potência mínima, verificar novamente; se normalizado, pouso com motor ligado; se ainda acima, desligar motor e pouso com motor desligado.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "3.5 Temperatura de óleo do motor",
          "descricao": "3.5.1 Temperatura acima do limite: reduzir potência e verificar redução de temperatura, aplicar potência gradualmente monitorando. Se não retornar ao normal, proceder com pouso de emergência com motor ligado e, em caso de falha, com motor desligado.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "3.6 Pressão de combustível do motor",
          "descricao": "Se pressão fora dos limites: velocidade 83 mph (72 kts), ajustar potência ao mínimo necessário, fechar seletora, verificar novamente; se normalizado, pouso com motor ligado; se fora dos limites, desligar motor e pouso com motor desligado.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "3.7 Atitudes inesperadas de voo",
          "descricao": "3.7.1 Descida de emergência: manter manche em picada, potência mínima, velocidade IAS abaixo da VNE, atingir altura segura, cabrar suavemente até nivelamento respeitando limite de +4g.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "3.8 Falhas no magneto",
          "descricao": "Falha de um magneto: pousar no aeródromo mais próximo. Falha dos dois magnetos na corrida: aplicar freios, potência mínima, flaps 0, desligar ignição, fechar seletora, desligar chave geral. Falha após decolagem: estabelecer planeio a ~83 mph, manter linha reta. Durante o voo: tentar reacionar como procedimento padrão; se não funcionar, pouso de emergência.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "3.9 Falha no retificador de voltagem",
          "descricao": "Seguir procedimento de pouso de emergência com motor ligado (Seção 3.2.3).",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "3.10 Sobretensão",
          "descricao": "Voltagem alta: desligar chave geral (posição OFF) e seguir procedimento de pouso de emergência com motor ligado (Seção 3.2.3).",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "3.11 Gelo nas superfícies",
          "descricao": "É expressamente proibido voar em áreas com condições de gelo. Se ocorrer inadvertidamente: ligar Pitot Heater, seguir procedimento de descida de emergência, avaliar instrumentos do motor, verificar pressão de combustível, inspecionar bordo de ataque e superfícies de comando, se necessário pouso de emergência com motor ligado.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "3.12 Problemas mecânicos durante o voo",
          "descricao": "3.12.1 Fortes vibrações pelo motor/hélice: potência mínima, desligar ignição, velocidade 83 mph (72 kts), pouso com motor desligado. 3.12.2 Fortes vibrações pela estrutura (flutter): reduzir para 63 mph (55 kts), evitar manobras bruscas, pouso com motor ligado, flaps somente na aproximação final.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "3.13 Problemas nos instrumentos primários durante o voo",
          "descricao": "3.13.1 Falha no IAS: ignorar velocímetro, assumir velocidade pelo GPS, pousar normalmente conforme Seção 5.10 ou 5.11. 3.13.2 Falha no IAS e altímetro: ignorar ambos, assumir velocidade e altura pelo GPS, pousar normalmente.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "3.14 Problemas nos comandos durante o voo",
          "descricao": "3.14.1 Falha total dos comandos: potência mínima, ignição ligada, transmitir MAYDAY em 121,5 MHz, transponder 7700, fechar seletora, destravar portas. 3.14.2/3.14.3 Perda do profundor: manter 70-75 mph com compensador, proceder para pouso. 3.14.4 Perda dos ailerons: usar leme com deflexões maiores, evitar curvas fechadas. 3.14.5 Perda do leme: usar ailerons suavemente, evitar rolagem acentuada.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "3.15 Problemas com o trem de pouso principal – pneu furado",
          "descricao": "Para pouso: aproximação normal, flaps posição 2, tocar com o pneu bom e manter outra roda fora do solo o maior tempo possível, manter asa do lado da roda boa abaixada. Para decolagem: abortar se houver espaço, caso contrário decolar e seguir procedimentos de pouso com pneu furado.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "3.16 Problemas com o trem de pouso auxiliar – pneu furado",
          "descricao": "Para pouso: aproximação normal, flaps posição 2, tocar com trem principal e manter nariz em atitude picada (roda da triquilha no ar) o maior tempo possível. Para decolagem: abortar se possível, caso contrário decolar e seguir procedimentos.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "3.17 Quebra do Para-brisa",
          "descricao": "Se o para-brisa quebrar após colisão, o desempenho será significativamente reduzido. Abrir janelas (quebrando-as) e pousar no aeródromo mais próximo seguindo procedimento de pouso com motor ligado (Seção 3.2.3).",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "3.18 Parafuso Inadvertido",
          "descricao": "Potência mínima (IDLE), ailerons na posição neutra, leme totalmente oposto ao movimento de giro, quando leme atingir batente mover manche para frente para romper o stall. Manter até recuperação do stall. À medida que a rotação parar, neutralizar leme e fazer recuperação suave de mergulho.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "3.19 Condição de espiral",
          "descricao": "Durante um procedimento de parafuso, a aeronave pode entrar em condição de espiral, mergulhando em trajetória espiralada ao redor do eixo vertical sem estar estolada. Essa condição é crítica e requer recuperação imediata.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        }
      ]
    },
    {
      "id": "4",
      "titulo": "Procedimentos Normais",
      "subsecoes": [
        {
          "titulo": "4.1 Inspeção pré-voo",
          "descricao": "O piloto deve verificar as condições gerais da aeronave. A aeronave não pode apresentar danos, água de chuva, neve, gelo ou sujeira. O preenchimento da ficha de Peso e Balanceamento é mandatório antes de cada voo.",
          "imagens": [],
          "tabelas": [
            {
              "nome": "Tabela 8 – Principais itens externos a serem inspecionados",
              "colunas": ["REGIÃO", "COMPONENTES LOCALIZADOS NA REGIÃO EXTERNA EM DESTAQUE"],
              "linhas": [
                {"REGIÃO": "A", "COMPONENTES LOCALIZADOS NA REGIÃO EXTERNA EM DESTAQUE": "Spinner e hélice"},
                {"REGIÃO": "B", "COMPONENTES LOCALIZADOS NA REGIÃO EXTERNA EM DESTAQUE": "Triquilha"},
                {"REGIÃO": "C", "COMPONENTES LOCALIZADOS NA REGIÃO EXTERNA EM DESTAQUE": "Para-brisa"},
                {"REGIÃO": "D", "COMPONENTES LOCALIZADOS NA REGIÃO EXTERNA EM DESTAQUE": "Tampa e bocal de abastecimento do tanque de combustível esquerdo"},
                {"REGIÃO": "E", "COMPONENTES LOCALIZADOS NA REGIÃO EXTERNA EM DESTAQUE": "Farol esquerdo e Tubo de Pitot"},
                {"REGIÃO": "F, G, H", "COMPONENTES LOCALIZADOS NA REGIÃO EXTERNA EM DESTAQUE": "Articulações do aileron e flaps esquerdos"},
                {"REGIÃO": "I", "COMPONENTES LOCALIZADOS NA REGIÃO EXTERNA EM DESTAQUE": "Compensador e articulação do profundor"},
                {"REGIÃO": "J", "COMPONENTES LOCALIZADOS NA REGIÃO EXTERNA EM DESTAQUE": "Fixação da deriva e tomada estática"},
                {"REGIÃO": "K, L, M", "COMPONENTES LOCALIZADOS NA REGIÃO EXTERNA EM DESTAQUE": "Articulações do aileron e flaps direitos"},
                {"REGIÃO": "N", "COMPONENTES LOCALIZADOS NA REGIÃO EXTERNA EM DESTAQUE": "Farol direito"},
                {"REGIÃO": "O", "COMPONENTES LOCALIZADOS NA REGIÃO EXTERNA EM DESTAQUE": "Tampa e bocal de abastecimento do tanque de combustível direito"},
                {"REGIÃO": "P", "COMPONENTES LOCALIZADOS NA REGIÃO EXTERNA EM DESTAQUE": "Janela de inspeção do motor (Reservatórios de fluidos) e Tubo de Venturi"}
              ]
            }
          ],
          "graficos": []
        },
        {
          "titulo": "4.1.1 Aeronave completa",
          "descricao": "1- Proteções e travas: REMOVER. 2- Exterior: limpa, sem água de chuva, neve, gelo, excesso de poeira ou lama. 3- Alinhamento: VERIFICAR VISUALMENTE. 4- Danos externos: NÃO DEVE HAVER NENHUM.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "4.1.2 Grupo motopropulsor",
          "descricao": "Verificação da ignição (desligada), hélice e spinner (intactos e firmes), escapamento (sem trincas), sistema de refrigeração (sem obstrução e vazamentos), berço do motor e coxins (sem trincas), cabos e mangueiras (intactos), carenagem (intacta e firme). Verificar nível de óleo, fluido de refrigeração e fluido de freio.",
          "imagens": [],
          "tabelas": [
            {
              "nome": "Tabela 9 – Verificação do nível de óleo do motor",
              "colunas": ["PASSO", "PROCEDIMENTO"],
              "linhas": [
                {"PASSO": "1", "PROCEDIMENTO": "Retire a tampa do tanque de óleo (1)."},
                {"PASSO": "2", "PROCEDIMENTO": "Antes de verificar o nível de óleo, manualmente gire as pás da hélice no sentido da rotação do motor (sentido anti-horário, visto de frente) para que o óleo volte do motor para o reservatório."},
                {"PASSO": "3", "PROCEDIMENTO": "Este processo está completo quando o ar contido no sistema retornar ao tanque de óleo, percebido com um 'ronco' vindo do reservatório."},
                {"PASSO": "4", "PROCEDIMENTO": "Retire a vareta de medição (2) de nível de óleo."},
                {"PASSO": "5", "PROCEDIMENTO": "O nível de óleo deve estar entre as duas marcas (max/min) na vareta de medição (2)."},
                {"PASSO": "6", "PROCEDIMENTO": "Para operação normal, o óleo deve estar entre o nível máximo e mínimo. Excesso será expulso pelo suspiro. Para longos voos, repor até o máximo."},
                {"PASSO": "7", "PROCEDIMENTO": "Troque o óleo se necessário. Use apenas o óleo recomendado (AeroShellOil Sport Plus 4)."},
                {"PASSO": "8", "PROCEDIMENTO": "Confira o nível do óleo na vareta de medição (2)."},
                {"PASSO": "9", "PROCEDIMENTO": "Coloque de volta a vareta de medição (2) do nível de óleo e tampe o reservatório."}
              ]
            },
            {
              "nome": "Tabela 10 – Teste do motor",
              "colunas": ["PASSO", "PROCEDIMENTO"],
              "linhas": [
                {"PASSO": "1", "PROCEDIMENTO": "Ligue o motor e deixe-o operando por 5 minutos até que a temperatura se estabilize (temperatura de óleo entre 50 e 70°C [122-160°F])."},
                {"PASSO": "2", "PROCEDIMENTO": "Desligue o motor."},
                {"PASSO": "3", "PROCEDIMENTO": "Deixe o motor esfriar até a temperatura ambiente."},
                {"PASSO": "4", "PROCEDIMENTO": "Confira se há vazamentos."},
                {"PASSO": "5", "PROCEDIMENTO": "Confira o nível do óleo e complete, com o mesmo tipo de óleo, se necessário."}
              ]
            },
            {
              "nome": "Tabela 11 – Verificação do nível do fluido de refrigeração",
              "colunas": ["PASSO", "PROCEDIMENTO"],
              "linhas": [
                {"PASSO": "1", "PROCEDIMENTO": "Abra a tampa do radiador (1) localizada no tanque de expansão (2)."},
                {"PASSO": "2", "PROCEDIMENTO": "Verifique o nível do fluido de refrigeração. O nível deve ser completado até o topo."},
                {"PASSO": "3", "PROCEDIMENTO": "Inspecione o fluido de refrigeração. Se incolor ou muito espesso, substituir."},
                {"PASSO": "4", "PROCEDIMENTO": "Se necessário, complete o nível com fluido de refrigeração (mesmo tipo e especificação)."},
                {"PASSO": "5", "PROCEDIMENTO": "Tampe o tanque de expansão (2) (aperte a tampa com a mão)."},
                {"PASSO": "6", "PROCEDIMENTO": "Inspecione a tampa do reservatório (3) e o reservatório de fluido (4). O nível deve estar entre MAX e MIN."},
                {"PASSO": "7", "PROCEDIMENTO": "Repita o passo 4."}
              ]
            },
            {
              "nome": "Tabela 13 – Verificação do nível do fluido de freio",
              "colunas": ["PASSO", "PROCEDIMENTO"],
              "linhas": [
                {"PASSO": "1", "PROCEDIMENTO": "Abra a tampa do reservatório (1) localizada no reservatório de fluido de freio (2)."},
                {"PASSO": "2", "PROCEDIMENTO": "Verifique o nível do fluido de freio. O nível deve estar entre as indicações de MIN e MAX."},
                {"PASSO": "3", "PROCEDIMENTO": "Se necessário, complete o nível com fluido de freio (mesmo tipo e especificação). Utilize somente fluido de freio especificação ATF Tipo A, sufixo A."},
                {"PASSO": "4", "PROCEDIMENTO": "Tampe o reservatório (aperte a tampa com a mão)."}
              ]
            }
          ],
          "graficos": []
        },
        {
          "titulo": "4.1.3 Combustível",
          "descricao": "Drenar combustível dos tanques nos três drenos existentes (asa direita e esquerda, região inferior do compartimento do motor) se for o primeiro voo do dia ou se a aeronave ficou parada por mais de 6 horas. Verificar válvulas de dreno (fechadas, sem vazamento).",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "4.1.4 Trem de Pouso",
          "descricao": "Verificar pressão dos pneus (30 psi), estado dos pneus (sem rachaduras), freios (limpos, sem danos), fluido de freio (sem vazamentos), estrutura do trem de pouso principal e de nariz (sem trincas e danos).",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "4.1.5 Asa Direita",
          "descricao": "Verificar superfície da asa e montante (limpa, sem trincas), componentes de fixação (instalados, firmes), tampa do tanque de combustível (instalada e firme), suspiro do tanque (limpo, desobstruído), Tubo de Pitot (limpo, desobstruído), luz de navegação (sem danos), flaps e aileron (livres, limpos), articulações (lubrificadas, sem danos), links de comando (sem danos, firmes).",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "4.1.6 Lado direito da fuselagem",
          "descricao": "Verificar superfície da fuselagem (limpa e sem danos), para-brisa (limpo, sem danos e sem trincas), janelas (limpas, sem danos e trincas), dobradiças e travas da porta (sem danos).",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "4.1.7 Empenagens",
          "descricao": "Verificar superfície das empenagens (limpa, sem danos), leme, profundor e compensador (livres, limpos, sem danos), articulações (lubrificadas, sem danos), links de comando (sem danos, firmes), fixações do contrapeso do profundor (sem danos, firmes).",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "4.1.8 Lado esquerdo da fuselagem",
          "descricao": "Verificar superfície da fuselagem (limpa e sem danos), para-brisa (limpo, sem trincas), janelas (limpas, sem trincas), dobradiças e travas da porta (sem danos).",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "4.1.9 Asa esquerda",
          "descricao": "Verificar superfície da asa e montante (limpa, sem trincas), componentes de fixação (instalados, firmes), tampa do tanque (instalada, firme), suspiro do tanque (limpo, desobstruído), Tubo de Pitot (limpo, desobstruído), luz de navegação (sem danos), flaps e aileron (livres, limpos), articulações (lubrificadas), links de comando (sem danos, firmes).",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "4.1.10 Interior da aeronave",
          "descricao": "Verificar ignição (desligada), interior da cabine (limpo, sem objetos estranhos), assentos (sem danos, ajustados), Caderneta de Registro de Voos (a bordo), material de navegação (a bordo), extintor (a bordo), documentos (CVA, CAVE, CME, CM, seguro, etc., a bordo), compartimento de bagagem (bagagem fixa), rádio/transponder/GPS (sem danos, fixos), manche e pedais (livres, curso completo), cintos (sem danos, ajustados), portas (fechadas e travadas), flaps posição 0, disjuntores (armados).",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "4.2 Acionamento do motor",
          "descricao": "Procedimento completo para acionamento do motor: verificar nível de combustível, aeronave livre, abrir seletora, verificar rádio, desligar chaves de instrumentos e luzes auxiliares, ligar chave geral (Master), verificar instrumentos, fechar e travar portas, acionar freio de estacionamento, verificar afogador, potência mínima, área de hélice livre, acionar ignição, verificar pressão de óleo, rotação entre 1400/1800 rpm, verificar temperaturas e pressões, desligar afogador gradualmente, testar rotação máxima entre 4900/5200 rpm com freios acionados.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "4.3 Taxiamento",
          "descricao": "Liberar freio de estacionamento, verificar pista livre, usar manete conforme necessário, verificar comandos livres, monitorar instrumentos, posicionar manche (profundor neutro, ailerons contra vento de través), usar freios conforme necessário. Nota: abaixo de 4°C colocar Pitot Heater ON por no mínimo 20 minutos antes da decolagem.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "4.4 Antes da decolagem",
          "descricao": "Flaps posição 0, ajustar compensador do profundor, abrir seletora, ligar bomba elétrica de combustível, verificar tráfego e pista livres, liberar freio, zerar e acionar cronômetro. Nota: abaixo de 4°C colocar Pitot Heater ON.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "4.5 Decolagem Padrão",
          "descricao": "Pedais de comando do leme em posição neutra, freios liberados, manete em potência máxima, manche com profundor neutro e ailerons contra o vento, manter direção de decolagem, puxar profundor a 70 mph (60,8 kts), subida a 80 mph (68,5 kts) com flaps na posição 0, desligar Pitot Heater.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "4.6 Decolagem em pista curta, de grama irregular ou alta",
          "descricao": "Flaps posição 1, potência máxima, freios liberados, aliviar triquilha a 31 mph (27 kts), manter voo paralelo ao solo (~40 cm de altura sob efeito solo) até atingir 64 mph (55,6 kts), iniciar a subida.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "4.7 Subida",
          "descricao": "Recolher flaps para posição 0. Velocidade: VX = 63 mph (55 kts) para melhor ângulo; VY = 75 mph (65 kts) para melhor razão de subida. CHT máximo de 135°C. Pressão do óleo máximo 7 bars.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "4.8 Cruzeiro",
          "descricao": "Flaps posição 0, ajustar compensador conforme necessário, ajustar manete conforme necessário, monitorar nível de combustível, manter seletora em ambas abertas, obedecer limites operacionais.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "4.9 Aproximação",
          "descricao": "Reduzir para 74 mph (64 kts), estender flaps para posição 1, reduzir para 71 mph (62 kts) - em chuva ou forte turbulência aumentar 3 mph (2,6 kts), estender flaps para posição 2, rampa de descida a 67 mph (58 kts) constante - em chuva ou turbulência aumentar 3 mph (2,6 kts), potência mínima.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "4.10 Pouso Padrão",
          "descricao": "Alinhar com a pista usando pedais, eliminar derrapagem lateral, potência mínima, tocar na velocidade mínima evitando toque da cauda, segurar manche para reduzir velocidade e empurrar gradualmente para abaixar o nariz, flaps posição 0, frear conforme necessário evitando frear a velocidades altas ou com nariz levantado.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "4.11 Pouso em pista curta, de grama irregular ou alta",
          "descricao": "Reduzir para 80 mph (70 kts), flaps posição 1, reduzir para 65 mph (56 kts), flaps posição 2, velocidade de aproximação 60 mph (52 kts) - em chuva/turbulência aumentar 3 mph, alinhar com pista, eliminar derrapagem, potência mínima, tocar na velocidade mínima no início da pista, recolher flaps. Pista de grama: NÃO FREAR. Pista curta: FREAR conforme necessário.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "4.12 Pouso abortado",
          "descricao": "Manete em máxima potência, acelerar até pelo menos 83 mph (72 kts), subida a 83 mph (72 kts), recolher flaps gradativamente a uma altitude segura.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "4.13 Parafuso",
          "descricao": "O parafuso não deve ser tentado sem prévio treinamento de instrutor qualificado. Antes de iniciar, garantir que nenhum item esteja solto na cabine. Altitude mínima recomendada para entrada: 4000 pés acima do nível do solo para recuperação. A partir da segunda volta, a aeronave pode evoluir para descida em espiral, requerendo recuperação imediata conforme item 3.18.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        }
      ]
    },
    {
      "id": "5",
      "titulo": "Desempenho",
      "subsecoes": [
        {
          "titulo": "5.1 Geral",
          "descricao": "Dados relativos ao desempenho da aeronave em sua configuração básica, com Peso Máximo de Decolagem (600 kg). Os dados podem variar de acordo com o estado de conservação da aeronave e as condições meteorológicas.",
          "imagens": [],
          "tabelas": [],
          "graficos": []
        },
        {
          "titulo": "5.2 Decolagem",
          "descricao": "Para decolagem devem ser utilizados os flaps na posição 1. Distâncias de decolagem para pista livre e com obstáculo de 15 m na cabeceira.",
          "imagens": [],
          "tabelas": [
            {
              "nome": "Tabela 14 – Distância de decolagem",
              "colunas": ["CONDIÇÃO", "DESCRIÇÃO", "DISTÂNCIA DE DECOLAGEM"],
              "linhas": [
                {"CONDIÇÃO": "1", "DESCRIÇÃO": "Pista livre", "DISTÂNCIA DE DECOLAGEM": "290 m"},
                {"CONDIÇÃO": "2", "DESCRIÇÃO": "Pista com obstáculo de 15 m (50 ft) de altura", "DISTÂNCIA DE DECOLAGEM": "517 m"}
              ]
            }
          ],
          "graficos": []
        },
        {
          "titulo": "5.3 Pouso",
          "descricao": "Para pouso deve ser utilizado flaps na posição 2. Distâncias de pouso para pista livre e com obstáculo de 15 m na cabeceira.",
          "imagens": [],
          "tabelas": [
            {
              "nome": "Tabela 15 - Distâncias de pouso",
              "colunas": ["CONDIÇÃO", "DESCRIÇÃO", "DISTÂNCIA DE POUSO"],
              "linhas": [
                {"CONDIÇÃO": "1", "DESCRIÇÃO": "Pista livre", "DISTÂNCIA DE POUSO": "398 m"},
                {"CONDIÇÃO": "2", "DESCRIÇÃO": "Pista com obstáculo de 15 m (50 ft) de altura", "DISTÂNCIA DE POUSO": "622 m"}
              ]
            }
          ],
          "graficos": []
        },
        {
          "titulo": "5.4 Subida",
          "descricao": "Dados de desempenho na subida com flaps em posição 0, incluindo velocidades VX e VY e razões de subida para PMD (600 kg) em diferentes altitudes.",
          "imagens": [],
          "tabelas": [
            {
              "nome": "Tabela 16 – Desempenho na subida",
              "colunas": ["PARÂMETRO", "VALOR"],
              "linhas": [
                {"PARÂMETRO": "Velocidade para melhor ângulo de subida - (VX) KIAS", "VALOR": "63 mph | 55 kts"},
                {"PARÂMETRO": "Velocidade para maior razão de subida - (VY) KIAS", "VALOR": "75 mph | 65 kts"}
              ]
            },
            {
              "nome": "Tabela 17 – Razões de subida para PMD",
              "colunas": ["PARÂMETRO", "2000ft", "5000ft", "7000ft"],
              "linhas": [
                {"PARÂMETRO": "Razão de subida para melhor ângulo de subida - (VX)", "2000ft": "585 ft/min", "5000ft": "442 ft/min", "7000ft": "355 ft/min"},
                {"PARÂMETRO": "Máxima razão de subida - (VY)", "2000ft": "577 ft/min", "5000ft": "478 ft/min", "7000ft": "363 ft/min"}
              ]
            }
          ],
          "graficos": []
        },
        {
          "titulo": "5.5 Velocidades de cruzeiro e consumo de combustível",
          "descricao": "Velocidades de cruzeiro e consumo de combustível para determinadas rotações do motor, considerando atmosfera padrão ISA a 8000 ft de altitude sem ventos.",
          "imagens": [],
          "tabelas": [
            {
              "nome": "Tabela 18 – Velocidades de cruzeiro e consumo de combustível",
              "colunas": ["RPM", "VELOCIDADE DE CRUZEIRO (IAS)", "CONSUMO DE COMBUSTÍVEL"],
              "linhas": [
                {"RPM": "4000", "VELOCIDADE DE CRUZEIRO (IAS)": "76 mph | 66 kts", "CONSUMO DE COMBUSTÍVEL": "12,4 l/h | 3,27 gal/h"},
                {"RPM": "4500", "VELOCIDADE DE CRUZEIRO (IAS)": "93 mph | 81 kts", "CONSUMO DE COMBUSTÍVEL": "16,0 l/h | 4,22 gal/h"},
                {"RPM": "5000", "VELOCIDADE DE CRUZEIRO (IAS)": "104 mph | 90 kts", "CONSUMO DE COMBUSTÍVEL": "20,0 l/h | 5,27 gal/h"},
                {"RPM": "5500", "VELOCIDADE DE CRUZEIRO (IAS)": "113 mph | 98 kts", "CONSUMO DE COMBUSTÍVEL": "25,0 l/h | 6,75 gal/h"}
              ]
            }
          ],
          "graficos": []
        }
      ]
    }
  ]
}$DATA$;
  v_sec json;
  v_sub json;
  v_tab json;
  v_section_id uuid;
  v_subsection_id uuid;
  v_sec_id_str text;
  v_sec_titulo text;
  v_sub_titulo text;
  v_sub_desc text;
  v_order_sub int;
  v_order_tab int;
BEGIN
  -- Create aircraft if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM public.aircraft WHERE id = v_aircraft_id) THEN
    INSERT INTO public.aircraft (id, name, language) VALUES (v_aircraft_id, 'Aeronave 7', 'pt-BR');
  END IF;

  -- Clean up existing data for this aircraft to ensure idempotency
  DELETE FROM public.texts WHERE section_id IN (SELECT id FROM public.sections WHERE aircraft_id = v_aircraft_id);
  DELETE FROM public.tables WHERE section_id IN (SELECT id FROM public.sections WHERE aircraft_id = v_aircraft_id);
  DELETE FROM public.subsections WHERE section_id IN (SELECT id FROM public.sections WHERE aircraft_id = v_aircraft_id);

  FOR v_sec IN SELECT * FROM json_array_elements(v_json->'secoes')
  LOOP
    v_sec_id_str := v_sec->>'id';
    v_sec_titulo := v_sec->>'titulo';

    SELECT id INTO v_section_id
    FROM public.sections
    WHERE aircraft_id = v_aircraft_id
      AND section_number = v_sec_id_str::int
    LIMIT 1;

    IF v_section_id IS NULL THEN
      INSERT INTO public.sections (aircraft_id, section_number, section_title)
      VALUES (v_aircraft_id, v_sec_id_str::int, v_sec_titulo)
      RETURNING id INTO v_section_id;
    END IF;

    v_order_sub := 0;

    FOR v_sub IN SELECT * FROM json_array_elements(v_sec->'subsecoes')
    LOOP
      v_sub_titulo := v_sub->>'titulo';
      v_sub_desc := v_sub->>'descricao';
      v_order_sub := v_order_sub + 1;

      INSERT INTO public.subsections (section_id, title, description, order_index)
      VALUES (v_section_id, v_sub_titulo, v_sub_desc, v_order_sub)
      RETURNING id INTO v_subsection_id;

      IF v_sub_desc IS NOT NULL AND v_sub_desc <> '' THEN
        INSERT INTO public.texts (section_id, subsection_id, content, order_index)
        VALUES (v_section_id, v_subsection_id, v_sub_desc, 1);
      END IF;

      v_order_tab := 0;
      FOR v_tab IN SELECT * FROM json_array_elements(v_sub->'tabelas')
      LOOP
        v_order_tab := v_order_tab + 1;
        
        INSERT INTO public.tables (section_id, subsection_id, table_data, order_index)
        VALUES (
          v_section_id, 
          v_subsection_id, 
          json_build_object(
            'title', v_tab->>'nome',
            'headers', v_tab->'colunas',
            'rows', v_tab->'linhas'
          )::jsonb, 
          v_order_tab
        );
      END LOOP;

    END LOOP;
  END LOOP;
END;
$BODY$;
