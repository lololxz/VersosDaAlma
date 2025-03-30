
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HeartHandshake } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-purple-900">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4 text-white">
          <span className="block text-purple-400">Versos</span>
          <span className="block text-indigo-300">da Alma</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Descubra a magia da poesia através da inspiração poética
        </p>
        <Link to="/poems">
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
            <HeartHandshake className="mr-2 h-5 w-5" />
            Criar Poemas
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
