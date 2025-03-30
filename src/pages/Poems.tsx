
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, HeartHandshake, Copy } from "lucide-react";
import { toast } from "sonner";

const Poems = () => {
  const [theme, setTheme] = useState<string>("");
  const [poem, setPoem] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!theme.trim()) {
      toast.error("Por favor, insira um tema para o poema");
      return;
    }

    setIsLoading(true);
    setPoem("");

    try {
      // Usando a API para gerar poemas
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
        throw new Error("Falha ao gerar o poema");
      }

      const data = await response.json();
      setPoem(data.text || "Não foi possível gerar um poema neste momento.");
      
    } catch (error) {
      console.error("Erro ao gerar poema:", error);
      toast.error("Ocorreu um erro ao gerar o poema. Por favor, tente novamente.");
      
      // Fallback para demonstração caso a API não esteja conectada
      const fallbackPoems: Record<string, string> = {
        amor: `No silêncio da noite estrelada,\nO amor floresce como rosa delicada.\nEntre suspiros e olhares trocados,\nNossos corações batem acelerados.\n\nÉ fogo que acende, é luz que ilumina,\nÉ força que move, verdade divina.\nNo amor encontro paz e abrigo,\nE na tua mão, meu eterno destino.`,
        vida: `A vida é rio que corre sem parar,\nÉ sonho que nos faz despertar.\nEntre alegrias e dores passageiras,\nConstruímos nossas próprias ribeiras.\n\nCada instante é precioso, cada momento sagrado,\nNo caminho incerto, seguimos lado a lado.\nA vida nos ensina com suas marés,\nA valorizar cada passo que dês.`,
        saudade: `Saudade é sentir que ainda estás,\nMesmo quando o tempo te levou para trás.\nÉ memória viva, é dor que acalenta,\nÉ ausência presente que não se ausenta.\n\nNos cantos da casa, nos ecos da voz,\nNa música que tocava para nós dois.\nSaudade é amar o que não mais existe,\nÉ sorriso na lembrança, mesmo quando é triste.`,
        natureza: `Nas florestas verdes que tocam o céu,\nA natureza escreve sua história sem véu.\nRios que cantam, montanhas que abraçam,\nNuvens que dançam quando os ventos passam.\n\nA vida pulsa em cada pequena semente,\nNo rugido das feras, na chuva cadente.\nSomos parte deste todo majestoso,\nDivino poema, eterno e formoso.`,
      };
      
      setTimeout(() => {
        // Use o tema como chave ou use um poema genérico se o tema não existir no objeto
        setPoem(fallbackPoems[theme.toLowerCase()] || 
          `Pensamentos sobre ${theme} flutuam no ar,\nComo pássaros livres a voar.\nInspiração que nasce do coração,\nE toca a alma com suave emoção.\n\nEm cada palavra, em cada verso,\nDescubro um universo diverso.\nE assim celebro em poesia,\nO que ${theme} traz de magia.`);
      }, 1500);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(poem);
    toast.success("Poema copiado para a área de transferência");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            <span className="block text-purple-400">Versos</span>
            <span className="block text-indigo-300">da Alma</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Digite um tema e deixe a magia da poesia acontecer. Nossa inspiração criará um poema único e especial para você.
          </p>
        </div>

        <Card className="shadow-lg bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Gerador de Poemas</CardTitle>
            <CardDescription className="text-gray-400">
              Digite um tema para inspirar seu poema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme" className="text-gray-200">Tema do Poema</Label>
                <Input
                  id="theme"
                  placeholder="Ex: amor, natureza, saudade..."
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  disabled={isLoading}
                  className="bg-gray-700 text-white border-gray-600 placeholder:text-gray-400"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700" 
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
                    Gerar Poema
                  </>
                )}
              </Button>
            </form>

            {poem && (
              <div className="mt-6">
                <Label htmlFor="poem" className="text-gray-200">Seu Poema</Label>
                <div className="relative mt-2">
                  <Textarea
                    id="poem"
                    value={poem}
                    readOnly
                    className="min-h-[200px] font-serif text-white leading-relaxed bg-gray-700 border-gray-600"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={copyToClipboard}
                    className="absolute top-2 right-2 text-gray-300 hover:text-white"
                    aria-label="Copiar poema"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between text-sm text-gray-400">
            <p>Compartilhe seu poema com amigos</p>
            <p>Versos da Alma</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Poems;
