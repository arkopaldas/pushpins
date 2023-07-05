// Gets the input file.
document.getElementById("image").addEventListener('change',function(event){
	document.getElementById("display").src = URL.createObjectURL(event.target.files[0]);
});

// Sets the page sizes to be downloaded
const pageDown = (size) => {
	document.getElementById("pageDownload").innerHTML = document.getElementById("pageDownload").innerHTML.substring(0,document.getElementById("pageDownload").innerHTML.length-1) + size;
}
// Create the Art.
const createImage = () =>{
	const art = new PushPinArt("Arkopal Das");
	art.createArt();
}

// Downloads the Images.
const downloadImages = () =>{
	const art = new PushPinArt("Arkopal Das");
	art.createArt();
	art.downloadArt();
}
