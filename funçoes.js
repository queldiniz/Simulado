function getCorrect(){

	return document.getElementById("correta").value
}


function getChecked(){

	input = document.querySelectorAll('input')

	console.log(input)

	for(c = 0; c < input.length; c++){

		if(input[c].checked == true){

			return input[c].value

			break
		}
	}

}

var entrada;
var correta;


function correçao(){

	entrada = getChecked()
	correta = getCorrect()

	// console.log("Entrada:", getChecked())
	// console.log("Correta:", getCorrect())

	if(entrada == correta){

		document.getElementById("display").innerHTML = `Parabéns, você acertou! A alternativa Correta é a letra ${correta} ` 
		document.getElementById("display").style.display = "block" 
		document.getElementById("display").style.color="green"
	}

	else{
		document.getElementById("display").innerHTML = `Você Errou! A alternativa Correta é a letra ${correta} `
		document.getElementById("display").style.display = "block"
		document.getElementById("display").style.color="red"
	}

}

function sobreescrever(objeto, id, index){

	console.log("sobrescrevendo")

	objetoSplit = objeto.split(" ")

	objetoSplit[index] = `${id}:${entrada}`

	//console.log(memoriaSplit.join(" "))

	return objetoSplit.join(" ")
	
}

function escrever(objeto, id){

	console.log("escrevendo")

	objetoSplit = objeto.split(" ")

	objetoSplit.push(`${id}:${entrada}`)

	//console.log(objetoSplit.join(" "))


	return objetoSplit.join(" ")


}


function gravar(oQueGravar){

	sessionStorage.setItem("respostas", oQueGravar)

}


function salvarFormulario(id){

	entrada = getChecked()


	if(sessionStorage.getItem("respostas")){

		let substituiu = false

		memoria = sessionStorage.getItem("respostas")

		memoriaSplit = memoria.split(" ")

		for(c = 0; c < memoriaSplit.length; c++){

			if(memoriaSplit[c].split(":")[0] == id){

				substituiu = true

				index = c;

				gravar(sobreescrever(memoria, id, index))

				break
			}

		}

		if(!substituiu){	
			gravar(escrever(memoria, id))
		}




	}

	else{
		sessionStorage.setItem("respostas", `${id}:${entrada}`)
	}
}



function autofill(id){

	memoria = sessionStorage.getItem("respostas")

	memoriaSplit = memoria.split(" ")

	for(c = 0; c < memoriaSplit.length; c++){

		if(memoriaSplit[c].split(":")[0] == id){

				toFill = memoriaSplit[c].split(":")[1]

				console.log(toFill)

				document.querySelector(`input[value="${toFill}"`).checked = true
				
				break

		}


	}

}


function resultado(){

	gabarito = ["q1:C", "q2:A", "q3:C", "q4:B", "q5:E", "q6:B", "q7:D", "q8:E", "q9:A", "q10:E",  "q11:B", "q12:A", "q13:C", "q14:E", ,"q15:A", "q16:B", "q17:D", "q18:D", "q19:A", "q20:B","q21:B", "q22:B", "q23:D", "q24:D", "q25:C", "q26:E", "q27:C", "q28:C", "q29:D", "q30:B", "q31:D", "q32:E", "q33:E", "q34:A", "q35:C" ]
	
	quebrar = sessionStorage.getItem("respostas").split(" ")

	corretas = 0;
	erradas = 0;

	for(c = 0; c < quebrar.length; c++){

		if(gabarito.indexOf(quebrar[c]) > -1){
			corretas++
		}else {(gabarito.indexOf(quebrar[c]) > -1)
			erradas++
		}

	}

	console.log(corretas)

	document.getElementById("acertos").innerHTML = `Total de Acertos: ${corretas}`
	document.getElementById("qtt").innerHTML = `Total de Questões Respondidas: ${quebrar.length}`
	document.getElementById("acertos").style.color="green"

	console.log(erradas)
	document.getElementById("erradas").innerHTML = `Total de Erros: ${erradas}`
	document.getElementById("erradas").style.color="red"

	

}
