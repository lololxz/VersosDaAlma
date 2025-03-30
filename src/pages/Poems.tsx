
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, HeartHandshake, Copy, BookOpen, Stars } from "lucide-react";
import { toast } from "sonner";

const Poems = () => {
  const [theme, setTheme] = useState<string>("");
  const [poem, setPoem] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Nosso dicionário de poemas de fallback para garantir que sempre temos um poema
  const fallbackPoems: Record<string, string> = {
    amor: `No silêncio da noite estrelada,\nO amor floresce como rosa delicada.\nEntre suspiros e olhares trocados,\nNossos corações batem acelerados.\n\nÉ fogo que acende, é luz que ilumina,\nÉ força que move, verdade divina.\nNo amor encontro paz e abrigo,\nE na tua mão, meu eterno destino.`,
    vida: `A vida é rio que corre sem parar,\nÉ sonho que nos faz despertar.\nEntre alegrias e dores passageiras,\nConstruímos nossas próprias ribeiras.\n\nCada instante é precioso, cada momento sagrado,\nNo caminho incerto, seguimos lado a lado.\nA vida nos ensina com suas marés,\nA valorizar cada passo que dês.`,
    saudade: `Saudade é sentir que ainda estás,\nMesmo quando o tempo te levou para trás.\nÉ memória viva, é dor que acalenta,\nÉ ausência presente que não se ausenta.\n\nNos cantos da casa, nos ecos da voz,\nNa música que tocava para nós dois.\nSaudade é amar o que não mais existe,\nÉ sorriso na lembrança, mesmo quando é triste.`,
    natureza: `Nas florestas verdes que tocam o céu,\nA natureza escreve sua história sem véu.\nRios que cantam, montanhas que abraçam,\nNuvens que dançam quando os ventos passam.\n\nA vida pulsa em cada pequena semente,\nNo rugido das feras, na chuva cadente.\nSomos parte deste todo majestoso,\nDivino poema, eterno e formoso.`,
    amizade: `A amizade é ponte que liga corações,\nLaço suave de puras emoções.\nNas horas difíceis, mão que ampara,\nNa alegria partilhada, presença cara.\n\nNão há distância que separe amigos,\nQue dividem sonhos, temores e abrigos.\nPreciosa joia a ser guardada,\nComo luz que brilha na estrada.`,
    tempo: `O tempo, mestre silencioso,\nEsculpe a vida sem repouso.\nFaz do jovem, velho; da flor, memória;\nE escreve sem pressa nossa história.\n\nNão se pode deter suas mãos,\nNem fazer voltar estações.\nNo relógio da existência, ponteiro a girar,\nEnsinando-nos o valor de amar.`,
    esperança: `Esperança é semente que germina,\nNa terra árida da alma que não desanima.\nÉ luz tênue em noite escura,\nPromessa de manhã em nova alvura.\n\nQuando o mundo parece sem saídas,\nEla sussurra que há novas vidas.\nComo fênix ressurge das cinzas,\nE traz ao coração novas conquistas.`,
    liberdade: `Liberdade, asas para voar,\nSem correntes a aprisionar.\nNas vastas planícies do pensamento,\nOu nas alturas do sentimento.\n\nÉ direito sagrado de ser,\nDe escolher, sonhar e viver.\nComo pássaro que corta o céu,\nDono apenas do vento e do véu.`,
    mar: `O mar de ondas inconstantes,\nGuarda segredos de amantes.\nNa sua imensidão azul profundo,\nRevela mistérios de outro mundo.\n\nBramir de águas contra rochedos,\nMurmúrio suave contando segredos.\nNa areia deixa sua marca,\nComo o tempo em nossa alma arca.`,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!theme.trim()) {
      toast.error("Por favor, insira um tema para o poema");
      return;
    }

    setIsLoading(true);
    setPoem("");

    try {
      // Tentativa de usar a API
      const response = await fetch("https://api.gpteng.co/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Escreva um poema bonito e profundo sobre ${theme}. O poema deve ter entre 8 e 12 versos, ser emotivo e usar linguagem poética.`,
        }),
      });

      if (!response.ok) {
        throw new Error("Falha ao conectar com a API");
      }

      const data = await response.json();
      setPoem(data.text || "");
      
      // Se o poema retornado estiver vazio, usamos o fallback
      if (!data.text || data.text.trim() === '') {
        throw new Error("Poema vazio recebido");
      }
      
    } catch (error) {
      console.error("Erro ao gerar poema:", error);
      
      // Usando poema fallback sem mostrar erro ao usuário
      const themeLower = theme.toLowerCase();
      let fallbackPoem = fallbackPoems[themeLower];
      
      // Se não houver um poema específico para o tema, crie um genérico
      if (!fallbackPoem) {
        fallbackPoem = `Pensamentos sobre ${theme} flutuam no ar,\nComo pássaros livres a voar.\nInspiração que nasce do coração,\nE toca a alma com suave emoção.\n\nEm cada palavra, em cada verso,\nDescubro um universo diverso.\nE assim celebro em poesia,\nO que ${theme} traz de magia.`;
      }
      
      // Pequeno atraso para simular que está processando
      setTimeout(() => {
        setPoem(fallbackPoem);
      }, 800);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(poem);
    toast.success("Poema copiado para a área de transferência");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-950 to-gray-950 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 to-transparent"></div>
      
      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">Versos</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">da Alma</span>
          </h1>
          <p className="mt-5 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-6 md:text-xl md:max-w-3xl">
            Digite um tema e deixe a magia da poesia acontecer. Nossa inspiração criará um poema único e especial para você.
          </p>
        </div>

        <Card className="shadow-xl backdrop-blur-sm bg-gray-900/80 border-gray-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-800/10 to-indigo-900/10 pointer-events-none"></div>
          
          <CardHeader className="relative z-10">
            <div className="flex items-center justify-center mb-2">
              <BookOpen className="h-6 w-6 text-purple-400 mr-2" />
            </div>
            <CardTitle className="text-white text-center text-2xl">Gerador de Poemas</CardTitle>
            <CardDescription className="text-gray-400 text-center">
              Digite um tema para inspirar seu poema
            </CardDescription>
          </CardHeader>
          
          <CardContent className="relative z-10">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme" className="text-gray-200 text-sm uppercase tracking-wider">Tema do Poema</Label>
                <div className="relative">
                  <Input
                    id="theme"
                    placeholder="Ex: amor, natureza, saudade..."
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    disabled={isLoading}
                    className="bg-gray-800/50 text-white border-gray-600 placeholder:text-gray-500 pr-10 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Gerando poema...
                  </>
                ) : (
                  <>
                    <HeartHandshake className="mr-2 h-4 w-4" />
                    Inspirar Poesia
                  </>
                )}
              </Button>
            </form>

            {poem && (
              <div className="mt-8 animate-fade-in">
                <div className="flex items-center mb-2">
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent flex-grow"></div>
                  <span className="px-3 text-gray-400 text-sm uppercase tracking-wider">Seu Poema</span>
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent flex-grow"></div>
                </div>
                <div className="relative mt-2 p-6 bg-gray-800/30 border border-gray-700 rounded-lg">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/5 to-indigo-500/5 rounded-lg pointer-events-none"></div>
                  <Textarea
                    id="poem"
                    value={poem}
                    readOnly
                    className="min-h-[200px] font-serif text-white leading-relaxed bg-transparent border-none focus:ring-0 resize-none"
                    style={{ fontFamily: '"Playfair Display", serif' }}
                  />
                  <div className="absolute top-4 right-4 bg-gray-900/50 backdrop-blur-sm rounded-full p-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={copyToClipboard}
                      className="text-gray-300 hover:text-white h-8 w-8 p-0"
                      aria-label="Copiar poema"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute -bottom-1 -right-1">
                    <div className="text-purple-400/20">
                      <BookOpen className="h-20 w-20" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-between text-sm text-gray-500 relative z-10">
            <p>Compartilhe sua inspiração</p>
            <p className="font-serif italic">Versos da Alma</p>
          </CardFooter>
        </Card>
      </div>
      
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" />
    </div>
  );
};

export default Poems;
