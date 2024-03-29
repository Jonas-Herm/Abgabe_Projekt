docRef = "Reiseziele";
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
     window.alert("Dieses Land gibt es schon!");
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
	 window.alert("Land erfolgreich hinzugefügt!");
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
    window.alert("Änderungen erfolgreich gespeichert!");
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
firestore.collection("Reiseziele")
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

function searchSpecificCountry() {
	const searchSpecificCountryName = document.querySelector("#searchSpecificCountry");
	firestore.collection("Reiseziele").where("Name", "==", searchSpecificCountryName.value)
		.get()
		.then(function (querySnapshot) {
			var data = querySnapshot.docs.map(function (documentSnapshot) {
				return documentSnapshot.data();
			});
			if (data.length == 1) {
				showSpecificCountry(data[0].Name);
			}
			else {
				console.log("No Country found");
        window.alert("Land wurde nicht gefunden!");
        document.location.hash = "#part_3";
			}
		})
		.catch(function (error) {
			console.log("Error getting documents: ", error);
		});
}

function filterCountry(data){

  //Eigenschaften der Länder anlegen, um sie zu vergleichen
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

  const mioStadtJa = document.querySelector("#mioStadtJa");
	const mioStadtNein = document.querySelector("#mioStadtNein");
	searchMioStadt = [];

	if (mioStadtJa.checked == true){searchMioStadt.push("Ja")};
	if (mioStadtNein.checked == true){searchMioStadt.push("Nein")};

  const kontinenteuropa = document.querySelector("#europa");
	const kontinentasien = document.querySelector("#asien");
	const kontinentnord = document.querySelector("#nordamerika");
  const kontinentsüd = document.querySelector("#südamerika");
	const kontinentafrika = document.querySelector("#afrika");
	const kontinentaustralien = document.querySelector("#australien");
	searchKontinent = [];

  if (kontinenteuropa.checked == true){searchKontinent.push("Europa")};
	if (kontinentasien.checked == true){searchKontinent.push("Asien")};
	if (kontinentnord.checked == true){searchKontinent.push("Nordamerika")};
  if (kontinentsüd.checked == true){searchKontinent.push("Südamerika")};
	if (kontinentafrika.checked == true){searchKontinent.push("Afrika")};
	if (kontinentaustralien.checked == true){searchKontinent.push("Australien & Ozeanien")};

  const unkritisch = document.querySelector("#unkritisch");
	const teilweise = document.querySelector("#teilweise");
	const kritisch = document.querySelector("#kritisch");
	searchGefahrenzustand = [];

  if (unkritisch.checked == true){searchGefahrenzustand.push("unkritisch")};
	if (teilweise.checked == true){searchGefahrenzustand.push("teilweise kritisch")};
	if (kritisch.checked == true){searchGefahrenzustand.push("kritisch")};

  //Suchvorgang

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
				if (found2[j].Feld1 == searchMeer[i]){
					found3.push(found2[j])
				};
			};
		};
	} else
	{
		found3 = found2;
	};

  //Kontinent Suche
	if (searchKontinent.length != 0){
		var found4 = [];
		for (var j = 0; j<found3.length; j++){
			for (var i = 0; i<searchKontinent.length; i++){
				if (found3[j].Feld4 == searchKontinent[i]){
					found4.push(found3[j])
				};
			};
		};
	} else
	{
		found4 = found3;
	};

  //Millionenstadt Suche
  if (searchMioStadt.length != 0){
		var found5 = [];
		for (var j = 0; j<found4.length; j++){
			for (var i = 0; i<searchMioStadt.length; i++){
				if (found4[j].Feld3 == searchMioStadt[i]){
					found5.push(found4[j])
				};
			};
		};
	} else
	{
		found5 = found4;
	};

  //Gefahrenzustand Suche
	if (searchGefahrenzustand.length != 0){
		var found6 = [];
		for (var j = 0; j<found5.length; j++){
			for (var i = 0; i<searchGefahrenzustand.length; i++){
				if (found5[j].Feld6 == searchGefahrenzustand[i]){
					found6.push(found5[j])
				};
			};
		};
	} else
	{
		found6 = found5;
	};



	document.getElementById("searchoutput").innerHTML = "";
	numberOfListItems = found6.length;



	for (var i = 0;i<numberOfListItems;i++){

		var para1 = document.createTextNode(found6[i].Name);
		document.getElementById("searchoutput").appendChild(para1);

		var para2 = document.createElement("BR");
		document.getElementById("searchoutput").appendChild(para2);
	};
  if (numberOfListItems == 0){
    var para3 = document.createTextNode("Es wurde kein entsprechendes Reiseziel gefunden:");
    document.getElementById("searchoutput").appendChild(para3);

    var para4 = document.createElement("BR");
		document.getElementById("searchoutput").appendChild(para4);

    var para5 = document.createTextNode("Ändern Sie die Filtermöglichkeiten oder legen Sie selbst ein Land an!");
    document.getElementById("searchoutput").appendChild(para5);

    }
	window.scrollTo(0,document.body.scrollHeight);
	}



function loadCountryInformation(name){
	docReftemp = firestore.doc(docRef + "/" + name);
	docReftemp.get().then(function(doc) {
  //1.Feld

	var para6 = document.createTextNode("Meerzugang: ");
	document.getElementById("update").appendChild(para6);

	var para7 = document.createElement("SELECT");
  var opt1 = document.createElement("option");
  opt1.text = "Ja";
  para7.options.add(opt1);
  var opt2 = document.createElement("option");
  opt2.text = "Nein";
  para7.options.add(opt2);
	para7.id = "feld1";
	para7.value = doc.data().Feld1;
	document.getElementById("update").appendChild(para7);

	var para8 = document.createElement("BR");
	document.getElementById("update").appendChild(para8);


  //2.Feld
	var para9 = document.createTextNode("Temperatur: ");
	document.getElementById("update").appendChild(para9);

  var para10 = document.createElement("SELECT");
  var opt1 = document.createElement("option");
  opt1.text = "warm";
  para10.options.add(opt1);
  var opt2 = document.createElement("option");
  opt2.text = "mäßig";
  para10.options.add(opt2);
  var opt3 = document.createElement("option");
  opt3.text = "kalt";
  para10.options.add(opt3);
	para10.id = "feld2";
	para10.value = doc.data().Feld2;
	document.getElementById("update").appendChild(para10);

	var para11 = document.createElement("BR");
	document.getElementById("update").appendChild(para11);

  //3.Feld
  var para12 = document.createTextNode("Millionenstadt: ");
	document.getElementById("update").appendChild(para12);

	var para13 = document.createElement("SELECT");
  var opt1 = document.createElement("option");
  opt1.text = "Ja";
  para13.options.add(opt1);
  var opt2 = document.createElement("option");
  opt2.text = "Nein";
  para13.options.add(opt2);
	para13.id = "feld3";
	para13.value = doc.data().Feld3;
	document.getElementById("update").appendChild(para13);

	var para14 = document.createElement("BR");
	document.getElementById("update").appendChild(para14);

  //4.Feld
  var para15 = document.createTextNode("Kontinent: ");
	document.getElementById("update").appendChild(para15);

  var para16 = document.createElement("SELECT");
  var opt1 = document.createElement("option");
  opt1.text = "Europa";
  para16.options.add(opt1);
  var opt2 = document.createElement("option");
  opt2.text = "Asien";
  para16.options.add(opt2);
  var opt3 = document.createElement("option");
  opt3.text = "Nordamerika";
  para16.options.add(opt3);
  var opt4 = document.createElement("option");
  opt4.text = "Südamerika";
  para16.options.add(opt4);
  var opt5 = document.createElement("option");
  opt5.text = "Afrika";
  para16.options.add(opt5);
  var opt6 = document.createElement("option");
  opt6.text = "Australien & Ozeanien";
  para16.options.add(opt6);
	para16.id = "feld4";
	para16.value = doc.data().Feld4;
	document.getElementById("update").appendChild(para16);

	var para17 = document.createElement("BR");
	document.getElementById("update").appendChild(para17);

  //5.Feld
  var para18 = document.createTextNode("Insel: ");
	document.getElementById("update").appendChild(para18);

	var para19 = document.createElement("SELECT");
	var opt1 = document.createElement("option");
	opt1.text = "Ja";
	para19.options.add(opt1);
	var opt2 = document.createElement("option");
	opt2.text = "Nein";
	para19.options.add(opt2);
	para19.value = doc.data().Feld5;
	para19.id = "feld5";
	document.getElementById("update").appendChild(para19);

	var para20 = document.createElement("BR");
	document.getElementById("update").appendChild(para20);

  //6.Feld
  var para21 = document.createTextNode("Gefahrenstufe: ");
	document.getElementById("update").appendChild(para21);

  var para22 = document.createElement("SELECT");
  var opt1 = document.createElement("option");
  opt1.text = "unkritisch";
  para22.options.add(opt1);
  var opt2 = document.createElement("option");
  opt2.text = "teilweise kritisch";
  para22.options.add(opt2);
  var opt3 = document.createElement("option");
  opt3.text = "kritisch";
  para22.options.add(opt3);
	para22.id = "feld6";
	para22.value = doc.data().Feld6;
	document.getElementById("update").appendChild(para22);

	var para23 = document.createElement("BR");
	document.getElementById("update").appendChild(para23);




	var para24 = document.createElement("BUTTON");
	para24.innerText= "Speichern";
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
