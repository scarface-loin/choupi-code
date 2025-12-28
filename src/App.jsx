import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Terminal, Play, Sparkles, Loader2, CheckCircle2, ChevronRight, ChevronLeft, Lightbulb, RotateCcw, Trophy, Code2, AlertCircle, BookOpen, GraduationCap, Home, X, Menu, Download } from 'lucide-react';
import _ from 'lodash';

import { LABS } from './labs';
import { LABS2 } from './labs2';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedLabs, setSelectedLabs] = useState(LABS);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingStep, setLoadingStep] = useState("Initialisation...");
  
  const [currentLabIndex, setCurrentLabIndex] = useState(0);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [completedLabs, setCompletedLabs] = useState(new Set());
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showChoupi, setShowChoupi] = useState(true);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [editorExpanded, setEditorExpanded] = useState(false);

  const currentLab = selectedLabs[currentLabIndex];

  useEffect(() => {
    const steps = [
      { p: 20, t: "Connexion..." },
      { p: 50, t: "Chargement..." },
      { p: 80, t: "Préparation..." },
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
        setTimeout(() => setIsLoading(false), 500);
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentView !== 'home' && selectedLabs.length > 0) {
      setCurrentLabIndex(0);
      setCode(selectedLabs[0].initialCode);
      setOutput("");
      setIsSuccess(false);
      setShowHint(false);
      setAttempts(0);
      setCompletedLabs(new Set());
      setShowError(false);
      setShowChoupi(true);
      setEditorExpanded(false);
    }
  }, [currentView, selectedLabs]);

  const debouncedValidate = useMemo(
    () => _.debounce((value) => {
      // Validation légère
    }, 500),
    []
  );

  const handleCodeChange = useCallback((e) => {
    const newCode = e.target.value;
    setCode(newCode);
    debouncedValidate(newCode);
  }, [debouncedValidate]);

  const runCode = async () => {
    setIsExecuting(true);
    setIsSuccess(false);
    setShowError(false);
    setOutput("☁️ Exécution...");
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
      const finalOutput = stdout || stderr || "Code exécuté.";
      
      setOutput(finalOutput);

      if (currentLab.validate(finalOutput, code)) {
        setIsSuccess(true);
        setCompletedLabs(prev => new Set([...prev, currentLab.id]));
      } else if (stderr) {
        setShowError(true);
        setErrorMessage("Erreur de syntaxe détectée !");
      } else {
        setShowError(true);
        setErrorMessage("Le résultat attendu est différent.");
      }
    } catch (error) {
      setOutput("❌ Erreur de connexion");
      setShowError(true);
      setErrorMessage("Impossible de joindre le serveur.");
    } finally {
      setIsExecuting(false);
    }
  };

  const nextMission = () => {
    if (currentLabIndex < selectedLabs.length - 1) {
      const nextIndex = currentLabIndex + 1;
      setCurrentLabIndex(nextIndex);
      setCode(selectedLabs[nextIndex].initialCode);
      setOutput("");
      setIsSuccess(false);
      setShowHint(false);
      setAttempts(0);
      setShowError(false);
      setShowChoupi(true);
      setEditorExpanded(false);
    }
  };

  const previousMission = () => {
    if (currentLabIndex > 0) {
      const prevIndex = currentLabIndex - 1;
      setCurrentLabIndex(prevIndex);
      setCode(selectedLabs[prevIndex].initialCode);
      setOutput("");
      setIsSuccess(false);
      setShowHint(false);
      setAttempts(0);
      setShowError(false);
      setShowChoupi(true);
      setEditorExpanded(false);
    }
  };

  const resetCode = () => {
    setCode(currentLab.initialCode);
    setOutput("");
    setIsSuccess(false);
    setShowHint(false);
    setShowError(false);
  };

  const goHome = () => {
    setCurrentView('home');
    setCompletedLabs(new Set());
  };

  const downloadCorrection = () => {
    const link = document.createElement('a');
    link.href = '/index.php';
    link.download = 'correction-hello-choupi.php';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getChoupiState = () => {
    if (isSuccess) {
      return {
        message: 'Mission réussie ! 🌟',
        bgColor: 'from-green-400/20 to-emerald-500/20',
        borderColor: 'border-green-400/40'
      };
    }
    if (showError) {
      return {
        message: 'Vérifie ton code 🤔',
        bgColor: 'from-orange-400/20 to-red-500/20',
        borderColor: 'border-orange-400/40'
      };
    }
    if (showHint) {
      return {
        message: 'Voici un indice ! 💡',
        bgColor: 'from-yellow-400/20 to-amber-500/20',
        borderColor: 'border-yellow-400/40'
      };
    }
    return {
      message: 'Prêt pour la mission ? 🚀',
      bgColor: 'from-indigo-400/20 to-purple-500/20',
      borderColor: 'border-indigo-400/40'
    };
  };

  const choupiState = getChoupiState();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-8 text-center">
          <div className="relative">
            <div className="absolute -inset-8 bg-indigo-500 blur-[60px] opacity-20 animate-pulse"></div>
            <div className="relative w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl mx-auto rotate-12">
              <span className="text-white text-5xl font-black -rotate-12 italic">P</span>
            </div>
          </div>
          <h1 className="text-4xl font-black">
            <span className="text-white">Hello</span>
            <span className="ml-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Choupi</span>
          </h1>
          <div className="space-y-3">
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-slate-500 text-xs font-mono uppercase tracking-wider">{loadingStep}</p>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'home') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col p-6">
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full space-y-8">
          
          <div className="text-center space-y-4">
            <div className="relative w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl mx-auto rotate-12">
              <span className="text-white text-5xl font-black -rotate-12 italic">P</span>
            </div>
            <h1 className="text-4xl font-black">
              <span className="text-white">Hello</span>
              <span className="ml-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Choupi</span>
            </h1>
            <p className="text-slate-400 text-sm">
              Apprends PHP de manière interactive 🚀
            </p>
          </div>

          <div className="space-y-4">
            
            <button
              onClick={() => {
                setSelectedLabs(LABS);
                setCurrentView('labs');
              }}
              className="w-full group relative bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-2 border-indigo-500/30 active:border-indigo-400 rounded-2xl p-6 text-left transition-all active:scale-95"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
                  <BookOpen size={24} className="text-white" />
                </div>
                
                <div>
                  <h2 className="text-2xl font-black text-white mb-1">Labs PHP</h2>
                  <p className="text-slate-400 text-sm mb-3">
                    Missions progressives : variables, boucles, fonctions
                  </p>
                  
                  <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
                    Commencer <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            </button>

            <button
              onClick={() => {
                setSelectedLabs(LABS2);
                setCurrentView('tp');
              }}
              className="w-full group relative bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-2 border-green-500/30 active:border-green-400 rounded-2xl p-6 text-left transition-all active:scale-95"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                  <GraduationCap size={24} className="text-white" />
                </div>
                
                <div>
                  <h2 className="text-2xl font-black text-white mb-1">Ton TP</h2>
                  <p className="text-slate-400 text-sm mb-3">
                    Projet complet : gestion de notes
                  </p>
                  
                  <div className="flex items-center gap-2 text-green-400 font-semibold text-sm">
                    Commencer <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            </button>
          </div>

          <p className="text-center text-slate-500 text-xs">
            💡 Commence par les Labs si tu débutes !
          </p>

          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={downloadCorrection}
              className="w-full flex items-center justify-center gap-2 bg-slate-800/50 hover:bg-slate-800 active:bg-slate-700 border border-slate-700 text-slate-300 rounded-xl py-3 font-medium transition-all active:scale-95"
            >
              <Download size={16} />
              <span className="text-sm">Télécharger la correction</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col">
      
      {/* Header Mobile Compact */}
      <header className="h-14 border-b border-slate-800 flex items-center justify-between px-4 bg-slate-900/50 backdrop-blur-xl flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={goHome}
            className="w-8 h-8 flex items-center justify-center text-slate-400 active:text-white transition-colors"
            aria-label="Retour à l'accueil"
          >
            <Home size={18} />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center font-black text-sm">
              P
            </div>
            <span className="text-xs text-slate-400 font-mono">
              {currentLabIndex + 1}/{selectedLabs.length}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs">
            <Trophy size={12} className="text-yellow-500" />
            <span className="text-slate-400 font-mono">{completedLabs.size}</span>
          </div>
          
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="w-8 h-8 flex items-center justify-center text-slate-400 active:text-white transition-colors"
            aria-label="Menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      {/* Menu Mobile Slide */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200" onClick={() => setShowMobileMenu(false)}>
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-slate-900 border-l border-slate-800 p-4 space-y-3 animate-in slide-in-from-right duration-300" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-white">Actions</span>
              <button onClick={() => setShowMobileMenu(false)} className="text-slate-400">
                <X size={18} />
              </button>
            </div>
            
            <button
              onClick={() => {
                resetCode();
                setShowMobileMenu(false);
              }}
              className="w-full flex items-center gap-3 p-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm text-left transition-colors"
            >
              <RotateCcw size={16} className="text-slate-400" />
              <span>Réinitialiser</span>
            </button>
            
            {!showHint && attempts > 1 && (
              <button
                onClick={() => {
                  setShowHint(true);
                  setShowMobileMenu(false);
                }}
                className="w-full flex items-center gap-3 p-3 bg-yellow-500/10 hover:bg-yellow-500/20 rounded-xl text-sm text-left transition-colors"
              >
                <Lightbulb size={16} className="text-yellow-500" />
                <span className="text-yellow-500">Voir l'indice</span>
              </button>
            )}
          </div>
        </div>
      )}

      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Instructions Section - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {/* Choupi Compact */}
          {showChoupi && (
            <div className="animate-in slide-in-from-top duration-500">
              <div className={`relative bg-gradient-to-br ${choupiState.bgColor} border-2 ${choupiState.borderColor} rounded-2xl p-4 shadow-xl`}>
                <button
                  onClick={() => setShowChoupi(false)}
                  className="absolute top-2 right-2 text-slate-400 hover:text-white w-6 h-6 flex items-center justify-center"
                  aria-label="Fermer Choupi"
                >
                  <X size={14} />
                </button>
                <p className="text-white text-sm font-semibold pr-6">
                  {choupiState.message}
                </p>
              </div>
            </div>
          )}

          {!showChoupi && (
            <button
              onClick={() => setShowChoupi(true)}
              className="flex items-center gap-2 text-indigo-400 text-sm font-medium"
            >
              <Sparkles size={14} /> Afficher l'assistant
            </button>
          )}

          <div className="flex items-center justify-between">
            <span className="text-indigo-400 font-black uppercase tracking-wider text-xs">
              Mission {currentLab.id}
            </span>
          </div>

          {currentLab.miniCours && (
            <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-xl p-4">
              <pre className="text-indigo-200 text-xs leading-relaxed whitespace-pre-wrap font-mono">
                {currentLab.miniCours}
              </pre>
            </div>
          )}

          <h2 className="text-2xl font-black text-white leading-tight">
            {currentLab.title}
          </h2>
          
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
            <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">
              {currentLab.instructions}
            </p>
          </div>

          {showHint && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-xl animate-in slide-in-from-bottom-4 duration-300">
              <p className="text-yellow-400 font-semibold flex items-center gap-2 text-sm mb-2">
                <Lightbulb size={16} /> Indice
              </p>
              <p className="text-yellow-500/80 text-xs font-mono leading-relaxed">
                {currentLab.hint}
              </p>
            </div>
          )}

          {showError && !isSuccess && (
            <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl animate-in slide-in-from-bottom-4 duration-300">
              <p className="text-red-400 font-semibold flex items-center gap-2 text-sm mb-1">
                <AlertCircle size={16} /> Erreur
              </p>
              <p className="text-red-500/80 text-xs">{errorMessage}</p>
            </div>
          )}
          
          {isSuccess && (
            <div className="bg-green-500/10 border border-green-500/30 p-6 rounded-xl relative overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
              <p className="text-green-400 font-bold flex items-center gap-2 text-lg mb-2">
                <CheckCircle2 size={20} /> Mission Accomplie !
              </p>
              <p className="text-green-500/70 text-sm">
                Excellent travail Choupi ! 🎉
              </p>
            </div>
          )}

          {/* Éditeur Expandable */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <button
              onClick={() => setEditorExpanded(!editorExpanded)}
              className="w-full px-4 py-3 border-b border-slate-800 flex justify-between items-center bg-slate-950/40"
            >
              <div className="flex items-center gap-2">
                <Code2 size={14} className="text-indigo-400" />
                <span className="text-xs font-mono text-slate-500 uppercase">Éditeur</span>
              </div>
              <ChevronRight size={16} className={`text-slate-500 transition-transform ${editorExpanded ? 'rotate-90' : ''}`} />
            </button>
            
            <textarea
              className={`w-full p-4 bg-transparent font-mono text-sm text-indigo-100 outline-none resize-none leading-relaxed transition-all ${editorExpanded ? 'h-64' : 'h-32'}`}
              value={code}
              onChange={handleCodeChange}
              spellCheck="false"
              placeholder="// Écris ton code PHP ici..."
              aria-label="Éditeur de code PHP"
            />
          </div>

          {/* Console Compacte */}
          <div className={`bg-black border rounded-xl p-4 transition-all ${
            isSuccess ? 'border-green-500/50' : 
            showError ? 'border-red-500/50' : 
            'border-slate-800'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-slate-500">
                <Terminal size={12} />
                <span className="text-xs font-black uppercase">Console</span>
              </div>
              {output && (
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  isSuccess ? 'bg-green-500/20 text-green-400' : 
                  showError ? 'bg-red-500/20 text-red-400' : 
                  'bg-slate-800 text-slate-400'
                }`}>
                  {isSuccess ? '✓' : showError ? '✗' : '●'}
                </span>
              )}
            </div>
            <pre className={`font-mono text-xs whitespace-pre-wrap max-h-32 overflow-y-auto ${
              isSuccess ? 'text-green-400' : 
              showError ? 'text-red-400' : 
              'text-slate-300'
            }`}>
              {output || "> En attente..."}
            </pre>
          </div>
        </div>

        {/* Bottom Navigation Bar - Fixed */}
        <div className="border-t border-slate-800 bg-slate-900/90 backdrop-blur-xl p-3 space-y-2 flex-shrink-0">
          
          {/* Bouton Exécuter - Priorité Maximale */}
          <button
            onClick={runCode}
            disabled={isExecuting}
            className="w-full h-12 flex items-center justify-center gap-2 bg-indigo-600 active:bg-indigo-500 text-white rounded-xl font-bold shadow-xl active:scale-95 disabled:opacity-50 transition-all"
            aria-label="Exécuter le code PHP"
            aria-busy={isExecuting}
          >
            {isExecuting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Exécution...</span>
              </>
            ) : (
              <>
                <Play size={18} fill="currentColor" />
                <span>Lancer le code</span>
              </>
            )}
          </button>

          {/* Navigation Missions */}
          <div className="flex gap-2">
            {currentLabIndex > 0 && (
              <button 
                onClick={previousMission}
                className="flex-1 h-11 flex items-center justify-center gap-2 bg-slate-800 active:bg-slate-700 text-slate-300 rounded-xl font-medium transition-all active:scale-95"
                aria-label="Mission précédente"
              >
                <ChevronLeft size={16} />
                <span className="text-sm">Précédent</span>
              </button>
            )}
            
            {isSuccess && currentLabIndex < selectedLabs.length - 1 && (
              <button 
                onClick={nextMission}
                className="flex-1 h-11 flex items-center justify-center gap-2 bg-green-600 active:bg-green-500 text-white rounded-xl font-bold transition-all shadow-lg active:scale-95"
                aria-label="Mission suivante"
              >
                <span className="text-sm">Suivant</span>
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;