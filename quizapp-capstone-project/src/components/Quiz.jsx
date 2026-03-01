import { useEffect, useState } from "react";
import axios from "axios";

export default function Quiz({ category, difficulty, onRestart }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    if (!category || !difficulty) return;
    axios.get(
      `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`
    )
      .then(res => {
        const data = res.data.results;
        const formatted = data.map(q => {
          const allAnswers = [...q.incorrect_answers, q.correct_answer];
          return {
            question: q.question,
            correct: q.correct_answer,
            answers: allAnswers.sort(() => Math.random() - 0.5),
          };
        });
        setQuestions(formatted);
      })
      .catch(err => console.error(err));
  }, [category, difficulty]);

  const handleAnswer = (answer) => {
    if (answer === questions[currentIndex].correct) {
      setScore(score + 1);
    }
    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setShowScore(false);
    onRestart();
  };

  if (!questions.length) return <p className="text-center">Loading questions...</p>;

  return (
    <div className="p-6 text-center space-y-8 w-full max-w-sm mx-auto">
      {showScore ? (
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Your Score: {score}/{questions.length}
          </h2>
          <button
            onClick={restartQuiz}
            className="px-6 py-3 bg-indigo-700 text-white rounded-lg hover:bg-yellow-400 hover:text-black transition w-full"
          >
            🔄 Restart Quiz
          </button>
        </div>
      ) : (
        <>
          <h2
            className="text-xl font-bold mb-6"
            dangerouslySetInnerHTML={{ __html: questions[currentIndex].question }}
          />
          <div className="space-y-4">
            {questions[currentIndex].answers.map((ans, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(ans)}
                className="w-full p-3 rounded-lg border bg-gray-100 hover:bg-indigo-600 hover:text-white transition"
                dangerouslySetInnerHTML={{ __html: ans }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
