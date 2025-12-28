<?php
// ============================================
// EXERCICE 1: Tableau scalaire des notes
// ============================================
echo "<h2>Exercice 1: Notes d'un élève</h2>";
$notes = [15, 12, 14, 16, 13];

echo "Notes de l'élève : ";
foreach ($notes as $note) {
    echo $note . " ";
}
echo "<br><br>";

// ============================================
// EXERCICE 2: Calculer la moyenne
// ============================================
echo "<h2>Exercice 2: Moyenne des notes</h2>";
$somme = 0;
foreach ($notes as $note) {
    $somme += $note;
}
$moyenne = $somme / count($notes);
echo "Moyenne de l'élève : " . $moyenne . "<br><br>";

// ============================================
// EXERCICE 3: Afficher la mention
// ============================================
echo "<h2>Exercice 3: Mention selon la moyenne</h2>";
if ($moyenne >= 16) {
    $mention = "Très Bien";
} elseif ($moyenne >= 14) {
    $mention = "Bien";
} elseif ($moyenne >= 12) {
    $mention = "Assez Bien";
} elseif ($moyenne >= 10) {
    $mention = "Passable";
} else {
    $mention = "Insuffisant";
}
echo "Moyenne : $moyenne - Mention : $mention<br><br>";

// ============================================
// EXERCICE 4: Tableau associatif d'un élève
// ============================================
echo "<h2>Exercice 4: Tableau associatif d'un élève</h2>";
$eleve = [
    "matricule" => "TLE001",
    "nom" => "NKOLO",
    "prenom" => "Jean",
    "dateNaissance" => "2005-03-15",
    "notes" => [15, 12, 14, 16, 13]
];

echo "Informations de l'élève :<br>";
foreach ($eleve as $cle => $valeur) {
    if ($cle != "notes") {
        echo ucfirst($cle) . " : " . $valeur . "<br>";
    } else {
        echo "Notes : " . implode(", ", $valeur) . "<br>";
    }
}
echo "<br>";

// ============================================
// EXERCICE 5: Calculer l'âge
// ============================================
echo "<h2>Exercice 5: Calcul de l'âge</h2>";
$dateNaissance = new DateTime($eleve["dateNaissance"]);
$dateAujourdhui = new DateTime();
$age = $dateAujourdhui->diff($dateNaissance)->y;
echo "Date de naissance : " . $eleve["dateNaissance"] . "<br>";
echo "Âge : " . $age . " ans<br><br>";

// ============================================
// EXERCICE 6: Fonction calculerMoyenne()
// ============================================
echo "<h2>Exercice 6: Fonction calculerMoyenne()</h2>";
function calculerMoyenne($tableauNotes) {
    $somme = 0;
    foreach ($tableauNotes as $note) {
        $somme += $note;
    }
    return $somme / count($tableauNotes);
}

$moyenneEleve = calculerMoyenne($eleve["notes"]);
echo "Moyenne calculée avec la fonction : " . $moyenneEleve . "<br><br>";

// ============================================
// EXERCICE 7: Fonction getMention()
// ============================================
echo "<h2>Exercice 7: Fonction getMention()</h2>";
function getMention($moyenne) {
    if ($moyenne >= 16) {
        return "Très Bien";
    } elseif ($moyenne >= 14) {
        return "Bien";
    } elseif ($moyenne >= 12) {
        return "Assez Bien";
    } elseif ($moyenne >= 10) {
        return "Passable";
    } else {
        return "Insuffisant";
    }
}

$mentionEleve = getMention($moyenneEleve);
echo "Mention : " . $mentionEleve . "<br><br>";

// ============================================
// EXERCICE 8: Tableau de moyennes
// ============================================
echo "<h2>Exercice 8: Moyennes de plusieurs élèves</h2>";
$moyennes = [15.5, 12.8, 16.2, 9.5, 14.0, 11.3];

echo "Moyennes des élèves : <br>";
$i = 1;
while ($i <= count($moyennes)) {
    echo "Élève $i : " . $moyennes[$i-1] . "<br>";
    $i++;
}
echo "<br>";

// ============================================
// EXERCICE 9: Tableau d'élèves (classe)
// ============================================
echo "<h2>Exercice 9: Classe avec plusieurs élèves</h2>";
$classe = [
    [
        "matricule" => "TLE001",
        "nom" => "NKOLO",
        "prenom" => "Jean",
        "notes" => [15, 12, 14, 16, 13],
        "moyenne" => 0,
        "mention" => ""
    ],
    [
        "matricule" => "TLE002",
        "nom" => "MBIDA",
        "prenom" => "Marie",
        "notes" => [18, 17, 16, 19, 18],
        "moyenne" => 0,
        "mention" => ""
    ],
    [
        "matricule" => "TLE003",
        "nom" => "FOUDA",
        "prenom" => "Paul",
        "notes" => [10, 9, 11, 8, 12],
        "moyenne" => 0,
        "mention" => ""
    ],
    [
        "matricule" => "TLE004",
        "nom" => "ATEBA",
        "prenom" => "Sophie",
        "notes" => [14, 15, 13, 14, 14],
        "moyenne" => 0,
        "mention" => ""
    ]
];

// Calculer moyenne et mention pour chaque élève
foreach ($classe as &$etudiant) {
    $etudiant["moyenne"] = calculerMoyenne($etudiant["notes"]);
    $etudiant["mention"] = getMention($etudiant["moyenne"]);
}

// Afficher les informations de chaque élève
foreach ($classe as $etudiant) {
    echo "------------------------<br>";
    echo "Nom et prénom : " . $etudiant["nom"] . " " . $etudiant["prenom"] . "<br>";
    echo "Moyenne : " . number_format($etudiant["moyenne"], 2) . "<br>";
    echo "Mention : " . $etudiant["mention"] . "<br>";
}
echo "<br>";

// ============================================
// EXERCICE 10: Vérifier si majeur ou mineur
// ============================================
echo "<h2>Exercice 10: Vérification âge (majeur/mineur)</h2>";
$dateJour = new DateTime("2025-12-28");
$dateNaissanceTest = new DateTime("2007-05-20");
$ageTest = $dateJour->diff($dateNaissanceTest)->y;

echo "Date du jour : " . $dateJour->format('d/m/Y') . "<br>";
echo "Date de naissance : " . $dateNaissanceTest->format('d/m/Y') . "<br>";
echo "Âge : " . $ageTest . " ans<br>";

if ($ageTest >= 18) {
    echo "L'élève est <strong>MAJEUR</strong><br><br>";
} else {
    echo "L'élève est <strong>MINEUR</strong><br><br>";
}

// ============================================
// EXERCICE 11: Bulletin simplifié
// ============================================
echo "<h2>Exercice 11: Bulletin simplifié</h2>";

// Données d'exemple pour le bulletin
$elevebulletin = [
    "matricule" => "TLE001",
    "nom" => "NKOLO",
    "prenom" => "Jean",
    "dateNaissance" => "2007-05-20",
    "notes" => [15, 12, 14, 16, 13]
];

// Calculer l'âge
$dateN = new DateTime($elevebulletin["dateNaissance"]);
$dateA = new DateTime();
$ageB = $dateA->diff($dateN)->y;

// Calculer la moyenne
$moyenneB = calculerMoyenne($elevebulletin["notes"]);

// Calculer la mention
$mentionB = getMention($moyenneB);

// Déterminer la décision
if ($moyenneB >= 10) {
    $decision = "Admis";
} else {
    $decision = "Ajourné";
}

// Afficher le bulletin
echo "<div style='border: 2px solid #333; padding: 20px; width: 400px; font-family: monospace;'>";
echo "<h3 style='text-align: center; text-decoration: underline;'>BULLETIN SIMPLIFIÉ</h3>";
echo "Matricule : " . $elevebulletin["matricule"] . "<br>";
echo "Nom : " . $elevebulletin["nom"] . "<br>";
echo "Prénom : " . $elevebulletin["prenom"] . "<br>";
echo "Âge : " . $ageB . " ans<br>";
echo "Moyenne : " . number_format($moyenneB, 2) . "/20<br>";
echo "Mention : " . $mentionB . "<br>";
echo "<strong>Décision : " . $decision . "</strong><br>";
echo "</div>";
echo "<br>";

echo "<p><em>Note : La décision est Admis si la moyenne est supérieure ou égale à 10.</em></p>";
?>