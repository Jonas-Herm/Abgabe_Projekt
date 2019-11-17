
docRef = "Test123";
  const inputTextField = document.querySelector("#countryname");
  const addButton = document.querySelector("#addButton");
  addButton.addEventListener("click", writeCountry);
  const reiseziele = document.querySelector("#reiseziele");
  reiseziele.addEventListener("click", makeList);

function writeCountry(){
	const countryToSave = inputTextField.value;
	console.log(countryToSave + " will be saved");
	docReftemp = firestore.doc(docRef + "/" + countryToSave);
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

function loadCountryInformation(name){
	docReftemp = firestore.doc(docRef + "/" + name);
	docReftemp.get().then(function(doc) {
  //1.Feld

  var sel = document.createElement("select");
var opt1 = document.createElement("option");
var opt2 = document.createElement("option");

opt1.value = doc.data().Feld1;
opt1.text = "Option: Value 1";
opt1.id = "feld1"

opt2.value = "2";
opt2.text = "Option: Value 2";

sel.add(opt1, null);
sel.add(opt2, null);


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

	var para19 = document.createElement("INPUT");
	para19.id = "feld5";
	para19.value = doc.data().Feld5;
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
		updateCountry(this.id, sel.value, feld2.value, feld3.value, feld4.value, feld5.value, feld6.value);
		reiseziele.click();
		};
	document.getElementById("update").appendChild(para24);
    }).catch(function(error) {
    console.error("Error loading document: ", error);
});
}
