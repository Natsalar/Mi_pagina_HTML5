// JavaScript Document
function comenzar(){
	zonadatos=document.getElementById("zonadatos");
	var boton=document.getElementById("boton");
	boton.addEventListener("click",crear,false);
	navigator.webkitPeristentStorage.requestQuota(5*1024*1024, acceso);
}
function acceso(){
	window.webkitRequestFileSystem(PERSISTENT,5*1024*1024,crear_sis, errores);
}
function crear_sis(sistema){
	espacio=sistema.root;
	ruta="";
	mostrar();
}
function crear(){
	var nombre_archivo=document.getElementById("entrada").value;
	if(nombre_archivo!=""){
		nombre_archivo=ruta+nombre_archivo;
		espacio.getFile(nombre_archivo, {create:true,exclusive:false},mostrar,errores);
	}
}
function mostrar(){
	document.getElementById("entrada").value="";
	zonadatos.innerHTML="";
	espacio.getDirectory(ruta,null,leer_dir,errores);
}
function leer_dir(dir){
	lector=dir.createReader();
	leer();
}
function leer(){
	lector.readEntreis(function(archivos){if(archivos.length){listar(archivos);}},errores);
}
function listar(archivos){
	for(var i=0;i<archivos.length;i++){
		if(archivos[i].isFile){
			zonadatos.innerHTML+=archivos[i].name+"<br>";
		}else if(archivos[i].isDirectory){
			zonadatos.innerHTML+="<span onClick='cambiar_dir(\"" + archivos[i].name + "\")' class='directorio'>" + archivos[i].name + "</span><br>";
		}
	}
	}
	function cambiar_dir(nuevaruta){
		ruta=ruta+nuevaruta + "/";
		mostrar();
	}
	function volver(){
		espacio.getDirectory(ruta, null, function(dir_actual){
			dir_actual.getParent(function(dir_padre){
				ruta=dir_padre.fullPath;
				mostrar();
			}, errores);
		}, errores);
	}
	function errores(e){
	alert("Ha habido un error: " + e.code);
}
	window.addEventListener("load", comenzar, false);
