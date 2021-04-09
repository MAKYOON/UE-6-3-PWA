//C'est du sucre mais dans l'absolu ça sert juste à générer un id random pour le contenant du message
//J'ai enlevé tous les id sur les éléments car ce n'est pas nécessaire
const generateRandomId = () => {
  return Math.random().toString(36).substr(2, 9);
};

//C'est une simple fonction qui rajoute un 0 devant les chiffres s'ils sont inférieur à 10 pour avoir une horaire de type 02:07 au lieu de 2:7
const padNumber = (number) => {
  return number < 10 ? '0' + number : number;
}

//Clear l'input, elle est appelée quand on envoie le message
const clearInput = () => {
  document.getElementById("mySentence").value = "";
}

//Fonction qui génère la box avec le message, et selon la variable isVirtualMsg (boolean) qui est passée en paramètre (true or false), ça gère l'affichage à droite/gauche
const generateMsgBox = (isVirtualMsg, msgValue) => {
  const virtualMsgs = ["BlaBlaBla, tu comprends ?", "BlaBlaBla, t'es ou?", "BlaBlaBla, tu fais quoi ?", "BlaBlaBla, tu sais ou pas ?", "BlaBlaBla, t'en dis quoi ?" , "BlaBlaBla, tu viens ou pas ?" , "BlaBlaBla, t'es au courant ?" , "BlaBlaBla, tu l'as vu ?"];
  const chat =  document.getElementById("myChat");
  const now = new Date();
  const container =  document.createElement("div");
  const header = document.createElement("div");
  const name = document.createElement("p");
  const time = document.createElement("p");
  const msg = document.createElement("p");
  container.setAttribute("id", generateRandomId());
  container.classList +=  isVirtualMsg ? "msg-container" : "msg-container bg-primary align-self-end";
  header.classList.add("msg-header");
  name.classList += isVirtualMsg ? "fw-bold" : "fw-bold text-light";
  name.innerHTML = isVirtualMsg ? "Kevin" : "Pedro";
  time.innerHTML = padNumber(now.getHours()) + ":" + padNumber(now.getMinutes());
  time.classList += isVirtualMsg ? "" : "text-light";
  msg.classList += isVirtualMsg ? "msg-text" : "msg-text text-light";
  msg.innerHTML = msgValue ? msgValue : isVirtualMsg ? virtualMsgs[Math.floor(Math.random() * virtualMsgs.length)] : document.getElementById("mySentence").value

  //arborescence : - container
  //                    - header (name, time)
  //                    - msg
  header.append(name, time);
  container.append(header, msg);

  chat.append(container);
  clearInput();
  //Retourne un objet avec le nom de l'envoyeur et son message
  return {
    name: name.innerHTML,
    msg: msg.innerHTML
  }
  
}

const sendMsg = () => {
  const currentMessage = document.getElementById("mySentence").value;

  if (currentMessage !== '') {
    //bulle droite (input de l'utilisateur)
    const userMsg = generateMsgBox(false);
    //bulle gauche (virtuelle)
    const virtualText = generateMsgBox(true);
    
    //tableau de messages, initialisé vide
    let messages = [];
    //on y stocke les deux messages actuels
    messages.push(userMsg, virtualText);
    //s'il n'y a rien dans le local storage, alors on envoie le tableau tel quel
    //sinon on récupère ce qu'il y a déjà dedans, et on concatène le tableau actuel et on renvoie le tout dans le local storage
    let currentLocalStorage;
    if (localStorage.getItem('messages')) currentLocalStorage = JSON.parse(localStorage.getItem('messages'));
    if (currentLocalStorage) messages = currentLocalStorage.concat(messages);
    localStorage.setItem('messages', JSON.stringify(messages));
  } else {
    alert('Veuillez rentrer un message');
  }
}

//Ré-affiche les messages stockés dans le local storage s'il y en a
const displayMsgStoredInLocalStorage = () => {
  const messages = JSON.parse(localStorage.getItem('messages'));
  if (messages) {
    messages.map((item, key) => {
      if (key % 2 == 0) generateMsgBox(false, item.msg);
      else generateMsgBox(true, item.msg);
    });
  }
}

const installServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('sw.js', {scope: './'}).then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }
}


