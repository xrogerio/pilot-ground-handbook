DO $BODY$
DECLARE
  v_aircraft_id text := '7';
  v_json json := $DATA${
  "secoes": [
    {
      "id": "6",
      "titulo": "Peso e Balanceamento e Lista de Equipamentos",
      "subsecoes": [
        {
          "titulo": "6.1 Ficha de peso e balanceamento",
          "descricao": "Esta seção mostra os limites do centro de gravidade para operação segura. É responsabilidade do piloto em comando e do operador realizar os procedimentos para medição do CG antes de cada voo. Descreve o posicionamento do CG das massas principais em relação à linha do Datum: L1 (trem dianteiro), L2 (trem traseiro), L3 (tripulantes), L4 (combustível), L5 (bagagens)."
        },
        {
          "titulo": "6.1.1 Cálculo do CG da aeronave vazia",
          "descricao": "Cálculo do CG da aeronave vazia usando balanças niveladas nos pneus. Fórmula: XCG = [massa(L1)*970 + massa(L2e)*2380 + massa(L2d)*2380] / [massa(L1) + massa(L2e) + massa(L2d)].",
          "tabelas": [
            {
              "nome": "Tabela 19 – Cálculo do CG vazio",
              "colunas": ["ITEM", "POS.", "MASSA [KG]", "X", "BRAÇO DE ALAVANCA [MM]", "=", "MOMENTO [KG.MM]"],
              "linhas": [
                {"ITEM": "Nose Landing Gear", "POS.": "L1", "MASSA [KG]": "", "X": "X", "BRAÇO DE ALAVANCA [MM]": "970", "=": "=", "MOMENTO [KG.MM]": ""},
                {"ITEM": "TremPrinc. Esquerdo", "POS.": "L2e", "MASSA [KG]": "", "X": "X", "BRAÇO DE ALAVANCA [MM]": "2380", "=": "=", "MOMENTO [KG.MM]": ""},
                {"ITEM": "TremPrinc. Direito", "POS.": "L2d", "MASSA [KG]": "", "X": "X", "BRAÇO DE ALAVANCA [MM]": "2380", "=": "=", "MOMENTO [KG.MM]": ""}
              ]
            }
          ]
        },
        {
          "titulo": "6.1.2 Cálculo do CG da aeronave carregada",
          "descricao": "Cálculo do CG da aeronave para uma condição de voo qualquer. A posição do CG DEVE estar entre 2094 mm e 2224 mm (16,73% a 26,07% da CMA). A massa total NUNCA deve exceder 600 kg. Densidade do combustível: 0,72 kg/litro. Limite de bagageiro: 35 kg.",
          "tabelas": [
            {
              "nome": "Tabela 20 – Cálculo do CG da aeronave carregada",
              "colunas": ["ITEM", "POS.", "MASSA [KG]", "X", "BRAÇO DE ALAVANCA [MM]", "=", "MOMENTO [KG.MM]"],
              "linhas": [
                {"ITEM": "CG aeronave vazia + combustível não drenável", "POS.": "-", "MASSA [KG]": "", "X": "X", "BRAÇO DE ALAVANCA [MM]": "2148,88", "=": "=", "MOMENTO [KG.MM]": ""},
                {"ITEM": "Tripulantes", "POS.": "L3", "MASSA [KG]": "", "X": "X", "BRAÇO DE ALAVANCA [MM]": "2180*", "=": "=", "MOMENTO [KG.MM]": ""},
                {"ITEM": "Combustível", "POS.": "L4", "MASSA [KG]": "", "X": "X", "BRAÇO DE ALAVANCA [MM]": "2180", "=": "=", "MOMENTO [KG.MM]": ""},
                {"ITEM": "Bagageiro", "POS.": "L5", "MASSA [KG]": "", "X": "X", "BRAÇO DE ALAVANCA [MM]": "3000", "=": "=", "MOMENTO [KG.MM]": ""},
                {"ITEM": "Limite operacional", "POS.": "", "MASSA [KG]": "600 kg", "X": "", "BRAÇO DE ALAVANCA [MM]": "2094 mm e 2224 mm", "=": "", "MOMENTO [KG.MM]": ""}
              ]
            }
          ]
        },
        {
          "titulo": "6.2 Lista de equipamentos instalados",
          "descricao": "Lista completa de equipamentos/instrumentos instalados nos painéis versão 1, 2, 3A, 3B, 3C e 3I da aeronave, incluindo equipamentos do console central, manches e console superior.",
          "tabelas": [
            {
              "nome": "Tabela 21 – Lista de equipamentos / instrumentos do painel da aeronave MC01",
              "colunas": ["Nº", "DESCRIÇÃO DO EQUIPAMENTO"],
              "linhas": [
                {"Nº": "1", "DESCRIÇÃO DO EQUIPAMENTO": "VENTILAÇÃO ESQUERDA"},
                {"Nº": "2", "DESCRIÇÃO DO EQUIPAMENTO": "CHAVE MASTER"},
                {"Nº": "3", "DESCRIÇÃO DO EQUIPAMENTO": "CHAVES DO MAGNETO"},
                {"Nº": "4", "DESCRIÇÃO DO EQUIPAMENTO": "VELOCÍMETRO"},
                {"Nº": "5", "DESCRIÇÃO DO EQUIPAMENTO": "HORIZONTE ARTIFICIAL"},
                {"Nº": "6", "DESCRIÇÃO DO EQUIPAMENTO": "LUZ DO RETIFICADOR REGULADOR DE VOLTAGEM"},
                {"Nº": "7", "DESCRIÇÃO DO EQUIPAMENTO": "ALTÍMETRO"},
                {"Nº": "8", "DESCRIÇÃO DO EQUIPAMENTO": "BÚSSOLA"},
                {"Nº": "9", "DESCRIÇÃO DO EQUIPAMENTO": "CHT (Temp. da cabeça do cilindro N°2)"},
                {"Nº": "10", "DESCRIÇÃO DO EQUIPAMENTO": "TACÔMETRO"},
                {"Nº": "11", "DESCRIÇÃO DO EQUIPAMENTO": "PRESSÃO DE ÓLEO DO MOTOR"},
                {"Nº": "12", "DESCRIÇÃO DO EQUIPAMENTO": "TEMPERATURA DE ÓLEO DO MOTOR"},
                {"Nº": "13", "DESCRIÇÃO DO EQUIPAMENTO": "CHT (Temp. da cabeça do cilindro N°3)"},
                {"Nº": "14", "DESCRIÇÃO DO EQUIPAMENTO": "PRESSÃO DE COMBUSTÍVEL"},
                {"Nº": "15", "DESCRIÇÃO DO EQUIPAMENTO": "MARCADOR DE NÍVEL DE COMBUSTÍVEL"},
                {"Nº": "16", "DESCRIÇÃO DO EQUIPAMENTO": "MARCADOR DE NÍVEL DE COMBUSTÍVEL"},
                {"Nº": "17", "DESCRIÇÃO DO EQUIPAMENTO": "VENTILAÇÃO DIREITA"},
                {"Nº": "18", "DESCRIÇÃO DO EQUIPAMENTO": "VOLTÍMETRO"},
                {"Nº": "19", "DESCRIÇÃO DO EQUIPAMENTO": "RÁDIO VHF GARMIN GTR 200"},
                {"Nº": "20", "DESCRIÇÃO DO EQUIPAMENTO": "TRANSPONDER GARMIN GTX 325"},
                {"Nº": "21", "DESCRIÇÃO DO EQUIPAMENTO": "TOMADA USB"},
                {"Nº": "22", "DESCRIÇÃO DO EQUIPAMENTO": "SKYMASTER"},
                {"Nº": "23", "DESCRIÇÃO DO EQUIPAMENTO": "GPS GARMIN AERA 660"},
                {"Nº": "24", "DESCRIÇÃO DO EQUIPAMENTO": "INDICADOR DE VELOCIDADE VERTICAL"},
                {"Nº": "25", "DESCRIÇÃO DO EQUIPAMENTO": "INCLINÔMETRO"},
                {"Nº": "26", "DESCRIÇÃO DO EQUIPAMENTO": "SKYVIEW™ SE"},
                {"Nº": "27", "DESCRIÇÃO DO EQUIPAMENTO": "GARMIN GDU 460"},
                {"Nº": "28", "DESCRIÇÃO DO EQUIPAMENTO": "GMC 507"},
                {"Nº": "29", "DESCRIÇÃO DO EQUIPAMENTO": "IPAD"},
                {"Nº": "30", "DESCRIÇÃO DO EQUIPAMENTO": "PARKING BRAKE"},
                {"Nº": "31", "DESCRIÇÃO DO EQUIPAMENTO": "ENTRADA DE MÚSICA P2"},
                {"Nº": "32", "DESCRIÇÃO DO EQUIPAMENTO": "BOTÃO DO PILOTO AUTOMÁTICO"},
                {"Nº": "33", "DESCRIÇÃO DO EQUIPAMENTO": "AFOGADOR"},
                {"Nº": "34", "DESCRIÇÃO DO EQUIPAMENTO": "TRIM"},
                {"Nº": "35", "DESCRIÇÃO DO EQUIPAMENTO": "LUZES DO FLAP"},
                {"Nº": "36", "DESCRIÇÃO DO EQUIPAMENTO": "INTERRUPTOR DA BATERIA AUXILIAR DA TELA G3X"},
                {"Nº": "37", "DESCRIÇÃO DO EQUIPAMENTO": "CIRCUIT BREAKER"},
                {"Nº": "38", "DESCRIÇÃO DO EQUIPAMENTO": "HORÍMETRO"},
                {"Nº": "39", "DESCRIÇÃO DO EQUIPAMENTO": "POTENCIÔMETRO (DIMMER)"},
                {"Nº": "40", "DESCRIÇÃO DO EQUIPAMENTO": "ILUMINAÇÃO PAINEL DE LED"},
                {"Nº": "41", "DESCRIÇÃO DO EQUIPAMENTO": "Garmin G5"},
                {"Nº": "42", "DESCRIÇÃO DO EQUIPAMENTO": "Garmin Aera® 760"},
                {"Nº": "43", "DESCRIÇÃO DO EQUIPAMENTO": "Suporte de Tablet"},
                {"Nº": "44", "DESCRIÇÃO DO EQUIPAMENTO": "Indicador de ELT"},
                {"Nº": "45", "DESCRIÇÃO DO EQUIPAMENTO": "Pitot heater"},
                {"Nº": "46", "DESCRIÇÃO DO EQUIPAMENTO": "Painel de áudio GMA™ 245"},
                {"Nº": "47", "DESCRIÇÃO DO EQUIPAMENTO": "Garmin GTR255 VOR"}
              ]
            },
            {
              "nome": "Tabela 22 - Lista de instrumentos do console central da aeronave MC01",
              "colunas": ["Nº", "DESCRIÇÃO DO EQUIPAMENTO"],
              "linhas": [
                {"Nº": "43", "DESCRIÇÃO DO EQUIPAMENTO": "SELETORA"},
                {"Nº": "44", "DESCRIÇÃO DO EQUIPAMENTO": "BOTÃO DO FLAP"},
                {"Nº": "45", "DESCRIÇÃO DO EQUIPAMENTO": "MANETE DE POTÊNCIA"}
              ]
            },
            {
              "nome": "Tabela 23 - Lista de instrumentos do manche da aeronave MC01",
              "colunas": ["Nº", "DESCRIÇÃO DO EQUIPAMENTO"],
              "linhas": [
                {"Nº": "46", "DESCRIÇÃO DO EQUIPAMENTO": "BOTÃO DO TRIM TAB (AMBAS MANETES)"}
              ]
            },
            {
              "nome": "Tabela 24 - Lista de instrumentos do console superior da aeronave MC01",
              "colunas": ["Nº", "DESCRIÇÃO DO EQUIPAMENTO"],
              "linhas": [
                {"Nº": "47", "DESCRIÇÃO DO EQUIPAMENTO": "LUZ DE TETO"}
              ]
            },
            {
              "nome": "Tabela 25 - Lista de lanternas para operações noturnas",
              "colunas": ["Nº", "DESCRIÇÃO DO EQUIPAMENTO"],
              "linhas": [
                {"Nº": "48", "DESCRIÇÃO DO EQUIPAMENTO": "2 LANTERNAS"}
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "7",
      "titulo": "Descrição da Aeronave e Sistemas",
      "subsecoes": [
        {
          "titulo": "7.1 Estruturas",
          "descricao": "Descrição das estruturas principais da aeronave: asas, empenagens, fuselagem e trem de pouso."
        },
        {
          "titulo": "7.1.1 Asas",
          "descricao": "Estrutura do tipo caixa de torção em alumínio com duas longarinas e nervuras, revestimento em chapa 5052H36 de 0,020\" e 0,025\". Longarina principal com perfil C. Bordo de ataque forma caixa em D. Cada semi-asa possui 12 nervuras. Ailerons de alumínio fixados por três mancais tipo dobradiça. Flaps com longarinas e nervuras em chapa alumínio 5052 H36 e dobradiças tipo tesoura em alumínio 2024 T3."
        },
        {
          "titulo": "7.1.2 Empenagens",
          "descricao": "Empenagens em estrutura de alumínio revestidas com chapas 5052 H36. Empenagem horizontal móvel com função de estabilizador e profundor. Comando do profundor do tipo rígido transmitido por barra de conexão. Profundor com contrapeso balanceado."
        },
        {
          "titulo": "7.1.3 Fuselagem",
          "descricao": "Fuselagem tipo treliça em tubos de aço 4130 soldados, revestida com chapa de alumínio 5052 H36. Cone de cauda superior revestido por fibra de vidro pré-moldada. Posto de pilotagem fechado com portas laterais articuladas na parte dianteira. Janelas e para-brisa em policarbonato. Carenagem do motor em fibra de vidro."
        },
        {
          "titulo": "7.1.4 Trem de pouso",
          "descricao": "Trem de pouso tipo triciclo fixo, com triquilha dianteira integrada ao berço do motor. Perna do trem principal flexível em lâmina de alumínio. Triquilha dianteira com amortecedor de borracha acionável pelos pedais do leme. Freios a disco fabricados pela Freios Bill, atuados hidraulicamente e acionados independentemente. Todas as três rodas com pneus Goodyear 500x5\"."
        },
        {
          "titulo": "7.2 Comandos de voo",
          "descricao": "Superfícies aerodinâmicas móveis: ailerons, leme de direção e profundor. Sistema de duplo comando de manche e pedais. Controles mecânicos (não assistidos hidraulicamente). Profundor acionado por tirante tubular pushpull tube. Ailerons do tipo plain comandados por cabos de aço sobre roldanas. Flaps com sistema elétrico (servo motor) em 3 posições. Leme de direção por pedais e cabos de aço. Compensador (Trimtab) com acionamento elétrico por botão em cada manche. Compensador Vertical com acionamento elétrico por botão no painel central."
        },
        {
          "titulo": "7.3. Painel de instrumentos (Instrument Panel)",
          "descricao": "Describes the instrument panel configurations for the Montaer MC01 aircraft. The panel is divided into three basic areas: left side with VFR instruments, center with navigation equipment, and right side with engine instruments."
        },
        {
          "titulo": "7.3.1. Painel Versão 1 (Panel Version 1)",
          "descricao": "Standard configuration with traditional analog instruments.\n\n**Lado Esquerdo:**\n- VELOCÍMETRO - VELOCIDADE DO AR EM MPH/KNOTS (Airspeed indicator)\n- INDICADOR DE TRIM (Trim indicator)\n- INDICADOR DE FLAPS (Flaps indicator)\n- PARKING BRAKE (Parking brake)\n- ALTÍMETRO SENSÍVEL (Sensitive altimeter)\n- HORIZONTE ARTIFICIAL (Artificial horizon)\n- INCLINÔMETRO (TURN BANK) (Inclinometer/Turn bank)\n- INDICADOR DE VELOCIDADE VERTICAL (CLIMB) (Vertical speed indicator)\n- CHAVES DO MAGNETO (Magneto switches)\n- CHAVE GERAL (MASTER E PARTIDA DO MOTOR) (Master switch and engine start)\n- AFOGADOR (Choke)\n- BOTÃO DO PILOTO AUTOMÁTICO (Autopilot button)\n- ENTRADA DE MÚSICA P2 (Music input P2)\n\n**Centro:**\n- BÚSSOLA (LOGO ACIMA DO PAINEL) (Compass - above panel)\n- GPS GARMIN AERA 660\n- RÁDIO VHF GARMIN GTR200\n- Transponder GARMIN GTX325 SKYMASTER\n\n**Lado Direito:**\n- TEMPERATURA DO ÓLEO LUBRIFICANTE DO MOTOR (Engine oil temperature)\n- PRESSÃO DO ÓLEO LUBRIFICANTE DO MOTOR (Engine oil pressure)\n- VOLTÍMETRO - MEDIDOR DE VOLTAGEM (Voltmeter)\n- CHT (TEMPERATURA NA CABEÇA DOS CILINDROS 2 E 3) (Cylinder head temperature)\n- NÍVEL DE COMBUSTÍVEL (TANQUE ESQUERDO E DIREITO) (Fuel level - left and right tanks)\n- PRESSÃO DE COMBUSTÍVEL (Fuel pressure)\n- TACÔMETRO (Tachometer)\n- HORÍMETRO (Hourmeter)"
        },
        {
          "titulo": "7.3.2. Painel Versão 2 (Panel Version 2)",
          "descricao": "Configuration with Garmin G5 primary flight display replacing traditional artificial horizon.\n\n**Lado Esquerdo:**\n- VELOCÍMETRO - VELOCIDADE DO AR EM MPH/KNOTS (Airspeed indicator)\n- INDICADOR DE TRIM (Trim indicator)\n- INDICADOR DE FLAPS (Flaps indicator)\n- PARKING BRAKE (Parking brake)\n- ALTÍMETRO SENSÍVEL (Sensitive altimeter)\n- GARMIN G5 (Primary flight display)\n- INCLINÔMETRO (TURN BANK) (Inclinometer/Turn bank)\n- INDICADOR DE VELOCIDADE VERTICAL (CLIMB) (Vertical speed indicator)\n- CHAVES DO MAGNETO (Magneto switches)\n- CHAVE GERAL (MASTER E PARTIDA DO MOTOR) (Master switch and engine start)\n- AFOGADOR (Choke)\n- BOTÃO DO PILOTO AUTOMÁTICO (Autopilot button)\n- ENTRADA DE MÚSICA P2 (Music input P2)\n\n**Centro:**\n- BÚSSOLA (LOGO ACIMA DO PAINEL) (Compass - above panel)\n- GPS GARMIN AERA 660\n- RÁDIO VHF GARMIN GTR200\n- Transponder GARMIN GTX325 SKYMASTER\n- GARMIN AERA®760\n- ENTRADA USB (USB input)\n\n**Lado Direito:**\n- TEMPERATURA DO ÓLEO LUBRIFICANTE DO MOTOR (Engine oil temperature)\n- PRESSÃO DO ÓLEO LUBRIFICANTE DO MOTOR (Engine oil pressure)\n- VOLTÍMETRO - MEDIDOR DE VOLTAGEM (Voltmeter)\n- CHT (TEMPERATURA NA CABEÇA DOS CILINDROS 2 E 3) (Cylinder head temperature)\n- NÍVEL DE COMBUSTÍVEL (TANQUE ESQUERDO E DIREITO) (Fuel level - left and right tanks)\n- PRESSÃO DE COMBUSTÍVEL (Fuel pressure)\n- TACÔMETRO (Tachometer)\n- HORÍMETRO (Hourmeter)"
        },
        {
          "titulo": "7.3.3. Painel Versão 3A / 3B / 3C / 3I (Panel Version 3A/3B/3C/3I)",
          "descricao": "Advanced configuration with Garmin GDU 460 glass cockpit display and optional secondary displays. Supports both day and night VFR operations.\n\n**Lado Esquerdo:**\n- CHAVES DO MAGNETO (PAINÉIS 3A/3B/3C/3I) (Magneto switches)\n- POTENCIÔMETRO (DIMMER) (PAINÉIS 3A/3B/3C/3I) (Dimmer potentiometer)\n- CHAVE GERAL (MASTER E PARTIDA DO MOTOR) (PAINÉIS 3A/3B/3C/3I) (Master switch and engine start)\n- PARKING BRAKE (PAINÉIS 3A/3B/3C/3I) (Parking brake)\n- LUZ DO RETIFICADOR REGULADOR DE VOLTAGEM (PAINÉIS 3A/3B/3C/3I) (Voltage regulator rectifier light)\n- GARMIN GDU 460 (PAINÉIS 3A/3B/3C/3I) (Glass cockpit primary display)\n- BOTÃO DO PILOTO AUTOMÁTICO (PAINÉIS 3A/3B/3C/3I) (Autopilot button)\n- ENTRADA DE MÚSICA P2 (PAINÉIS 3A/3B/3C/3I) (Music input P2)\n- AFOGADOR (PAINÉIS 3A/3B/3C/3I) (Choke)\n- INTERRUPTOR DA BATERIA AUXILIAR DA TELA G3X (PAINÉIS 3A/3B/3C/3I) (G3X screen auxiliary battery switch)\n- INTERRUPTOR DE AQUECIMENTO DO PITOT (PITOT HEATER) (Pitot heater switch)\n\n**Centro:**\n- BÚSSOLA (LOGO ACIMA DO PAINEL) (PAINÉIS 3A/3B/3C/3I) (Compass - above panel)\n- GMC 507 – PAINEL CONTROLE DO PILOTO AUTOMÁTICO (PAINÉIS 3B/3C/3I) (Autopilot control panel)\n- GARMIN G5 (PAINÉIS 3B/3C) (Primary flight display)\n- SKYMASTER (PAINÉIS 3A/3B/3C/3I) (Electrical system display)\n- DISJUNTORES (LADO ESQUERDO) (PAINÉIS 3A/3B/3C/3I) (Circuit breakers - left side)\n- DISJUNTORES (LADO DIREITO) (PAINÉIS 3A/3B/3C/3I) (Circuit breakers - right side)\n- ENTRADA USB (PAINÉIS 3A/3B/3C/3I) (USB input)\n- LUZ DE LED NO PAINEL (PAINÉIS 3A/3B/3C/3I) (Panel LED lights)\n- GTR 255 (VHF Communications Radio)\n- GMA 245 (Audio panel)\n- GTR 200 (VHF Communications Radio)\n- GTX 325 (Transponder)\n\n**Lado Direito:**\n- HORÍMETRO (PAINÉIS 3A/3B/3C/3I) (Hourmeter)\n- GARMIN GDU 460 (PAINEL 3C/3I) (Glass cockpit secondary display)\n- INDICADOR DO ELT (PAINEL 3I) (ELT indicator)\n- GARMIN G5 (PAINÉIS 3I) (Primary flight display)",
          "tabelas": [
            {
              "nome": "Circuit Breaker Distribution - Panel Version 3A/3B/3C/3I",
              "descricao": "Distribution of circuit breakers across left and right sides of the panel",
              "colunas": ["Lado Direito", "Lado Esquerdo"],
              "linhas": [
                {"Lado Direito": "GDU PFD: 5A", "Lado Esquerdo": "ELT: 1A"},
                {"Lado Direito": "GEA: 2A", "Lado Esquerdo": "GMU: 2A"},
                {"Lado Direito": "GTR 20: 7.5A", "Lado Esquerdo": "G5: 5A"},
                {"Lado Direito": "GTX: 3A", "Lado Esquerdo": "GDU MFD: 5A"},
                {"Lado Direito": "GSU: 2A", "Lado Esquerdo": "GTR 255: 4A"},
                {"Lado Direito": "GMC: 5A", "Lado Esquerdo": "GTR 255: 10A"},
                {"Lado Direito": "GSA: (shared with GMC)", "Lado Esquerdo": ""},
                {"Lado Direito": "GMA: 5A", "Lado Esquerdo": ""}
              ]
            }
          ]
        },
        {
          "titulo": "7.4. Disjuntores (Circuit Breaker)",
          "descricao": "The electrical system for panel configuration 3 (versions A, B, or C) is protected by 20 circuit breakers that control system current. The panel is fully identified and maintenance of all breakers in good condition is mandatory.",
          "tabelas": [
            {
              "nome": "Tabela 26 – Equipamentos protegidos pelos disjuntores (Circuit Breaker)",
              "descricao": "Complete list of circuit breakers, their ratings, panel identification, protected equipment, and descriptions",
              "colunas": ["DISJUNTOR", "IDENTIFICAÇÃO", "EQUIPAMENTOS", "DESCRIÇÃO"],
              "linhas": [
                {"DISJUNTOR": "20A", "IDENTIFICAÇÃO": "P.HEATER", "EQUIPAMENTOS": "PITOT HEATER", "DESCRIÇÃO": "Interruptor do aquecimento do pitot"},
                {"DISJUNTOR": "5A", "IDENTIFICAÇÃO": "GDU MFD", "EQUIPAMENTOS": "GDU MFD", "DESCRIÇÃO": "Garmin Display Unit - Multi-Function Display"},
                {"DISJUNTOR": "5A", "IDENTIFICAÇÃO": "GDU PFD", "EQUIPAMENTOS": "GDU PFD", "DESCRIÇÃO": "Garmin Display Unit - Primary Flight Display"},
                {"DISJUNTOR": "1A", "IDENTIFICAÇÃO": "PAINEL", "EQUIPAMENTOS": "BOTÃO TRIM, BOTÃO FLAP", "DESCRIÇÃO": "Luz do botão do trim, Luz do botão do flap"},
                {"DISJUNTOR": "5A", "IDENTIFICAÇÃO": "BEACON", "EQUIPAMENTOS": "BEACON", "DESCRIÇÃO": "Luz do Beacon"},
                {"DISJUNTOR": "5A", "IDENTIFICAÇÃO": "TAXI POUSO", "EQUIPAMENTOS": "FAROL R, FAROL L", "DESCRIÇÃO": "Farol de pouso/dec/taxi lado direito, Farol de pouso/dec/taxi lado esquerdo"},
                {"DISJUNTOR": "5A", "IDENTIFICAÇÃO": "NAVEGAÇÃO", "EQUIPAMENTOS": "POS. R W, POSITION L W, POS. T", "DESCRIÇÃO": "Luz de posição do lado direito da asa (verde), Luz de posição do lado esquerdo da asa (verm.), Luz de posição da cauda (branca)"},
                {"DISJUNTOR": "7,5A", "IDENTIFICAÇÃO": "ESTROBE", "EQUIPAMENTOS": "ACL RIGHT WING, ACL LEFT WING, ACL TAIL", "DESCRIÇÃO": "Luz anti-colisão da asa direita (branca), Luz anti-colisão da asa esquerda (branca), Luz anti-colisão da cauda (branca)"},
                {"DISJUNTOR": "3A", "IDENTIFICAÇÃO": "BOMBA", "EQUIPAMENTOS": "BOMBA DE COMBUSTÍVEL", "DESCRIÇÃO": "Bomba de combustível"},
                {"DISJUNTOR": "7,5A", "IDENTIFICAÇÃO": "GTR", "EQUIPAMENTOS": "GTR20", "DESCRIÇÃO": "VHF Communications Radio"},
                {"DISJUNTOR": "3A", "IDENTIFICAÇÃO": "GTX", "EQUIPAMENTOS": "GTX 45R", "DESCRIÇÃO": "Transponder"},
                {"DISJUNTOR": "5A", "IDENTIFICAÇÃO": "G5", "EQUIPAMENTOS": "G5", "DESCRIÇÃO": "G5 FARMIN"},
                {"DISJUNTOR": "1A", "IDENTIFICAÇÃO": "ELT", "EQUIPAMENTOS": "E-04 ELT", "DESCRIÇÃO": "Transmissor Localizador de Emergência"},
                {"DISJUNTOR": "30A", "IDENTIFICAÇÃO": "MASTER", "EQUIPAMENTOS": "BATERIA", "DESCRIÇÃO": "Bateria Get Power 12volts 18ah"},
                {"DISJUNTOR": "5A", "IDENTIFICAÇÃO": "TRIM, FLAP", "EQUIPAMENTOS": "RELÉ TRIM, FLAP", "DESCRIÇÃO": "Controlador do fluxo de corrente elétrica (Trim), Controlador do fluxo de corrente elétrica (Flap)"},
                {"DISJUNTOR": "5A", "IDENTIFICAÇÃO": "BACKUP", "EQUIPAMENTOS": "BACKUP PIN5", "DESCRIÇÃO": "Bateria de BackUP TCW"},
                {"DISJUNTOR": "5A", "IDENTIFICAÇÃO": "USB, LUZ DE TETO, HORIMETRO", "EQUIPAMENTOS": "USB, LUZ TETO, HORÍMETRO", "DESCRIÇÃO": "USB 2.0, Luz de teto, Horímetro cronomac"},
                {"DISJUNTOR": "2A", "IDENTIFICAÇÃO": "GEA", "EQUIPAMENTOS": "GEA24", "DESCRIÇÃO": "Adaptador de Motor de Aeronave"},
                {"DISJUNTOR": "2A", "IDENTIFICAÇÃO": "GSU", "EQUIPAMENTOS": "GSU 25c", "DESCRIÇÃO": "Air data sensor unit"},
                {"DISJUNTOR": "2A", "IDENTIFICAÇÃO": "GMU", "EQUIPAMENTOS": "GMU 11", "DESCRIÇÃO": "Unidade de Sensor Magnético"},
                {"DISJUNTOR": "5A", "IDENTIFICAÇÃO": "GMA", "EQUIPAMENTOS": "GMA™ 245R", "DESCRIÇÃO": "Painel de áudio"},
                {"DISJUNTOR": "5A", "IDENTIFICAÇÃO": "GMC, GSA", "EQUIPAMENTOS": "GMC 507, GSA 28", "DESCRIÇÃO": "Controlador do Piloto automático, Servo do Piloto Automático"},
                {"DISJUNTOR": "4A", "IDENTIFICAÇÃO": "GTR", "EQUIPAMENTOS": "GNC 255A", "DESCRIÇÃO": "Radio comunicação aeronáutico"},
                {"DISJUNTOR": "10A", "IDENTIFICAÇÃO": "GTR", "EQUIPAMENTOS": "GNC 255A", "DESCRIÇÃO": "Radio comunicação aeronáutico"}
              ]
            }
          ]
        },
        {
          "titulo": "7.5. Motor e hélice (Engine and Propeller)",
          "descricao": "The aircraft is powered by a four-stroke internal combustion engine with horizontally-opposed cylinders, manufactured by BRP ROTAX, with 98.5 hp maximum power, AVGAS 100LL fuel, dual ignition system, air-cooled with water-cooled cylinder heads. The propeller is a three-blade fixed-pitch design manufactured by WARP DRIVE.",
          "tabelas": [
            {
              "nome": "Tabela 27 – Características do motor (Engine Characteristics)",
              "colunas": ["CARACTERÍSTICA", "VALOR"],
              "linhas": [
                {"CARACTERÍSTICA": "FABRICANTE", "VALOR": "BRP ROTAX"},
                {"CARACTERÍSTICA": "Modelo", "VALOR": "912 ULS"},
                {"CARACTERÍSTICA": "Potência", "VALOR": "98,5hp"},
                {"CARACTERÍSTICA": "Cilindrada", "VALOR": "1352 cm³"},
                {"CARACTERÍSTICA": "Número de cilindros", "VALOR": "4"},
                {"CARACTERÍSTICA": "Alimentação", "VALOR": "Carburador"},
                {"CARACTERÍSTICA": "Arrefecimento", "VALOR": "Ar e água"}
              ]
            },
            {
              "nome": "Tabela 28 – Características da hélice (Propeller Characteristics)",
              "colunas": ["CARACTERÍSTICA", "VALOR"],
              "linhas": [
                {"CARACTERÍSTICA": "FABRICANTE", "VALOR": "WARP DRIVE"},
                {"CARACTERÍSTICA": "Modelo", "VALOR": "68RWT3HPL"},
                {"CARACTERÍSTICA": "Número de pás", "VALOR": "3"},
                {"CARACTERÍSTICA": "Diâmetro em polegadas", "VALOR": "68"},
                {"CARACTERÍSTICA": "Tipo", "VALOR": "Fixa"}
              ]
            }
          ]
        },
        {
          "titulo": "7.6. Sistema de combustível (Fuel System)",
          "descricao": "The fuel system consists of two fuel tanks, one in each semi-wing, each with an independent electrical level sensor, a selector switch to interrupt fuel flow from each tank, a level indicator for both tanks (tank selection for fuel level measurement is done via the switch in Figure 18), the engine's mechanical pump, an auxiliary fuel pump, and a power lever. The system is gravity-fed. To assist engine starts at lower temperatures, there is a choke on the panel (item 26 of Figure 17). The power lever with T-shaped grip is located on the center console."
        },
        {
          "titulo": "7.7. Sistema de Transmissor Localizador de Emergência (Emergency Locator Transmitter System)",
          "descricao": "The aircraft is equipped with an Emergency Locator Transmitter (ELT) system. The transmitter and antenna are installed behind the cabin and accessible by removing the trim on the rear of the baggage compartment. The ELT switch is equipped on the panel with ON-OFF options and an indicator light showing that the ELT is armed. The model is E-04 ELT AF model with frequency of 406.037 MHz +37 dBm / 121.5 MHz +21dBm, weighing 1.8 lbs."
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

  FOR v_sec IN SELECT * FROM json_array_elements(v_json->'secoes')
  LOOP
    v_sec_id_str := v_sec->>'id';
    v_sec_titulo := v_sec->>'titulo';

    -- Get or create section
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

    -- Clean up existing subsections for THIS specific section to ensure idempotency
    DELETE FROM public.texts WHERE section_id = v_section_id;
    DELETE FROM public.tables WHERE section_id = v_section_id;
    DELETE FROM public.subsections WHERE section_id = v_section_id;

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
      IF v_sub->'tabelas' IS NOT NULL THEN
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
      END IF;

    END LOOP;
  END LOOP;
END;
$BODY$;
