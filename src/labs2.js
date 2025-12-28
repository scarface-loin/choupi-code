export const LABS2 = [
  {
    id: 1,
    title: "Créer un tableau de notes",
    miniCours: `📚 MINI-COURS : Les tableaux scalaires en PHP

Un tableau (array) permet de stocker plusieurs valeurs dans une seule variable.

Syntaxe :
$notes = [15, 12, 18, 14, 16];

Pour accéder à un élément :
$notes[0] → première note (15)
$notes[1] → deuxième note (12)

Les indices commencent toujours à 0 !`,
    instructions: "Créer un tableau $notes contenant les notes d'un élève dans cinq matières : 15, 12, 18, 14, 16. À l'aide d'une boucle foreach, afficher toutes les notes séparées par des espaces.",
    initialCode: `<?php

// Créer le tableau $notes avec 5 notes

// Utiliser foreach pour afficher chaque note
`,
    hint: "1. Déclare : $notes = [15, 12, 18, 14, 16];\n2. Utilise : foreach ($notes as $note) { echo $note . ' '; }",
    validate: (output, code) => {
      const clean = output.trim();
      return code.includes('$notes') && 
             clean.includes('15') && 
             clean.includes('12') && 
             clean.includes('18') && 
             clean.includes('14') && 
             clean.includes('16');
    }
  },
  {
    id: 2,
    title: "Calculer la moyenne",
    miniCours: `📚 MINI-COURS : Calculer une moyenne

Pour calculer une moyenne, on a besoin de :
1. La somme des valeurs → array_sum($tableau)
2. Le nombre de valeurs → count($tableau)

Formule :
$moyenne = array_sum($notes) / count($notes);

Exemple :
$notes = [10, 15, 20];
$moyenne = array_sum($notes) / count($notes);
// $moyenne = 45 / 3 = 15`,
    instructions: "À l'aide d'une boucle (for ou foreach), calculer et afficher la moyenne des notes de l'élève. Le tableau $notes est déjà créé avec les valeurs [15, 12, 18, 14, 16].",
    initialCode: `<?php

$notes = [15, 12, 18, 14, 16];

// Calculer la moyenne et l'afficher
`,
    hint: "Utilise array_sum($notes) / count($notes) pour calculer la moyenne, puis affiche-la avec echo.",
    validate: (output) => {
      const result = parseFloat(output.trim());
      return result === 15; // (15+12+18+14+16)/5 = 15
    }
  },
  {
    id: 3,
    title: "Déterminer la mention",
    miniCours: `📚 MINI-COURS : Structures conditionnelles multiples

Pour plusieurs conditions, on utilise if...elseif...else :

if (condition1) {
    // Si condition1 est vraie
} elseif (condition2) {
    // Sinon, si condition2 est vraie
} else {
    // Sinon (aucune condition vraie)
}

Opérateurs de comparaison :
>= (supérieur ou égal)
< (strictement inférieur)
== (égal)`,
    instructions: "À l'aide d'une structure conditionnelle if...else, afficher la mention de l'élève selon sa moyenne :\n• moyenne ≥ 16 : Très Bien\n• moyenne ≥ 14 : Bien\n• moyenne ≥ 12 : Assez Bien\n• moyenne ≥ 10 : Passable\n• moyenne < 10 : Insuffisant\n\nUtilise $moyenne = 15.",
    initialCode: `<?php

$moyenne = 15;

// Afficher la mention selon la moyenne
`,
    hint: "Commence par la condition la plus élevée (>= 16), puis descends progressivement. N'oublie pas les elseif !",
    validate: (output) => {
      return output.trim() === "Bien";
    }
  },
  {
    id: 4,
    title: "Tableau associatif élève",
    miniCours: `📚 MINI-COURS : Tableaux associatifs

Un tableau associatif utilise des clés nommées au lieu d'indices numériques.

Syntaxe :
$eleve = [
    'matricule' => 'TLE001',
    'nom' => 'Dupont',
    'prenom' => 'Jean'
];

Accès aux valeurs :
echo $eleve['nom']; // Affiche : Dupont
echo $eleve['prenom']; // Affiche : Jean

Les clés sont entre guillemets !`,
    instructions: "Créer un tableau associatif $eleve contenant :\n• matricule : TLE001\n• nom : Kamga\n• prenom : Marie\n• date_naissance : 2005-03-15\n• notes : [15, 12, 18, 14, 16]\n\nAfficher les informations de l'élève à l'aide d'une boucle foreach.",
    initialCode: `<?php

// Créer le tableau associatif $eleve

// Afficher toutes les informations avec foreach
`,
    hint: "1. Crée : $eleve = ['matricule' => 'TLE001', 'nom' => 'Kamga', ...];\n2. Utilise : foreach ($eleve as $cle => $valeur) pour parcourir.",
    validate: (output, code) => {
      const clean = output.toLowerCase();
      return code.includes('$eleve') && 
             clean.includes('tle001') && 
             clean.includes('kamga') && 
             clean.includes('marie');
    }
  },
  {
    id: 5,
    title: "Calculer l'âge",
    miniCours: `📚 MINI-COURS : Fonctions de date en PHP

PHP offre des fonctions pour manipuler les dates :

date('Y') → année actuelle (ex: 2025)
date('Y-m-d') → date complète (2025-12-28)

Pour calculer un âge :
$anneeActuelle = date('Y');
$anneeNaissance = 2005;
$age = $anneeActuelle - $anneeNaissance;

On peut extraire l'année d'une date :
$dateNaissance = '2005-03-15';
$anneeNaissance = substr($dateNaissance, 0, 4);`,
    instructions: "À partir de la date de naissance de l'élève (2005-03-15), calculer et afficher son âge en années en utilisant les fonctions de date de PHP. Utilisez date('Y') pour l'année actuelle.",
    initialCode: `<?php

$dateNaissance = '2005-03-15';

// Calculer et afficher l'âge
`,
    hint: "1. Extrais l'année : $anneeNaissance = substr($dateNaissance, 0, 4);\n2. Calcule : $age = date('Y') - $anneeNaissance;\n3. Affiche avec echo.",
    validate: (output) => {
      const age = parseInt(output.trim());
      return age === 20 || age === 19; // Selon la date actuelle
    }
  },
  {
    id: 6,
    title: "Fonction calculerMoyenne()",
    miniCours: `📚 MINI-COURS : Les fonctions avec paramètres

Une fonction est un bloc de code réutilisable.

Syntaxe :
function nomFonction($parametre) {
    // Code à exécuter
    return $resultat;
}

Exemple :
function calculerMoyenne($notes) {
    $somme = array_sum($notes);
    $nombre = count($notes);
    return $somme / $nombre;
}

Appel de la fonction :
$moyenne = calculerMoyenne([10, 15, 20]);`,
    instructions: "Écrire une fonction calculerMoyenne() qui reçoit un tableau de notes en paramètre et retourne la moyenne. Utiliser cette fonction pour recalculer la moyenne de l'élève avec les notes [15, 12, 18, 14, 16].",
    initialCode: `<?php

// Créer la fonction calculerMoyenne($notes)


// Tester la fonction avec [15, 12, 18, 14, 16]
`,
    hint: "function calculerMoyenne($notes) {\n    return array_sum($notes) / count($notes);\n}\nPuis : echo calculerMoyenne([15, 12, 18, 14, 16]);",
    validate: (output, code) => {
      const result = parseFloat(output.trim());
      return code.includes('function') && 
             code.includes('calculerMoyenne') && 
             result === 15;
    }
  },
  {
    id: 7,
    title: "Fonction getMention()",
    miniCours: `📚 MINI-COURS : Fonctions retournant des chaînes

Une fonction peut retourner n'importe quel type de valeur :
- Nombres (int, float)
- Chaînes de caractères (string)
- Tableaux (array)
- Booléens (true/false)

Exemple :
function getMention($moyenne) {
    if ($moyenne >= 16) {
        return 'Très Bien';
    }
    // ... autres conditions
}

$mention = getMention(15);
echo $mention; // Affiche : Bien`,
    instructions: "Écrire une fonction getMention() qui reçoit une moyenne en paramètre et retourne la mention correspondante (Très Bien, Bien, Assez Bien, Passable, Insuffisant). Tester avec la moyenne 15.",
    initialCode: `<?php

// Créer la fonction getMention($moyenne)


// Tester avec 15
`,
    hint: "Reprends la logique de l'exercice 3, mais dans une fonction qui retourne la mention au lieu de l'afficher.",
    validate: (output, code) => {
      return code.includes('function') && 
             code.includes('getMention') && 
             output.trim() === 'Bien';
    }
  },
  {
    id: 8,
    title: "Afficher plusieurs moyennes",
    miniCours: `📚 MINI-COURS : Boucle while

La boucle while répète un code tant qu'une condition est vraie.

Syntaxe :
$i = 0;
while ($i < 5) {
    echo $i;
    $i++; // Incrémenter pour éviter boucle infinie
}

Avec un tableau :
$eleves = [[12, 15], [10, 14], [18, 16]];
$i = 0;
while ($i < count($eleves)) {
    $moyenne = calculerMoyenne($eleves[$i]);
    echo $moyenne . ' ';
    $i++;
}`,
    instructions: "Créer un tableau contenant les moyennes de plusieurs élèves : [15, 12, 18, 10, 16]. À l'aide d'une boucle while, afficher toutes les moyennes séparées par des espaces.",
    initialCode: `<?php

$moyennes = [15, 12, 18, 10, 16];

// Utiliser une boucle while pour afficher toutes les moyennes
`,
    hint: "$i = 0;\nwhile ($i < count($moyennes)) {\n    echo $moyennes[$i] . ' ';\n    $i++;\n}",
    validate: (output) => {
      const clean = output.trim();
      return clean.includes('15') && 
             clean.includes('12') && 
             clean.includes('18') && 
             clean.includes('10') && 
             clean.includes('16');
    }
  },
  {
    id: 9,
    title: "Classe avec plusieurs élèves",
    miniCours: `📚 MINI-COURS : Tableaux multidimensionnels

Un tableau peut contenir d'autres tableaux !

Exemple :
$classe = [
    [
        'nom' => 'Dupont',
        'prenom' => 'Jean',
        'moyenne' => 15,
        'mention' => 'Bien'
    ],
    [
        'nom' => 'Martin',
        'prenom' => 'Sophie',
        'moyenne' => 18,
        'mention' => 'Très Bien'
    ]
];

Accès :
echo $classe[0]['nom']; // Dupont
echo $classe[1]['moyenne']; // 18`,
    instructions: "Créer un tableau associatif représentant une classe contenant plusieurs élèves. Pour chaque élève, stocker : nom, prénom, moyenne, mention. À l'aide d'une boucle foreach, afficher pour chaque élève : nom et prénom, moyenne, mention (un élève par ligne).",
    initialCode: `<?php

// Créer le tableau $classe avec au moins 3 élèves

// Afficher les informations de chaque élève
`,
    hint: "$classe = [\n    ['nom' => 'Kamga', 'prenom' => 'Marie', 'moyenne' => 15, 'mention' => 'Bien'],\n    // ... autres élèves\n];\nPuis : foreach ($classe as $eleve) { ... }",
    validate: (output, code) => {
      const lines = output.trim().split('\n').filter(l => l.trim());
      return code.includes('$classe') && 
             code.includes('foreach') && 
             lines.length >= 3; // Au moins 3 élèves affichés
    }
  },
  {
    id: 10,
    title: "Vérifier si élève majeur",
    miniCours: `📚 MINI-COURS : Structures conditionnelles avancées

Pour vérifier l'âge de la majorité, on combine calcul et condition.

Étapes :
1. Calculer l'âge (comme exercice 5)
2. Comparer avec 18 ans
3. Afficher le résultat

Opérateur ternaire (optionnel) :
$statut = ($age >= 18) ? 'Majeur' : 'Mineur';

Équivalent à :
if ($age >= 18) {
    $statut = 'Majeur';
} else {
    $statut = 'Mineur';
}`,
    instructions: "Afficher la date du jour. Vérifier si l'élève (date de naissance : 2005-03-15) est majeur ou mineur à l'aide d'une structure conditionnelle. Afficher 'Majeur' ou 'Mineur'.",
    initialCode: `<?php

$dateNaissance = '2005-03-15';

// Afficher la date du jour avec date('Y-m-d')

// Calculer l'âge

// Vérifier et afficher si majeur ou mineur
`,
    hint: "1. echo date('Y-m-d');\n2. Calcule l'âge comme dans l'exercice 5\n3. if ($age >= 18) { echo 'Majeur'; } else { echo 'Mineur'; }",
    validate: (output, code) => {
      const clean = output.toLowerCase();
      return (clean.includes('majeur') || clean.includes('mineur')) && 
             code.includes('date');
    }
  },
  {
    id: 11,
    title: "Bulletin simplifié",
    miniCours: `📚 MINI-COURS : Affichage formaté

Pour créer un bulletin, on affiche les informations ligne par ligne.

Concaténation :
echo "Nom : " . $eleve['nom'] . "\n";

\n = retour à la ligne (en ligne de commande)
<br> = retour à la ligne (en HTML)

Formatage :
echo "Matricule : " . $eleve['matricule'] . "\n";
echo "Nom : " . $eleve['nom'] . "\n";
echo "Moyenne : " . $moyenne . "\n";
echo "Décision : " . $decision . "\n";`,
    instructions: "Écrire un code PHP qui affiche un bulletin simplifié sous la forme :\n\nMatricule : TLE001\nNom : Kamga\nPrénom : Marie\nÂge : 20\nMoyenne : 15\nMention : Bien\nDécision : Admis\n\nLa décision est 'Admis' si la moyenne est supérieure ou égale à 10, sinon 'Ajourné'.",
    initialCode: `<?php

// Définir les variables de l'élève
$eleve = [
    'matricule' => 'TLE001',
    'nom' => 'Kamga',
    'prenom' => 'Marie',
    'dateNaissance' => '2005-03-15',
    'notes' => [15, 12, 18, 14, 16]
];

// Calculer les valeurs nécessaires (âge, moyenne, mention, décision)

// Afficher le bulletin
`,
    hint: "Calcule d'abord toutes les valeurs (âge, moyenne, mention), puis affiche chaque ligne avec echo. N'oublie pas les \\n pour les retours à la ligne.",
    validate: (output, code) => {
      const clean = output.toLowerCase();
      return clean.includes('matricule') && 
             clean.includes('kamga') && 
             clean.includes('marie') && 
             clean.includes('15') && 
             clean.includes('admis');
    }
  },
  {
    id: 12,
    title: "Projet final : Système complet",
    miniCours: `📚 MINI-COURS : Projet intégré

Un système complet combine toutes les notions :
- Tableaux associatifs (données élèves)
- Fonctions (calculerMoyenne, getMention)
- Boucles (parcourir tous les élèves)
- Conditions (décision d'admission)
- Formatage (affichage du bulletin)

Organisation du code :
1. Définir les fonctions
2. Créer les données
3. Traiter les données
4. Afficher les résultats

Bonnes pratiques :
- Une fonction = une responsabilité
- Noms de variables explicites
- Commentaires pour clarifier`,
    instructions: "Créer un système complet de gestion des notes :\n\n1. Définir au moins 3 élèves avec leurs informations complètes\n2. Pour chaque élève :\n   - Calculer la moyenne (fonction calculerMoyenne)\n   - Déterminer la mention (fonction getMention)\n   - Calculer l'âge\n   - Déterminer la décision (Admis/Ajourné)\n3. Afficher le bulletin de chaque élève\n\nLe programme doit être modulaire et réutilisable !",
    initialCode: `<?php

// ===== FONCTIONS =====

function calculerMoyenne($notes) {
    // À compléter
}

function getMention($moyenne) {
    // À compléter
}

function calculerAge($dateNaissance) {
    // À compléter
}

function getDecision($moyenne) {
    // À compléter (Admis si >= 10)
}

// ===== DONNÉES =====

$classe = [
    // Définir au moins 3 élèves
];

// ===== TRAITEMENT ET AFFICHAGE =====

// Parcourir tous les élèves et afficher leurs bulletins
`,
    hint: "Reprends toutes les fonctions créées précédemment. Pour chaque élève, applique toutes les fonctions et affiche le bulletin complet. Utilise foreach pour parcourir la classe.",
    validate: (output, code) => {
      const hasAllFunctions = code.includes('function calculerMoyenne') && 
                              code.includes('function getMention') && 
                              code.includes('function calculerAge') && 
                              code.includes('function getDecision');
      
      const hasData = code.includes('$classe');
      const hasLoop = code.includes('foreach');
      
      const lines = output.split('\n').filter(l => l.trim());
      const hasOutput = lines.length >= 10; // Au moins 10 lignes d'output
      
      return hasAllFunctions && hasData && hasLoop && hasOutput;
    }
  }
];