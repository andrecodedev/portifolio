import { AlertTriangle } from 'lucide-react';

const UpdateNotice = () => {
  return (
    <div className="bg-zinc-800 p-6 rounded-2xl shadow-xl max-w-md text-center space-y-4">
      <AlertTriangle className="mx-auto text-yellow-400 w-10 h-10" />
      <h1 className="text-2xl font-bold">Portfólio em atualização</h1>
      <p className="text-gray-300">
        Estou trabalhando em uma nova versão deste portfólio usando:
      </p>
      <ul className="list-disc list-inside text-left text-sm text-gray-200">
        <li>React + Vite</li>
        <li>Tailwind CSS</li>
        <li>Shadcn/UI</li>
        <li>Typescript</li>
      </ul>
      <p className="text-gray-400 text-sm mt-4">Volte em breve 👨‍💻</p>
    </div>
  );
};

export default UpdateNotice;
