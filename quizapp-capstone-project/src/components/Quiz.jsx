import { useEffect, useState } from "react";
import axios from "axios";

export default function Quiz() {
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios.get("https://opentdb.com/api.php?amount=1&type=multiple")
      .then(res => {
        const data = res.data.results[0];
        setQuestion(data.question);
        const allAnswers = [...data.incorrect_answers, data.correct_answer];
        setAnswers(allAnswers.sort(() => Math.random() - 0.5));
      })
      .catch(err => console.error(err));
  }, []);

  const handleSelect = (answer) => {
    setSelected(answer);
    if (answer === answers.find(a => a === res.data.results[0].correct_answer)) {
      console.log("Correct!");
    } else {
      console.log("Wrong!");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      {question && (
        <>
          <h2 className="text-xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: question }} />
          <div className="space-y-2">
            {answers.map((ans, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(ans)}
                className={`w-full p-2 rounded border 
                  ${selected === ans ? "bg-blue-500 text-white" : "bg-gray-100"}`}
                dangerouslySetInnerHTML={{ __html: ans }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
