
docRef = "Test123";
  const inputTextField = document.querySelector("#countryname");
  const addButton = document.querySelector("#addButton");
  addButton.addEventListener("click", writeCountry);
  const reiseziele = document.querySelector("#reiseziele");
  reiseziele.addEventListener("click", makeList);
  const reisesuche = document.querySelector("#reisesuche");
  reisesuche.addEventListener("click", clearSearch);

function clearSearch(){
	document.getElementById("searchoutput").innerHTML = "";
}
function writeCountry(){
	const countryToSave = inputTextField.value;
	docReftemp = firestore.doc(docRef + "/" + countryToSave);
	docReftemp
	.get()
.then(doc => {
  if(doc.exists){
     console.log(countryToSave + " already exists");
  }
  else{
	  console.log(countryToSave + " will be saved");
	  docReftemp.set({
	 Name: countryToSave,
	 Feld1: "",
	 Feld2: "",
   Feld3: "",
   Feld4: "",
   Feld5: "",
   Feld6: ""
	 }).then(function() {
	 window.alert("Successfully added");
 }).catch(function (error) {
console.log(error);
 });
  }
})

}

function  deleteCountry(name){
	docReftemp = firestore.doc(docRef + "/" + name);
	docReftemp.delete().then(function() {
    console.log(name + " successfully deleted!");
	reiseziele.click();
}).catch(function(error) {
    console.error("Error removing document: ", error);
});
}


function updateCountry(name, feld1, feld2, feld3, feld4, feld5, feld6){
	docReftemp = firestore.doc(docRef + "/" + name);
	return docReftemp.update({
    Feld1: feld1,
	  Feld2: feld2,
    Feld3: feld3,
    Feld4: feld4,
    Feld5: feld5,
    Feld6: feld6
})
.then(function() {
    window.alert("Document successfully updated!");
})
.catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
});
}

function warnung(name) {
    var check = confirm('Wollen Sie ' + name + ' wirklich löschen?');
	if (check == true) {
		deleteCountry(name);
	}
  }

function showSpecificCountry(name){
	document.getElementById("update").innerHTML = "";


	var para = document.createElement("H1");
	para.innerText = name;
	document.getElementById("update").appendChild(para);

	loadCountryInformation(name);

	document.location.hash = "#part_5";
}

function searchCountry(){
firestore.collection("Test123")
 .get()
    .then(function(querySnapshot) {
        var data = querySnapshot.docs.map(function (documentSnapshot) {
		return documentSnapshot.data();
		});
		filterCountry(data);
		})
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

function filterCountry(data){

	const Inselja = document.querySelector("#Inselja");
	const Inselnein = document.querySelector("#Inselnein");
	searchInsel = [];

	if (Inselja.checked == true){searchInsel.push("Ja")};
	if (Inselnein.checked == true){searchInsel.push("Nein")};

	const tempwarm = document.querySelector("#warm");
	const tempmäßig = document.querySelector("#mäßig");
	const tempkalt = document.querySelector("#kalt");
	searchTemp = [];

	if (tempwarm.checked == true){searchTemp.push("warm")};
	if (tempmäßig.checked == true){searchTemp.push("mäßig")};
	if (tempkalt.checked == true){searchTemp.push("kalt")};

	const meerja = document.querySelector("#meerja");
	const meernein = document.querySelector("#meernein");
	searchMeer = [];

	if (meerja.checked == true){searchMeer.push("Ja")};
	if (meernein.checked == true){searchMeer.push("Nein")};

	//Temperatur Suche
	var found = [];
	if (searchTemp.length != 0){
	for (var j = 0; j<data.length; j++){
		for (var i = 0; i<searchTemp.length; i++){
			if (data[j].Feld2 == searchTemp[i]){found.push(data[j])};
	};
	};
	} else
	{
		found = data;
	}

	//Insel Suche
	if (searchInsel.length != 0){
		var found2 = [];
		for (var j = 0; j<found.length; j++){
			for (var i = 0; i<searchInsel.length; i++){
				if (found[j].Feld5 == searchInsel[i]){
					found2.push(found[j])
				};
			};
		};
	} else
	{
		found2 = found;
	};

	//Meerzugang Suche
	if (searchMeer.length != 0){
		var found3 = [];
		for (var j = 0; j<found2.length; j++){
			for (var i = 0; i<searchMeer.length; i++){
				if (found[j].Feld1 == searchMeer[i]){
					found3.push(found2[j])
					console.log(found2[j].Name);
				};
			};
		};
	} else
	{
		found3 = found2;
	};

	document.getElementById("searchoutput").innerHTML = "";
	numberOfListItems = found3.length;
	for (var i = 0;i<numberOfListItems;i++){

		var para6 = document.createTextNode(found3[i].Name);
		document.getElementById("searchoutput").appendChild(para6);

		var para8 = document.createElement("BR");
		document.getElementById("searchoutput").appendChild(para8);
	};
	window.scrollTo(0,document.body.scrollHeight);

	}



function loadCountryInformation(name){
	docReftemp = firestore.doc(docRef + "/" + name);
	docReftemp.get().then(function(doc) {
  //1.Feld

	var para6 = document.createTextNode("Meerzugang: ");
	document.getElementById("update").appendChild(para6);

	var para7 = document.createElement("SELECT");
  var c = document.createElement("option");
  c.text = "Ja";
  para7.options.add(c);
  var d = document.createElement("option");
  d.text = "Nein";
  para7.options.add(d);
	para7.id = "feld1";
	para7.value = doc.data().Feld1;
	document.getElementById("update").appendChild(para7);

	var para8 = document.createElement("BR");
	document.getElementById("update").appendChild(para8);


  //2.Feld
	var para9 = document.createTextNode("Temperatur: ");
	document.getElementById("update").appendChild(para9);

	var para10 = document.createElement("INPUT");
	para10.id = "feld2";
	para10.value = doc.data().Feld2;
	document.getElementById("update").appendChild(para10);

	var para11 = document.createElement("BR");
	document.getElementById("update").appendChild(para11);

  //3.Feld
  var para12 = document.createTextNode("Art des Urlaubs: ");
	document.getElementById("update").appendChild(para12);

	var para13 = document.createElement("INPUT");
	para13.id = "feld3";
	para13.value = doc.data().Feld3;
	document.getElementById("update").appendChild(para13);

	var para14 = document.createElement("BR");
	document.getElementById("update").appendChild(para14);

  //4.Feld
  var para15 = document.createTextNode("Kontinent: ");
	document.getElementById("update").appendChild(para15);

	var para15 = document.createElement("INPUT");
	para15.id = "feld4";
	para15.value = doc.data().Feld4;
	document.getElementById("update").appendChild(para15);

	var para17 = document.createElement("BR");
	document.getElementById("update").appendChild(para17);

  //5.Feld
  var para18 = document.createTextNode("Insel: ");
	document.getElementById("update").appendChild(para18);

	var para19 = document.createElement("SELECT");
	var c = document.createElement("option");
	c.text = "Ja";
	para19.options.add(c);
	var d = document.createElement("option");
	d.text = "Nein";
	para19.options.add(d);
	para19.value = doc.data().Feld5;
	para19.id = "feld5";
	document.getElementById("update").appendChild(para19);

	var para20 = document.createElement("BR");
	document.getElementById("update").appendChild(para20);

  //6.Feld
  var para21 = document.createTextNode("Gefahrenstufe: ");
	document.getElementById("update").appendChild(para21);

	var para22 = document.createElement("INPUT");
	para22.id = "feld6";
	para22.value = doc.data().Feld6;
	document.getElementById("update").appendChild(para22);

	var para23 = document.createElement("BR");
	document.getElementById("update").appendChild(para23);




	var para24 = document.createElement("BUTTON");
	para24.innerText= "Update";
	para24.id = name;
	para24.onclick = function(){
		const feld1 = document.querySelector("#feld1");
		const feld2 = document.querySelector("#feld2");
    const feld3 = document.querySelector("#feld3");
		const feld4 = document.querySelector("#feld4");
    const feld5 = document.querySelector("#feld5");
		const feld6 = document.querySelector("#feld6");
		updateCountry(this.id, feld1.value, feld2.value, feld3.value, feld4.value, feld5.value, feld6.value);
		reiseziele.click();
		};
	document.getElementById("update").appendChild(para24);
    }).catch(function(error) {
    console.error("Error loading document: ", error);
});
}
