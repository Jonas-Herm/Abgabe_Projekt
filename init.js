// Your web app's Firebase configuration
  var config = {
    apiKey: "AIzaSyAKWBAxz9zVg7GyHM0dHb8FcBz4pvemYOA",
    authDomain: "test-7ac0f.firebaseapp.com",
    databaseURL: "https://test-7ac0f.firebaseio.com",
    projectId: "test-7ac0f",
    storageBucket: "test-7ac0f.appspot.com",
    messagingSenderId: "1002329368687",
    appId: "1:1002329368687:web:5449f38b34b2c916c6c59a"
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
