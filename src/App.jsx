import React, { useState, useEffect } from 'react';
import { Terminal, Play, Sparkles, Loader2, CheckCircle2, Cpu, ChevronRight, ChevronLeft, Lightbulb, RotateCcw, Trophy, Code2, AlertCircle } from 'lucide-react';
import { LABS } from './labs';

// Chargement de canvas-confetti
const confettiScript = document.createElement('script');
confettiScript.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
document.head.appendChild(confettiScript);


function App() {
  // --- ÉTATS ---
  const [currentLabIndex, setCurrentLabIndex] = useState(0);
  const [code, setCode] = useState(LABS[0].initialCode);
  const [output, setOutput] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [completedLabs, setCompletedLabs] = useState(new Set());
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showChoupi, setShowChoupi] = useState(true);
  
  // États pour le chargement initial
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingStep, setLoadingStep] = useState("Initialisation...");

  const currentLab = LABS[currentLabIndex];

  // --- EFFET DE CHARGEMENT ---
  useEffect(() => {
    const steps = [
      { p: 20, t: "Connexion au Cloud PHP..." },
      { p: 50, t: "Chargement des missions..." },
      { p: 80, t: "Préparation de l'IDE..." },
      { p: 100, t: "Prêt !" }
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < steps.length) {
        setLoadingStep(steps[step].t);
        setProgress(steps[step].p);
        step++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsLoading(false), 800);
      }
    }, 600);

    return () => clearInterval(interval);
  }, []);

  // Confetti explosif amélioré avec effet "POUF"
  const triggerConfetti = () => {
    setShowChoupi(true);
    // Attendre que confetti soit chargé
    const shootConfetti = () => {
      if (typeof window.confetti === 'undefined') {
        setTimeout(shootConfetti, 100);
        return;
      }

      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 80, zIndex: 9999 };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      // GRANDE EXPLOSION INITIALE "POUF" 💥
      window.confetti({
        particleCount: 200,
        spread: 200,
        origin: { y: 0.5, x: 0.5 },
        colors: ['#6366f1', '#a855f7', '#22c55e', '#fbbf24', '#f472b6', '#ef4444'],
        startVelocity: 70,
        gravity: 1,
        scalar: 1.5,
        drift: 0,
        ticks: 100
      });

      // Explosions continues depuis plusieurs points
      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 30 * (timeLeft / duration);
        
        // Explosion gauche
        window.confetti(Object.assign({}, defaults, { 
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() * 0.5 },
          colors: ['#6366f1', '#a855f7', '#22c55e']
        }));
        
        // Explosion droite
        window.confetti(Object.assign({}, defaults, { 
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() * 0.5 },
          colors: ['#fbbf24', '#f472b6', '#ef4444']
        }));
        
        // Explosion centre haut
        window.confetti(Object.assign({}, defaults, { 
          particleCount: particleCount / 2,
          origin: { x: 0.5, y: 0.2 },
          colors: ['#6366f1', '#22c55e', '#fbbf24']
        }));
      }, 250);
    };

    shootConfetti();
  };

  // --- LOGIQUE D'EXÉCUTION ---
  const runCode = async () => {
    setIsExecuting(true);
    setIsSuccess(false);
    setShowError(false);
    setOutput("☁️ Exécution sur le serveur PHP 8.2...");
    setAttempts(prev => prev + 1);

    try {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: "php",
          version: "8.2.3",
          files: [{ content: code }],
        }),
      });

      const data = await response.json();
      const stdout = data.run.stdout || "";
      const stderr = data.run.stderr || "";
      const finalOutput = stdout || stderr || "Code exécuté (aucune sortie).";
      
      setOutput(finalOutput);

      // Vérification de la réussite
      if (currentLab.validate(finalOutput, code)) {
        setIsSuccess(true);
        setCompletedLabs(prev => new Set([...prev, currentLab.id]));
        triggerConfetti();
      } else if (stderr) {
        setShowError(true);
        setErrorMessage("Il y a une erreur dans ton code. Vérifie la syntaxe !");
      } else {
        setShowError(true);
        setErrorMessage("Le résultat n'est pas celui attendu. Réessaie !");
      }
    } catch (error) {
      setOutput("❌ Erreur : Impossible de joindre le serveur.");
      setShowError(true);
      setErrorMessage("Problème de connexion au serveur PHP.");
    } finally {
      setIsExecuting(false);
    }
  };

  // Navigation
  const nextMission = () => {
    const nextIndex = currentLabIndex + 1;
    if (nextIndex < LABS.length) {
      setCurrentLabIndex(nextIndex);
      setCode(LABS[nextIndex].initialCode);
      setOutput("");
      setIsSuccess(false);
      setShowHint(false);
      setAttempts(0);
      setShowError(false);
      setShowChoupi(true);
    }
  };

  const previousMission = () => {
    if (currentLabIndex > 0) {
      const prevIndex = currentLabIndex - 1;
      setCurrentLabIndex(prevIndex);
      setCode(LABS[prevIndex].initialCode);
      setOutput("");
      setIsSuccess(false);
      setShowHint(false);
      setAttempts(0);
      setShowError(false);
      setShowChoupi(true);
    }
  };

  const resetCode = () => {
    setCode(currentLab.initialCode);
    setOutput("");
    setIsSuccess(false);
    setShowHint(false);
    setShowError(false);
    setShowChoupi(true);
  };

  // Déterminer quelle image et message afficher
  const getChoupiState = () => {
    if (isSuccess) {
      return {
        image: 'succes.png',
        message: 'Incroyable Choupi ! Tu es vraiment doué ! 🌟',
        bgColor: 'from-green-400/20 to-emerald-500/20',
        borderColor: 'border-green-400/40'
      };
    }
    if (showError) {
      return {
        image: 'question.png',
        message: 'Hmm... Peut-être qu\'il faut vérifier quelque chose ? 🤔',
        bgColor: 'from-orange-400/20 to-red-500/20',
        borderColor: 'border-orange-400/40'
      };
    }
    if (showHint) {
      return {
        image: 'indice.png',
        message: 'Laisse-moi t\'aider un peu ! 💡',
        bgColor: 'from-yellow-400/20 to-amber-500/20',
        borderColor: 'border-yellow-400/40'
      };
    }
    return {
      image: 'welcome.png',
      message: 'Salut Choupi ! Prêt pour cette mission ? 🚀',
      bgColor: 'from-indigo-400/20 to-purple-500/20',
      borderColor: 'border-indigo-400/40'
    };
  };

  const choupiState = getChoupiState();

  // --- RENDU CHARGEMENT ---
  if (isLoading) {
    return (
      <div className="h-screen bg-slate-950 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-full max-w-xl space-y-12 animate-in fade-in zoom-in duration-1000">
          <div className="relative inline-block">
            <div className="absolute -inset-16 bg-indigo-500 blur-[80px] opacity-20 animate-pulse"></div>
            <div className="relative flex flex-col items-center gap-8">
              <div className="w-24 h-24 bg-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl rotate-12 border border-indigo-400/20">
                <span className="text-white text-6xl font-black -rotate-12 italic">P</span>
              </div>
              <h1 className="text-7xl font-black tracking-tighter italic">
                <span className="text-white opacity-90">Hello</span>
                <span className="inline-block ml-5 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Choupi</span>
              </h1>
            </div>
          </div>
          <div className="max-w-xs mx-auto w-full space-y-4">
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
              <div className="h-full bg-indigo-500 transition-all duration-500 shadow-[0_0_15px_rgba(79,70,229,0.5)]" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-slate-500 font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2">
              <Cpu size={12} className="animate-spin" /> {loadingStep}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDU PRINCIPAL ---
  return (
    <div className="h-screen bg-slate-950 text-slate-200 flex flex-col overflow-hidden">
      
      {/* Header */}
      <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-900/50 backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-black italic shadow-lg shadow-indigo-600/20">
              P
            </div>
            <span className="font-bold text-white tracking-tight">Lab de Choupi</span>
          </div>
          
          {/* Barre de progression */}
          <div className="flex gap-1.5 items-center">
            {LABS.map((lab, idx) => (
              <div 
                key={idx}
                title={`Mission ${lab.id}: ${lab.title}`}
                className={`h-1.5 w-6 rounded-full transition-all duration-500 cursor-pointer hover:scale-110 ${
                  idx === currentLabIndex 
                    ? 'bg-indigo-500 w-10 shadow-lg shadow-indigo-500/50' 
                    : completedLabs.has(lab.id)
                    ? 'bg-green-500 shadow-md shadow-green-500/30'
                    : 'bg-slate-800'
                }`}
              />
            ))}
          </div>

          {/* Score */}
          <div className="flex items-center gap-2 text-sm">
            <Trophy size={16} className="text-yellow-500" />
            <span className="text-slate-400 font-mono">{completedLabs.size}/{LABS.length}</span>
          </div>
        </div>
        
        <div className="flex gap-3 items-center">
          {/* Navigation */}
          {currentLabIndex > 0 && (
            <button 
              onClick={previousMission}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-full font-medium transition-all"
            >
              <ChevronLeft size={18} /> Précédent
            </button>
          )}
          
          {isSuccess && currentLabIndex < LABS.length - 1 && (
            <button 
              onClick={nextMission}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-full font-bold animate-bounce transition-all shadow-lg shadow-green-900/20"
            >
              Mission Suivante <ChevronRight size={18} />
            </button>
          )}
          
          <button 
            onClick={runCode} 
            disabled={isExecuting}
            className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-2 rounded-full font-bold shadow-xl shadow-indigo-600/20 active:scale-95 disabled:opacity-50 transition-all"
          >
            {isExecuting ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} fill="currentColor" />}
            {isExecuting ? "Calcul..." : "Lancer"}
          </button>
        </div>
      </header>

      <main className="flex-1 flex p-4 gap-4 overflow-hidden bg-[radial-gradient(circle_at_50%_-20%,#1e1b4b,transparent)]">
        
        {/* Colonne Gauche */}
        <div className="w-1/3 bg-slate-900/40 border border-slate-800/60 rounded-3xl p-8 overflow-y-auto backdrop-blur-sm shadow-2xl relative">
          
          {/* Choupi Assistant avec bulle de dialogue */}
          {showChoupi && (
            <div className="mb-8 animate-in slide-in-from-left duration-700 relative">
              {/* Bulle de dialogue */}
              <div className={`relative bg-gradient-to-br ${choupiState.bgColor} border-2 ${choupiState.borderColor} rounded-3xl p-6 mb-4 shadow-2xl backdrop-blur-sm`}>
                <div className={`absolute -bottom-3 left-12 w-6 h-6 bg-gradient-to-br ${choupiState.bgColor} border-r-2 border-b-2 ${choupiState.borderColor} transform rotate-45`}></div>
                <p className="text-white font-semibold text-base leading-relaxed relative z-10">
                  {choupiState.message}
                </p>
              </div>
              
              {/* Image de Choupi */}
              <div className="flex items-start gap-4">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <img 
                    src={choupiState.image}
                    alt="Choupi Assistant"
                    className="w-20 h-20 rounded-full border-4 border-white/10 shadow-xl relative z-10 object-cover animate-in zoom-in duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <button
                  onClick={() => setShowChoupi(false)}
                  className="ml-auto text-slate-500 hover:text-slate-300 transition-colors text-xs"
                  title="Masquer l'assistant"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* Bouton pour réafficher Choupi */}
          {!showChoupi && (
            <button
              onClick={() => setShowChoupi(true)}
              className="mb-6 flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
            >
              <Sparkles size={16} /> Afficher l'assistant
            </button>
          )}
          
          {/* En-tête mission */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-indigo-400 font-black uppercase tracking-widest text-xs">
              <Sparkles size={16} /> Mission {currentLab.id} / {LABS.length}
            </div>
            <button 
              onClick={resetCode}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-300 text-xs font-medium transition-colors"
              title="Réinitialiser le code"
            >
              <RotateCcw size={14} /> Reset
            </button>
          </div>

          <h2 className="text-4xl font-black mb-6 text-white leading-tight italic decoration-indigo-500 underline underline-offset-8 decoration-2">
            {currentLab.title}
          </h2>
          
          <div className="space-y-6 text-slate-300 text-base leading-relaxed">
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
              <p className="text-slate-200 leading-relaxed">{currentLab.instructions}</p>
            </div>
            
            {/* Tentatives */}
            {attempts > 0 && !isSuccess && (
              <div className="text-xs text-slate-500 font-mono">
                💪 Tentatives : {attempts}
              </div>
            )}

            {/* Bouton indice */}
            {!showHint && !isSuccess && attempts > 1 && (
              <button
                onClick={() => setShowHint(true)}
                className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 text-sm font-medium transition-colors"
              >
                <Lightbulb size={16} /> Besoin d'un indice ?
              </button>
            )}

            {/* Affichage de l'indice */}
            {showHint && (
              <div className="bg-yellow-500/10 border border-yellow-500/30 p-6 rounded-2xl animate-in slide-in-from-bottom-4 duration-300">
                <p className="text-yellow-400 font-semibold flex items-center gap-2 text-sm mb-2">
                  <Lightbulb size={18} /> Indice
                </p>
                <p className="text-yellow-500/80 text-sm font-mono leading-relaxed">
                  {currentLab.hint}
                </p>
              </div>
            )}

            {/* Message d'erreur */}
            {showError && !isSuccess && (
              <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-2xl animate-in slide-in-from-bottom-4 duration-300">
                <p className="text-red-400 font-semibold flex items-center gap-2 text-sm mb-2">
                  <AlertCircle size={18} /> Oups !
                </p>
                <p className="text-red-500/80 text-sm">
                  {errorMessage}
                </p>
              </div>
            )}
            
            {/* Succès avec animation "POUF" */}
            {isSuccess && (
              <div className="bg-green-500/10 border border-green-500/30 p-8 rounded-2xl shadow-lg relative overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
                {/* Effet d'explosion de fond */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/20 to-green-500/0 animate-pulse"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl animate-bounce">
                  💥
                </div>
                <div className="relative z-10">
                  <p className="text-green-400 font-bold flex items-center gap-2 text-xl mb-2 animate-in zoom-in duration-300">
                    <CheckCircle2 size={24} className="animate-spin" style={{animationDuration: '0.5s', animationIterationCount: '1'}} /> 
                    <span className="animate-in slide-in-from-left duration-500">Mission Accomplie !</span>
                  </p>
                  <p className="text-green-500/70 text-sm italic mb-4 animate-in fade-in duration-700 delay-200">
                    C'est parfait Choupi ! Tu progresses vite. 🎉
                  </p>
                  {attempts > 1 && (
                    <p className="text-green-600/60 text-xs font-mono animate-in fade-in duration-700 delay-300">
                      ✓ Réussi en {attempts} tentative{attempts > 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Message final */}
            {isSuccess && currentLabIndex === LABS.length - 1 && (
              <div className="bg-purple-500/10 border border-purple-500/30 p-8 rounded-2xl mt-6">
                <p className="text-purple-400 font-bold text-xl mb-2">
                  🏆 Félicitations !
                </p>
                <p className="text-purple-500/70 text-sm">
                  Tu as complété toutes les missions ! Tu es maintenant un vrai développeur PHP Choupi ! 🚀
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Colonne Droite */}
        <div className="flex-1 flex flex-col gap-4">
          
          {/* Éditeur */}
          <div className="flex-1 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex flex-col shadow-2xl transition-all hover:border-slate-700">
            <div className="px-8 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/40">
              <div className="flex items-center gap-3">
                <Code2 size={16} className="text-indigo-400" />
                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">index.php</span>
              </div>
              <span className="text-xs text-slate-600 font-mono">{code.split('\n').length} lignes</span>
            </div>
            <textarea
              className="flex-1 p-8 bg-transparent font-mono text-lg text-indigo-100 outline-none resize-none leading-relaxed selection:bg-indigo-500/30"
              value={code}
              spellCheck="false"
              onChange={(e) => setCode(e.target.value)}
              placeholder="// Écris ton code PHP ici..."
            />
          </div>

          {/* Console */}
          <div className={`h-[35%] bg-black border rounded-3xl p-8 shadow-2xl flex flex-col transition-all duration-500 ${
            isSuccess ? 'border-green-500/50 shadow-green-500/10' : 
            showError ? 'border-red-500/50 shadow-red-500/10' : 
            'border-slate-800'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-slate-500">
                <Terminal size={16} />
                <span className="text-xs font-black uppercase tracking-widest italic">Sortie Console</span>
              </div>
              {output && (
                <span className={`text-xs font-mono px-3 py-1 rounded-full ${
                  isSuccess ? 'bg-green-500/20 text-green-400' : 
                  showError ? 'bg-red-500/20 text-red-400' : 
                  'bg-slate-800 text-slate-400'
                }`}>
                  {isSuccess ? '✓ Validé' : showError ? '✗ Erreur' : '● En cours'}
                </span>
              )}
            </div>
            <pre className={`flex-1 font-mono text-base overflow-y-auto whitespace-pre-wrap transition-colors ${
              isSuccess ? 'text-green-400' : 
              showError ? 'text-red-400' : 
              'text-slate-300'
            }`}>
              {output || "> En attente d'exécution..."}
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;