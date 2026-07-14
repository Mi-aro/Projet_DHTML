// Fonction pour calculer le déterminant d'une matrice 3x3 (Règle de Sarrus)
function calcDet(a11, a12, a13, a21, a22, a23, a31, a32, a33)
{return (a11 * a22 * a33) + (a12 * a23 * a31) + (a13 * a21 * a32)- (a13 * a22 * a31) - (a11 * a23 * a32) - (a12 * a21 * a33);
}

function afficherSection(idetifiant) {
    const sections = ['acceuil', 'cramer', 'image', 'panneaux', 'database'];

    sections.forEach(function(id){
        const element = document.getElementById('content-'+id);
        if(element) {
            if (id === idetifiant) {
                element.classList.remove('d-none');
            }
            else {
                element.classList.add('d-none');
            }
        }
    });

}


function resoudreCramer() {
    // 1. Récupération des valeurs saisies par l'utilisateur
    const a11 = parseFloat(document.getElementById('a11').value);
    const a12 = parseFloat(document.getElementById('a12').value);
    const a13 = parseFloat(document.getElementById('a13').value);
    const b1 = parseFloat(document.getElementById('b1').value);

    const a21 = parseFloat(document.getElementById('a21').value);
    const a22 = parseFloat(document.getElementById('a22').value);
    const a23 = parseFloat(document.getElementById('a23').value);
    const b2 = parseFloat(document.getElementById('b2').value);

    const a31 = parseFloat(document.getElementById('a31').value);
    const a32 = parseFloat(document.getElementById('a32').value);
    const a33 = parseFloat(document.getElementById('a33').value);
    const b3 = parseFloat(document.getElementById('b3').value);


    // Validation rapide (si un champ est vide)
    if (isNaN(a11) || isNaN(a12) || isNaN(a13) || isNaN(b1) ||
        isNaN(a21) || isNaN(a22) || isNaN(a23) || isNaN(b2) ||
        isNaN(a31) || isNaN(a32) || isNaN(a33) || isNaN(b3)) {
        alert("Veuillez remplir tous les cases avant de résoudre.");
        return;
    }

    // 2. Calcul des Déterminants (Règle de Cramer)
    // Déterminant principal delta
    const delta = calcDet(a11, a12, a13, a21, a22, a23, a31, a32, a33);

    // Si delta = 0, pas de solution unique possible !
    if (delta === 0) {
        document.getElementById('resultat-box').classList.add('d-none');
        document.getElementById('erreur-box').classList.remove('d-none');
        return;
    }

    // Déterminants secondaires delta1, delta2, delta3 (on remplace la colonne correspondante par les B)
    const delta1 = calcDet(b1, a12, a13, b2, a22, a23, b3, a32, a33);
    const delta2 = calcDet(a11, b1, a13, a21, b2, a23, a31, b3, a33);
    const delta3 = calcDet(a11, a12, b1, a21, a22, b2, a31, a32, b3);

    // 3. Calcul des inconnues
    const x1 = delta1 / delta;
    const x2 = delta2 / delta;
    const x3 = delta3 / delta;

    // 4. Affichage des résultats dans la page HTML
    document.getElementById('det-principal').innerText = delta.toFixed(2);
    document.getElementById('res-x1').innerText = x1.toFixed(2);
    document.getElementById('res-x2').innerText = x2.toFixed(2);
    document.getElementById('res-x3').innerText = x3.toFixed(2);
}
