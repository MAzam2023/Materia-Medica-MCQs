import { useState, useMemo, useEffect, useRef } from "react";
import { Search, BookOpen, GraduationCap, Eye, CheckCircle, XCircle, Upload, Trash2 } from "lucide-react";
import { mcqs as defaultMcqs, MCQ } from "./data/mcqs";
import { cn } from "./lib/utils";
import Papa from "papaparse";

function SearchLibrary({ mcqs }: { mcqs: MCQ[] }) {
  const [query, setQuery] = useState("");
  const [revealedIds, setRevealedIds] = useState<Set<number>>(new Set());

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const lower = query.toLowerCase();
    return mcqs.filter((m) =>
      m.question.toLowerCase().includes(lower) ||
      m.subject.toLowerCase().includes(lower) ||
      m.options.some((o) => o.text.toLowerCase().includes(lower))
    );
  }, [query, mcqs]);

  const toggleAnswer = (id: number) => {
    setRevealedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="relative mb-12">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-6 w-6 text-slate-900" strokeWidth={3} />
        </div>
        <input
          type="text"
          className="block w-full pl-12 pr-4 py-4 border-4 border-slate-900 bg-white font-bold text-lg text-slate-900 shadow-[8px_8px_0px_#0F172A] focus:outline-none focus:translate-y-[2px] focus:translate-x-[2px] focus:shadow-[6px_6px_0px_#0F172A] transition-all"
          placeholder="SEARCH QUESTIONS, SUBJECTS, OR REMEDIES..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {query.trim() && filtered.length === 0 && (
        <div className="text-center font-bold text-slate-500 py-12 uppercase text-xl">
          No matches found for "{query}".
        </div>
      )}

      {query.trim() === "" && (
        <div className="text-center font-bold text-slate-400 py-12 uppercase text-xl border-4 border-dashed border-slate-300 p-8">
          TYPE TO SEARCH {mcqs.length} MCQS...
        </div>
      )}

      <div className="space-y-12">
        {filtered.map((mcq) => (
          <div key={mcq.id} className="bg-white border-4 border-slate-900 shadow-[12px_12px_0px_#0F172A] p-8 md:p-12 flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <span className="text-xs font-black uppercase tracking-wider bg-slate-900 text-white px-3 py-1">
                {mcq.subject}
              </span>
              <span className="text-sm font-black text-slate-400">Q. {mcq.id}</span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-8 leading-tight tracking-tight uppercase">
              {mcq.question}
            </h3>
            
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {mcq.options.map((opt) => {
                const isAnswer = revealedIds.has(mcq.id) && opt.label === mcq.answer;
                return (
                  <li
                    key={opt.label}
                    className={cn(
                      "p-4 border-2 flex gap-3 font-bold transition-colors break-words",
                      isAnswer ? "bg-slate-900 border-slate-900 text-white" : "bg-white border-slate-900 text-slate-800"
                    )}
                  >
                    <span className={cn(
                      "font-black uppercase flex-shrink-0",
                      isAnswer ? "text-emerald-400" : "text-slate-400"
                    )}>({opt.label})</span>
                    <span>{opt.text}</span>
                  </li>
                )
              })}
            </ul>
            
            <div className="mt-auto pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t-4 border-slate-900">
              <div className="pt-6">
                <button
                  onClick={() => toggleAnswer(mcq.id)}
                  className="bg-emerald-500 text-white px-6 py-3 border-4 border-slate-900 font-black uppercase tracking-wide shadow-[4px_4px_0px_#0F172A] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_#0F172A] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none transition-all flex items-center gap-2"
                >
                  <Eye className="w-5 h-5" strokeWidth={3} />
                  {revealedIds.has(mcq.id) ? "HIDE ANSWER" : "CHECK ANSWER"}
                </button>
              </div>
              {revealedIds.has(mcq.id) && mcq.explanation && (
                <p className="text-sm font-bold text-slate-600 pt-6 flex-1 border-l-4 border-slate-200 pl-4">
                  {mcq.explanation}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuizEngine({ mcqs, subjects }: { mcqs: MCQ[], subjects: string[] }) {
  const [selectedSubject, setSelectedSubject] = useState<string>("All");
  const [quizActive, setQuizActive] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<MCQ[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [resultsRevealed, setResultsRevealed] = useState<Record<number, boolean>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const startQuiz = () => {
    let pool = mcqs;
    if (selectedSubject !== "All") {
      pool = mcqs.filter((m) => m.subject === selectedSubject);
    }
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    // Give user up to 10 questions for a manageable test
    setQuizQuestions(shuffled.slice(0, 10));
    setAnswers({});
    setResultsRevealed({});
    setCurrentQuestionIndex(0);
    setQuizActive(true);
  };

  const handleSelectOption = (qid: number, label: string) => {
    if (resultsRevealed[qid]) return;
    setAnswers((prev) => ({ ...prev, [qid]: label }));
  };

  const checkAnswer = (qid: number) => {
    setResultsRevealed((prev) => ({ ...prev, [qid]: true }));
  };

  if (!quizActive) {
    return (
      <div className="max-w-2xl mx-auto py-24 px-4 text-center">
        <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 uppercase tracking-[-2px] leading-none">
          MATERIA MEDICA<br/>EXPERT QUIZ
        </h2>
        <p className="text-xl font-bold text-slate-600 mb-12">TEST YOUR KNOWLEDGE WITH {mcqs.length} MCQS CLASSIFIED BY {subjects.length} SUBJECTS.</p>
        
        <div className="bg-white p-8 md:p-12 border-4 border-slate-900 shadow-[12px_12px_0px_#0F172A] text-left mx-auto max-w-lg">
          <label className="block text-sm font-black text-slate-900 mb-4 uppercase tracking-wider border-b-4 border-slate-900 pb-2">
            SELECT A SUBJECT
          </label>
          <div className="mb-8 space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
            <button
              onClick={() => setSelectedSubject("All")}
              className={cn(
                "w-full text-left p-4 font-black uppercase border-2 transition-colors",
                selectedSubject === "All" ? "bg-slate-900 text-white border-slate-900" : "border-transparent hover:border-slate-900"
              )}
            >
              MIXED (ALL SUBJECTS)
            </button>
            {subjects.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={cn(
                  "w-full text-left p-4 font-black uppercase border-2 transition-colors",
                  selectedSubject === sub ? "bg-slate-900 text-white border-slate-900" : "border-transparent hover:border-slate-900"
                )}
              >
                {sub}
              </button>
            ))}
          </div>

          <button
            onClick={startQuiz}
            className="w-full bg-emerald-500 text-white py-4 px-6 border-4 border-slate-900 font-black text-xl uppercase tracking-wider shadow-[8px_8px_0px_#0F172A] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[6px_6px_0px_#0F172A] active:translate-y-[8px] active:translate-x-[8px] active:shadow-none transition-all"
          >
            START QUIZ
          </button>
        </div>
      </div>
    );
  }

  if (quizQuestions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-24 text-center">
        <h2 className="text-3xl font-black mb-6">NO QUESTIONS FOUND</h2>
        <button onClick={() => setQuizActive(false)} className="bg-slate-900 text-white px-8 py-4 border-4 border-slate-900 font-black uppercase">GO BACK</button>
      </div>
    );
  }

  const idx = currentQuestionIndex;
  const q = quizQuestions[idx];
  const isRevealed = resultsRevealed[q.id];
  const selectedLabel = answers[q.id];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 pb-6 border-b-4 border-slate-900 gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">QUIZ: {selectedSubject}</h2>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">{quizQuestions.length} QUESTIONS LOADED</p>
        </div>
        <button
          onClick={() => setQuizActive(false)}
          className="text-sm font-black bg-slate-200 hover:bg-slate-300 text-slate-900 uppercase px-4 py-2 border-2 border-slate-900 transition-colors"
        >
          QUIT QUIZ
        </button>
      </div>

      <div className="space-y-16">
        <div key={q.id} className="bg-white border-4 border-slate-900 shadow-[12px_12px_0px_#0F172A] p-6 md:p-12 flex flex-col">
          <div className="mb-8 border-b-4 border-slate-200 pb-6 flex gap-4 items-start">
            <span className="flex-shrink-0 bg-slate-900 text-white px-3 py-1 font-black text-sm uppercase">
              Q.{idx + 1} OF {quizQuestions.length}
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 uppercase leading-snug tracking-tight pb-1">{q.question}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {q.options.map((opt) => {
              const isSelected = selectedLabel === opt.label;
              const isCorrectAnswer = opt.label === q.answer;
              
              let stateClass = "border-slate-900 bg-white hover:bg-slate-100 cursor-pointer";
              if (isSelected) stateClass = "border-slate-900 bg-slate-900 text-white";
              
              if (isRevealed) {
                if (isCorrectAnswer) {
                  stateClass = "border-emerald-500 bg-emerald-500 text-white border-emerald-500 shadow-[4px_4px_0px_#047857]";
                } else if (isSelected && !isCorrectAnswer) {
                  stateClass = "border-red-500 bg-red-500 text-white opacity-80 cursor-default";
                } else {
                  stateClass = "border-slate-200 text-slate-400 opacity-50 cursor-default shadow-none";
                }
              }

              return (
                <div
                  key={opt.label}
                  onClick={() => handleSelectOption(q.id, opt.label)}
                  className={cn("p-5 border-2 font-bold transition-all flex justify-between items-center sm:text-lg break-words", stateClass)}
                >
                  <div className="flex gap-4 items-center">
                    <span className={cn(
                      "font-black uppercase text-xl flex-shrink-0",
                      isRevealed && isCorrectAnswer ? "text-emerald-900" : isRevealed && isSelected ? "text-red-900" : isSelected ? "text-emerald-400" : "text-slate-400"
                    )}>
                      {opt.label}.
                    </span>
                    <span>{opt.text}</span>
                  </div>
                  {isRevealed && isCorrectAnswer && <CheckCircle className="w-6 h-6 flex-shrink-0 text-white" strokeWidth={3} />}
                  {isRevealed && isSelected && !isCorrectAnswer && <XCircle className="w-6 h-6 flex-shrink-0 text-white" strokeWidth={3} />}
                </div>
              );
            })}
          </div>

          <div className="mt-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {!isRevealed ? (
              <button
                disabled={!selectedLabel}
                onClick={() => checkAnswer(q.id)}
                className="bg-emerald-500 disabled:bg-slate-200 disabled:border-slate-300 disabled:text-slate-400 disabled:cursor-not-allowed disabled:shadow-none text-white px-8 py-4 border-4 border-slate-900 font-black uppercase text-lg shadow-[4px_4px_0px_#0F172A] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_#0F172A] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none transition-all"
              >
                CHECK ANSWER
              </button>
            ) : idx < quizQuestions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestionIndex(idx + 1)}
                className="bg-slate-900 text-white px-8 py-4 border-4 border-slate-900 font-black uppercase text-lg shadow-[4px_4px_0px_#0F172A] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_#0F172A] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none transition-all"
              >
                NEXT QUESTION
              </button>
            ) : (
              <button
                onClick={() => setQuizActive(false)}
                className="bg-slate-900 text-white px-8 py-4 border-4 border-slate-900 font-black uppercase text-lg shadow-[4px_4px_0px_#0F172A] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_#0F172A] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none transition-all"
              >
                FINISH TEST & RETURN
              </button>
            )}

            {isRevealed && q.explanation && (
              <p className="text-sm font-bold text-slate-600 italic border-l-4 border-slate-300 pl-4 py-1 max-w-md">
                {q.explanation}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function UploaderTab({ onSaveBase, mcqsCount }: { onSaveBase: (data: MCQ[]) => void, mcqsCount: number }) {
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const normalizeKey = (key: string) => key.toLowerCase().replace(/[^a-z0-9]/g, '');

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setError(null);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const newMcqs: MCQ[] = results.data.map((row: any, index) => {
            const nRow: Record<string, string> = {};
            Object.keys(row).forEach(k => {
              nRow[normalizeKey(k)] = row[k];
            });

            // Ensure we have some sort of question
            if (!nRow.question) throw new Error("Missing 'Question' column in some rows.");

            const optA = nRow.optiona || "";
            const optB = nRow.optionb || "";
            const optC = nRow.optionc || "";
            const optD = nRow.optiond || "";

            const options = [];
            if (optA) options.push({ label: "a", text: optA });
            if (optB) options.push({ label: "b", text: optB });
            if (optC) options.push({ label: "c", text: optC });
            if (optD) options.push({ label: "d", text: optD });

            return {
              id: index + 1,
              subject: nRow.subject || "General",
              question: nRow.question || "",
              options,
              answer: (nRow.answer || "").toLowerCase().trim(),
              explanation: nRow.explanation || ""
            };
          }).filter(m => m.question && m.options.length >= 2 && m.answer);

          if (newMcqs.length === 0) {
            throw new Error("Could not find any valid questions securely formatted.");
          }

          localStorage.setItem("custom_mcqs", JSON.stringify(newMcqs));
          onSaveBase(newMcqs);
        } catch (err: any) {
          setError(err.message || "Failed to parse CSV check your format.");
        } finally {
          setIsProcessing(false);
          if (fileInputRef.current) fileInputRef.current.value = "";
        }
      },
      error: () => {
        setError("Error reading the file.");
        setIsProcessing(false);
      }
    });
  };

  const handleReset = () => {
    localStorage.removeItem("custom_mcqs");
    onSaveBase(defaultMcqs);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="mb-12 pb-6 border-b-4 border-slate-900 border-dashed">
        <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-4">DATABASE UPLOAD</h2>
        <p className="font-bold text-slate-600 text-lg">Load your own CSV database containing unlimited MCQs into the App.</p>
      </div>

      <div className="bg-white border-4 border-slate-900 shadow-[12px_12px_0px_#0F172A] p-8 md:p-12">
        <div className="mb-10">
          <h3 className="text-xl font-black uppercase mb-4 text-slate-900">CSV FORMAT INSTRUCTIONS</h3>
          <p className="font-bold text-slate-600 mb-4">Your CSV must contain the following header row exactly or similarly named (case insensitive):</p>
          <div className="bg-slate-100 border-4 border-slate-900 p-4 font-mono font-bold text-sm overflow-x-auto text-pink-600">
            Subject | Question | Option A | Option B | Option C | Option D | Answer | Explanation
          </div>
          <ul className="list-disc pl-6 mt-4 font-bold text-slate-600 text-sm space-y-2">
            <li><strong className="text-slate-900">Answer</strong> must be exactly "a", "b", "c", or "d".</li>
            <li><strong className="text-slate-900">Explanation</strong> is optional.</li>
            <li>The app will automatically assign IDs.</li>
          </ul>
        </div>

        {error && (
          <div className="bg-red-100 border-4 border-red-500 text-red-900 p-4 font-bold mb-8 uppercase">
            ERROR: {error}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-6">
          <label className={cn(
            "flex-1 bg-emerald-500 text-white cursor-pointer px-6 py-6 border-4 border-slate-900 font-black uppercase text-xl shadow-[6px_6px_0px_#0F172A] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[4px_4px_0px_#0F172A] active:translate-y-[6px] active:translate-x-[6px] active:shadow-none transition-all flex items-center justify-center gap-3",
            isProcessing ? "opacity-50 pointer-events-none" : ""
          )}>
            <Upload className="w-6 h-6" strokeWidth={3} />
            {isProcessing ? "PROCESSING..." : "SELECT CSV FILE"}
            <input 
              ref={fileInputRef}
              type="file" 
              accept=".csv" 
              className="hidden" 
              onChange={handleFile}
              disabled={isProcessing}
            />
          </label>

          <button
            onClick={handleReset}
            className="bg-slate-900 text-white px-6 py-6 border-4 border-slate-900 font-black uppercase text-lg shadow-[6px_6px_0px_#64748B] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[4px_4px_0px_#64748B] active:translate-y-[6px] active:translate-x-[6px] active:shadow-none transition-all flex items-center justify-center gap-3"
          >
            <Trash2 className="w-5 h-5" strokeWidth={3} />
            RESET TO DEFAULT
          </button>
        </div>
        
        <div className="mt-8 text-center border-t-4 border-slate-200 border-dashed pt-6">
          <span className="font-black text-slate-400 uppercase text-lg inline-block bg-slate-100 px-4 py-2 border-2 border-slate-200">
            CURRENTLY PRE-LOADED: {mcqsCount} MCQS
          </span>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState<"search" | "quiz" | "upload">("search");
  const [mcqData, setMcqData] = useState<MCQ[]>(defaultMcqs);

  useEffect(() => {
    const stored = localStorage.getItem("custom_mcqs");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMcqData(parsed);
        }
      } catch (e) {
        console.error("Failed to parse custom local storage MCQs");
      }
    }
  }, []);

  const subjects = useMemo(() => Array.from(new Set(mcqData.map((m) => m.subject))).sort(), [mcqData]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col selection:bg-emerald-300 selection:text-slate-900">
      <header className="bg-white border-b-4 border-slate-900 sticky top-0 z-10 px-4 py-4 md:py-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 p-2 text-white">
              <BookOpen className="w-8 h-8" strokeWidth={2.5} />
            </div>
            <h1 className="text-3xl font-black tracking-tight uppercase leading-none mt-1">
              MATERIA MEDICA<br/><span className="text-emerald-600">QUIZ MASTER</span>
            </h1>
          </div>
          
          <div className="flex flex-wrap border-4 border-slate-900 shadow-[4px_4px_0px_#0F172A] bg-slate-900">
            <button
              onClick={() => setTab("search")}
              className={cn(
                "flex items-center justify-center gap-2 px-4 md:px-6 py-3 font-black uppercase text-sm transition-colors border-r-4 border-slate-900",
                tab === "search" ? "bg-white text-slate-900" : "bg-slate-200 text-slate-700 hover:bg-slate-100"
              )}
            >
              <Search className="w-5 h-5" strokeWidth={3} />
              LIBRARY
            </button>
            <button
              onClick={() => setTab("quiz")}
              className={cn(
                "flex items-center justify-center gap-2 px-4 md:px-6 py-3 font-black uppercase text-sm transition-colors border-r-4 border-slate-900",
                tab === "quiz" ? "bg-white text-slate-900" : "bg-slate-200 text-slate-700 hover:bg-slate-100"
              )}
            >
              <GraduationCap className="w-5 h-5" strokeWidth={3} />
              QUIZ
            </button>
            <button
              onClick={() => setTab("upload")}
              className={cn(
                "flex items-center justify-center gap-2 px-4 md:px-6 py-3 font-black uppercase text-sm transition-colors",
                tab === "upload" ? "bg-emerald-500 text-white" : "bg-slate-900 text-slate-300 hover:text-white"
              )}
            >
              <Upload className="w-5 h-5" strokeWidth={3} />
              DATA
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-12">
        <div className="max-w-6xl mx-auto">
          {tab === "search" && <SearchLibrary mcqs={mcqData} />}
          {tab === "quiz" && <QuizEngine mcqs={mcqData} subjects={subjects} />}
          {tab === "upload" && <UploaderTab onSaveBase={setMcqData} mcqsCount={mcqData.length} />}
        </div>
      </main>
      
      <footer className="bg-slate-900 border-t-4 border-slate-900 mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row justify-between items-center text-sm font-bold uppercase tracking-widest text-slate-400 gap-4">
          <p>DATABASE: {mcqData.length} MCQS LOADED FOR DEMO</p>
          <p className="text-emerald-500">EXPERT MODE ACTIVE</p>
        </div>
      </footer>
    </div>
  );
}
