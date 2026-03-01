import { useState } from "react";
import NavBar from "./components/NavBar";
import Quiz from "./components/Quiz";

export default function App() {
  const [category, setCategory] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [startQuiz, setStartQuiz] = useState(false);

  const handleStart = (selectedCategory, selectedDifficulty) => {
    setCategory(selectedCategory);
    setDifficulty(selectedDifficulty);
    setStartQuiz(true);
  };

  const handleRestart = () => {
    setCategory(null);
    setDifficulty(null);
    setStartQuiz(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      {/* Top Navigation Bar */}
      <header className="bg-indigo-700 text-white py-4 shadow-md">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">🎓 Quiz App</h1>
          <nav className="space-x-6">
            <a href="#" className="hover:text-yellow-300">Home</a>
            <a href="#" className="hover:text-yellow-300">About</a>
            <a href="#" className="hover:text-yellow-300">Contact</a>
          </nav>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex items-center justify-center py-12">
        <div className="bg-white shadow-lg rounded-lg p-12 mx-auto flex flex-col items-center justify-center w-full max-w-md">
          {!startQuiz ? (
            <NavBar onStart={handleStart} />
          ) : (
            <Quiz category={category} difficulty={difficulty} onRestart={handleRestart} />
          )}
        </div>
      </main>
    </div>
  );
}


