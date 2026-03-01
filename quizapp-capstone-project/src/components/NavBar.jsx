import { useState } from "react";

export default function NavBar({ onStart }) {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  return (
    <div className="flex flex-col items-center space-y-10 w-full max-w-sm">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-3 border rounded-lg w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-600"
      >
        <option value="">🎯 Select Subject</option>
        <option value="17">🔬 Science</option>
        <option value="19">➗ Maths</option>
        <option value="23">📜 History</option>
        <option value="21">⚽ Sports</option>
        <option value="25">🎨 Arts</option>
      </select>

      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        className="p-3 border rounded-lg w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-600"
      >
        <option value="">⚡ Select Difficulty</option>
        <option value="easy">🙂 Easy</option>
        <option value="medium">😅 Medium</option>
        <option value="hard">🔥 Hard</option>
      </select>

      <button
        onClick={() => onStart(category, difficulty)}
        className="px-6 py-3 bg-indigo-700 text-white font-semibold rounded-lg shadow hover:bg-yellow-400 hover:text-black transition w-full"
      >
        🚀 Start Quiz
      </button>
    </div>
  );
}

