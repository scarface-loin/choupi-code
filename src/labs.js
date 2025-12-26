export const LABS = [
  {
    id: 1,
    title: "Ta première variable",
    instructions: "En PHP, les variables commencent par un $. Crée une variable nommée $prenom et donne-lui la valeur 'Choupi'. Affiche-la ensuite avec l'instruction echo.",
    initialCode: "<?php\n\n// Écris ton code ici\n",
    hint: "N'oublie pas : $prenom = 'Choupi'; puis echo $prenom;",
    validate: (output, code) => {
      const cleanOutput = output.trim();
      return cleanOutput.includes("Choupi") && code.includes("$prenom");
    }
  },
  {
    id: 2,
    title: "Le génie des maths",
    instructions: "Déclare une variable $age avec la valeur 20. Affiche le résultat de $age + 5 (le résultat doit être 25).",
    initialCode: "<?php\n\n$age = 20;\n",
    hint: "Utilise echo pour afficher le calcul : echo $age + 5;",
    validate: (output) => output.trim() === "25"
  },
  {
    id: 3,
    title: "La concaténation",
    instructions: "Utilise le point (.) pour coller deux morceaux de texte. Affiche 'J'apprends le PHP' en utilisant les deux variables fournies.",
    initialCode: "<?php\n\n$a = \"J'apprends\";\n$b = \"le PHP\";\n",
    hint: "Pour coller du texte : echo $a . ' ' . $b;",
    validate: (output) => output.trim().toLowerCase() === "j'apprends le php"
  },
  {
    id: 4,
    title: "Les conditions (IF)",
    instructions: "Crée une variable $note = 15. Si la note est supérieure à 10, affiche 'Réussite !'. Sinon, affiche 'Échec'.",
    initialCode: "<?php\n\n$note = 15;\n",
    hint: "Structure : if ($note > 10) { echo 'Réussite !'; }",
    validate: (output) => output.trim() === "Réussite !"
  },
  {
    id: 5,
    title: "Les Tableaux (Array)",
    instructions: "Crée un tableau $fruits contenant 'Pomme' et 'Banane'. Affiche 'Banane' en utilisant son index (1).",
    initialCode: "<?php\n\n// Exemple : $monTab = ['A', 'B'];\n",
    hint: "Les indices commencent à 0. 'Banane' est donc à l'index 1.",
    validate: (output) => output.trim() === "Banane"
  },
  {
    id: 6,
    title: "Compter avec une boucle FOR",
    instructions: "Utilise une boucle for pour afficher les nombres de 1 à 5, séparés par des espaces (résultat attendu : '1 2 3 4 5').",
    initialCode: "<?php\n\n// Utilise : for ($i = 1; $i <= 5; $i++)\n",
    hint: "N'oublie pas d'ajouter un espace entre chaque nombre !",
    validate: (output) => output.trim() === "1 2 3 4 5"
  },
  {
    id: 7,
    title: "Les conditions multiples (ELSE IF)",
    instructions: "Crée une variable $temperature = 25. Affiche 'Chaud' si >= 25, 'Doux' si >= 15, sinon 'Froid'.",
    initialCode: "<?php\n\n$temperature = 25;\n",
    hint: "Utilise if, elseif, et else pour couvrir tous les cas.",
    validate: (output) => output.trim() === "Chaud"
  },
  {
    id: 8,
    title: "Parcourir un tableau (FOREACH)",
    instructions: "Crée un tableau $couleurs = ['Rouge', 'Vert', 'Bleu']. Utilise foreach pour afficher chaque couleur sur une ligne (séparées par des espaces).",
    initialCode: "<?php\n\n$couleurs = ['Rouge', 'Vert', 'Bleu'];\n",
    hint: "foreach ($couleurs as $couleur) { echo $couleur . ' '; }",
    validate: (output) => {
      const clean = output.trim();
      return clean.includes("Rouge") && clean.includes("Vert") && clean.includes("Bleu");
    }
  },
  {
    id: 9,
    title: "Les fonctions",
    instructions: "Crée une fonction direBonjour() qui affiche 'Bonjour le monde !'. Appelle ensuite cette fonction.",
    initialCode: "<?php\n\n// Déclare ta fonction ici\n",
    hint: "function direBonjour() { echo 'Bonjour le monde !'; } puis direBonjour();",
    validate: (output) => output.trim() === "Bonjour le monde !"
  },
  {
    id: 10,
    title: "Fonction avec paramètres",
    instructions: "Crée une fonction multiplier($a, $b) qui retourne le produit de $a et $b. Affiche le résultat de multiplier(4, 5).",
    initialCode: "<?php\n\n// Ta fonction ici\n",
    hint: "Utilise 'return' dans ta fonction, puis echo multiplier(4, 5);",
    validate: (output) => output.trim() === "20"
  },
  {
    id: 11,
    title: "Tableaux associatifs",
    instructions: "Crée un tableau $personne avec les clés 'nom' => 'Dupont' et 'age' => 30. Affiche l'âge.",
    initialCode: "<?php\n\n// Exemple : $tab = ['cle' => 'valeur'];\n",
    hint: "Pour accéder : echo $personne['age'];",
    validate: (output) => output.trim() === "30"
  },
  {
    id: 12,
    title: "Compter les éléments",
    instructions: "Crée un tableau $animaux = ['Chat', 'Chien', 'Oiseau', 'Poisson']. Affiche le nombre d'éléments avec count().",
    initialCode: "<?php\n\n$animaux = ['Chat', 'Chien', 'Oiseau', 'Poisson'];\n",
    hint: "La fonction count() retourne le nombre d'éléments d'un tableau.",
    validate: (output) => output.trim() === "4"
  },
  {
    id: 13,
    title: "Manipulation de chaînes",
    instructions: "Crée une variable $texte = 'bonjour'. Affiche-le en majuscules avec la fonction strtoupper().",
    initialCode: "<?php\n\n$texte = 'bonjour';\n",
    hint: "echo strtoupper($texte);",
    validate: (output) => output.trim() === "BONJOUR"
  },
  {
    id: 14,
    title: "Vérifier si une variable existe",
    instructions: "Crée une variable $existe = 'Je suis là'. Utilise isset() dans un if pour afficher 'Variable définie' si elle existe.",
    initialCode: "<?php\n\n$existe = 'Je suis là';\n",
    hint: "if (isset($existe)) { echo 'Variable définie'; }",
    validate: (output) => output.trim() === "Variable définie"
  },
  {
    id: 15,
    title: "Le défi final !",
    instructions: "Crée une fonction calculerMoyenne($notes) qui prend un tableau de notes et retourne leur moyenne. Teste avec [12, 15, 18] (résultat attendu : 15).",
    initialCode: "<?php\n\n// Crée ta fonction ici\n// Pense à utiliser array_sum() et count()\n",
    hint: "array_sum($notes) / count($notes) te donne la moyenne !",
    validate: (output) => {
      const result = parseFloat(output.trim());
      return result === 15;
    }
  }
];