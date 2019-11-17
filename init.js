// Your web app's Firebase configuration
  var config = {
    apiKey: "AIzaSyABv-nEhVl6ckZiBiFeOrSf8e3eJavDeeQ",
    authDomain: "reisezeile.firebaseapp.com",
    databaseURL: "https://reisezeile.firebaseio.com",
    projectId: "reisezeile",
    storageBucket: "reisezeile.appspot.com",
    messagingSenderId: "677319391792",
    appId: "1:677319391792:web:0836849ffe48aaeba74bf5"
  };
  // Initialize Firebase
  firebase.initializeApp(config);
  var firestore = firebase.firestore();

function makeList() {
	 firestore.collection("Test123")
    .get()
    .then(function(querySnapshot) {
        var data = querySnapshot.docs.map(function (documentSnapshot) {
		return documentSnapshot.data();
		});
		window.scroll(0,0);
		writeList(data);
		})
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
	}
function writeList(data){

    numberOfListItems = data.length;
    document.getElementById("test").innerHTML = "";

       for (i = 0; i < numberOfListItems; ++i) {
		var para = document.createElement("H3");
		para.innerText = data[i].Name;
		document.getElementById("test").appendChild(para);

		var para2 = document.createElement("BUTTON");
		para2.innerText = "Bearbeiten";
		para2.id = data[i].Name;
		para2.onclick = function(){
			showSpecificCountry(this.id);
		};
		document.getElementById("test").appendChild(para2);

		var para3 = document.createElement("BUTTON");
		para3.id = data[i].Name;
		para3.onclick = function(){
			warnung(this.id);
		};
		para3.innerText = "Löschen";
		document.getElementById("test").appendChild(para3);

		para4 = document.createElement("BR");
		document.getElementById("test").appendChild(para4);

		para5 = document.createElement("HR");
		document.getElementById("test").appendChild(para5);



}
}
