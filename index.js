var compteur =1;
var bublecompteur =1;
var maphrase = "";
var bublearray = [];
var items = ["BlaBlaBla, tu comprends ?", "BlaBlaBla, t'es ou?", "BlaBlaBla, tu fais quoi ?", "BlaBlaBla, tu sais ou pas ?", "BlaBlaBla, t'en dis quoi ?" , "BlaBlaBla, tu viens ou pas ?" , "BlaBlaBla, t'es au courant ?" , "BlaBlaBla, tu l'as vu ?"];
var elmnt = document.getElementById("separator")

document.getElementById("mysentence").addEventListener("keydown", ({key}) => {
    if (key === "Enter") affiche();
});


function virtualtalk(){
  var aujourdhui = new Date();
  var mybulle = document.createElement("div");
  var monserver = document.createElement("div");
  var mynom = document.createElement("p");
  var myheure = document.createElement("p");
  var mymessage = document.createElement("p");
  mybulle.setAttribute("id", "mybuble"+compteur);
  mybulle.classList.add("msg-container");
  monserver.setAttribute("id", "myserver"+compteur);
  monserver.classList.add("msg-header");
  mynom.setAttribute("id", "myname"+compteur);
  mynom.classList.add("fw-bold");
  mynom.innerHTML="Kevin";
  myheure.setAttribute("id", "mytiming"+compteur);
  myheure.innerHTML=aujourdhui.getHours()+":"+aujourdhui.getMinutes();
  mymessage.setAttribute("id", "mytext"+compteur);
  mymessage.classList.add('msg-text');
  var virtualtext = items[Math.floor(Math.random() * items.length)];

  mymessage.innerHTML="" + virtualtext;
  document.getElementById("mysentence").value ="";

  document.getElementById("mychat").appendChild(mybulle);
  var txt = "mybuble"+compteur;
  var info = document.getElementById(txt);
  var infochat = document.getElementById("mychat");
  var rectchat = infochat.getBoundingClientRect();
  var rect = info.getBoundingClientRect();
  x = rect.left;
  y = rect.top;
  w = rect.width;
  h = rect.height;
  xchat = rectchat.left;
  ychat = rectchat.top;
  wchat = rectchat.width;
  hchat = rectchat.height;
  //alert ("Left: " + x + ", Top: " + y + ", Width: " + w + ", Height: " + h + "\n" + "Left: " + xchat + ", Top: " + ychat + ", Width: " + wchat + ", Height: " + hchat);
  if ((y+h) > (ychat+hchat)-(y+h)){
    //alert ("Ca deborde");

    var list = document.getElementById("mychat");
    list.removeChild(mychat.childNodes[0]);
    bublecompteur = bublecompteur - 1 ;
    bublearray.splice(0,1);
  }
  document.getElementById("mybuble"+compteur).appendChild(monserver);
  document.getElementById("myserver"+compteur).appendChild(mynom);
  document.getElementById("myserver"+compteur).appendChild(myheure);
  document.getElementById("mybuble"+compteur).appendChild(mymessage);
  bublearray[(bublecompteur-1)]= document.getElementById("mybuble"+compteur);
  compteur = compteur +1;
  bublecompteur = bublecompteur + 1 ;

}


function affiche(){
  var aujourdhui = new Date();
  var mybulle = document.createElement("div");
  var monserver = document.createElement("div");
  var mynom = document.createElement("p");
  var myheure = document.createElement("p");
  var mymessage = document.createElement("p");
  mybulle.setAttribute("id", "mybuble"+compteur);
  mybulle.classList.add("msg-container", "bg-primary", "align-self-end");
  monserver.setAttribute("id", "myserver"+compteur);
  monserver.classList.add("msg-header");
  mynom.setAttribute("id", "myname"+compteur);
  mynom.classList.add("text-light","fw-bold");
  mynom.innerHTML="Pedro";

  myheure.setAttribute("id", "mytiming"+compteur);
  myheure.innerHTML=aujourdhui.getHours()+":"+aujourdhui.getMinutes();
  myheure.classList.add("text-light");
  mymessage.setAttribute("id", "mytext"+compteur);
  mymessage.classList.add('msg-text', 'text-light');
  mymessage.innerHTML=document.getElementById("mysentence").value;
  document.getElementById("mysentence").value ="";

  document.getElementById("mychat").appendChild(mybulle);
  var txt = "mybuble"+compteur;
  var info = document.getElementById(txt);
  var infochat = document.getElementById("mychat");
  var rectchat = infochat.getBoundingClientRect();
  var rect = info.getBoundingClientRect();
  x = rect.left;
  y = rect.top;
  w = rect.width;
  h = rect.height;
  xchat = rectchat.left;
  ychat = rectchat.top;
  wchat = rectchat.width;
  hchat = rectchat.height;
  //alert ("Left: " + x + ", Top: " + y + ", Width: " + w + ", Height: " + h + "\n" + "Left: " + xchat + ", Top: " + ychat + ", Width: " + wchat + ", Height: " + hchat);
  if ((y+h) > (ychat+hchat)-(y+h)){
    //alert ("Ca deborde");
    document.getElementById("mysentence").scrollIntoView(false);
    var list = document.getElementById("mychat");
    list.removeChild(mychat.childNodes[0]);
    bublecompteur = bublecompteur - 1 ;
    bublearray.splice(0,1);

  }
  document.getElementById("mybuble"+compteur).appendChild(monserver);
  document.getElementById("myserver"+compteur).appendChild(mynom);
  document.getElementById("myserver"+compteur).appendChild(myheure);
  document.getElementById("mybuble"+compteur).appendChild(mymessage);
  bublearray[(bublecompteur-1)]= document.getElementById("mybuble"+compteur);
  compteur = compteur +1;
  bublecompteur = bublecompteur + 1 ;
  virtualtalk();
}
