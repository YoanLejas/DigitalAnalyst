/* ==================================================
   SCRIPT TRACKING – VERSION PÉDAGOGIQUE
   Ce script sert à envoyer des informations
   dans le dataLayer pour Google Tag Manager
================================================== */

/*
  window.addEventListener('DOMContentLoaded', ...)
  → On attend que tout le HTML soit chargé
  → Ça évite d’essayer d’accéder à des éléments
    qui ne sont pas encore dans la page
*/
window.addEventListener('DOMContentLoaded', function () {

  /*
    window.dataLayer
    → On crée la variable dataLayer si elle n’existe pas
    → Si GTM l’a déjà créée, on la réutilise
    → C’est un tableau qui va contenir des objets
  */
  window.dataLayer = window.dataLayer || [];

  /* ==================================================
     1. PAGE VIEW PERSONNALISÉE
  ================================================== */

  /*
    dataLayer.push(...)
    → On ajoute un nouvel objet dans le dataLayer
    → Cet objet représente un événement
  */
  dataLayer.push({

    /*
      event
      → Nom de l’événement
      → C’est CE NOM que GTM va écouter
    */
    event: 'page_view_custom',

    /*
      document.title
      → Récupère le <title> de la page HTML
    */
    page_name: document.title,

    /*
      window.location.pathname
      → Récupère l’URL sans le domaine
      → Ex : /cours/ga4-introduction.html
    */
    page_url: window.location.pathname
  });

  /* ==================================================
     2. TRACKING DE CLIC
  ================================================== */

  /*
    document.getElementById('btn-demo')
    → On récupère l’élément HTML qui a l’id "btn-demo"
    → Ici : le bouton de démonstration
  */
  var demoButton = document.getElementById('btn-demo');

  /*
    if (demoButton)
    → On vérifie que le bouton existe bien
    → Évite les erreurs si le bouton est absent
  */
  if (demoButton) {

    /*
      addEventListener('click', ...)
      → On écoute l’action "clic" sur le bouton
    */
    demoButton.addEventListener('click', function () {

      /*
        dataLayer.push(...)
        → On envoie une information dans le dataLayer
        → Ce push correspond à un clic utilisateur
      */
      dataLayer.push({

        /*
          event
          → Nom de l’événement de clic
          → Sera utilisé dans GTM
        */
        event: 'click_demo_button',

        /*
          element_type
          → Type d’élément cliqué
          → Information descriptive (pédagogique)
        */
        element_type: 'button',

        /*
          element_id
          → Identifiant HTML de l’élément
          → Permet de savoir précisément quoi a été cliqué
        */
        element_id: 'btn-demo',

        /*
          page_name
          → Nom de la page sur laquelle le clic a eu lieu
        */
        page_name: document.title
      });

      /*
        console.log(...)
        → Affiche un message dans la console du navigateur
        → Utile pour vérifier que le tracking fonctionne
      */
      console.log('Clic sur le bouton démo envoyé dans le dataLayer');
    });
  }

  /* ==================================================
     3. TRACKING DE SCROLL (50 %)
  ================================================== */

  /*
    scrollTracked
    → Variable pour éviter d’envoyer l’événement plusieurs fois
    → false = pas encore envoyé
  */
  var scrollTracked = false;

  /*
    window.addEventListener('scroll', ...)
    → On écoute le scroll de la page
  */
  window.addEventListener('scroll', function () {

    /*
      if (scrollTracked) return;
      → Si le scroll a déjà été tracké, on sort de la fonction
      → Empêche les doublons
    */
    if (scrollTracked) return;

    /*
      window.scrollY
      → Nombre de pixels scrollés depuis le haut
      window.innerHeight
      → Hauteur visible de l’écran
    */
    var scrollPosition = window.scrollY + window.innerHeight;

    /*
      document.documentElement.scrollHeight
      → Hauteur totale de la page
    */
    var pageHeight = document.documentElement.scrollHeight;

    /*
      Calcul du pourcentage de scroll
      → position actuelle / hauteur totale
    */
    var scrollPercent = Math.round((scrollPosition / pageHeight) * 100);

    /*
      Si l’utilisateur a scrollé au moins 50 %
    */
    if (scrollPercent >= 50) {

      /*
        On marque l’événement comme déjà envoyé
      */
      scrollTracked = true;

      /*
        Envoi de l’événement dans le dataLayer
      */
      dataLayer.push({

        /*
          Nom de l’événement de scroll
        */
        event: 'scroll_50_percent',

        /*
          Pourcentage atteint
        */
        scroll_percentage: 50,

        /*
          Nom de la page concernée
        */
        page_name: document.title
      });

      /*
        Log console pour debug
      */
      console.log('Scroll 50 % envoyé dans le dataLayer');
    }
  });

});
