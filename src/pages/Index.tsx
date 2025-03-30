
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HeartHandshake } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Bem-vindo ao Gerador de Poemas</h1>
        <p className="text-xl text-gray-600 mb-8">
          Descubra a magia da poesia gerada por inteligência artificial
        </p>
        <Link to="/poems">
          <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
            <HeartHandshake className="mr-2 h-5 w-5" />
            Criar Poemas
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
