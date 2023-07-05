// Width and Height along with Page index of A sizes.
const pageSizeList = [
	{index:0,height:4494,width:3176,vertical:148,horizontal:105},
    {index:1,height:3176,width:2247,vertical:105,horizontal:74},
	{index:2,height:2246,width:1588,vertical:74,horizontal:52},
	{index:3,height:1588,width:1123,vertical:52,horizontal:37},
	{index:4,height:1123,width:794,vertical:37,horizontal:26},
	{index:5,height:794,width:562,vertical:26,horizontal:18},
	// {index:6,height:562,width:397,vertical:18,horizontal:13},
	// {index:7,height:397,width:281,vertical:13,horizontal:9},
];

// Class to Create and Download the so formed Push Pin Art.
class PushPinArt{
    constructor(name){
        console.log("This PushPinArt Class is Createed by : "+name);
    }
    drawPin(radius,x,y,color){
        this.ctx.beginPath();
        this.ctx.arc(x,y,radius,0,2*Math.PI);
        this.ctx.fillStyle = 'rgba(' + color.R + ', ' + color.G + ', ' + color.B + ', ' + color.A + ')';
        this.ctx.fill();
        this.ctx.lineWidth = radius*0.1;
        this.ctx.strokeStyle = 'black';
        this.ctx.stroke();
    }
    createArt(){
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d",{willReadFrequently: true});
        
        var image = document.getElementById("display");
        this.pixelDensity = document.getElementById("density").value;
        this.randomness = document.getElementById("randomness").value;
        
        this.canvas.width = image.width;
        this.canvas.height = image.height;
        this.canvasPixelDimension = Math.min(Math.round(this.canvas.width/this.pixelDensity),Math.round(this.canvas.height/this.pixelDensity));
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.drawImage(image,0,0,this.canvas.width,this.canvas.height);
        
        var imageData = this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height);
        var pixelData = imageData.data;
        
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        
        for(var y=0;y<this.canvas.height;y+=this.canvasPixelDimension){
            for(var x=0;x<this.canvas.width;x+=this.canvasPixelDimension){
                var average = {R:0,G:0,B:0,A:0};
                for(var i=0;i<this.canvasPixelDimension;i++){
                    for(var j=0;j<this.canvasPixelDimension;j++){
                        var pixelIndex = ((y+i)*this.canvas.width+(x+j))*4;
                        average.R += pixelData[pixelIndex];
                        average.G += pixelData[pixelIndex+1];
                        average.B += pixelData[pixelIndex+2];
                        average.A += pixelData[pixelIndex+3];
                    }
                }
                average.R = Math.round(average.R/(this.canvasPixelDimension*this.canvasPixelDimension));
                average.G = Math.round(average.G/(this.canvasPixelDimension*this.canvasPixelDimension));
                average.B = Math.round(average.B/(this.canvasPixelDimension*this.canvasPixelDimension));
                average.A = Math.round(average.A/(this.canvasPixelDimension*this.canvasPixelDimension));

                const colorManipulator = new ColorManipulate(average);
                var effColor = colorManipulator.findReplacement(this.randomness);

                for(var i=0;i<this.canvasPixelDimension;i++){
                    for(var j=0;j<this.canvasPixelDimension;j++){
                        var pixelIndex = ((y+i)*this.canvas.width+(x+j))*4;
                        pixelData[pixelIndex] = effColor.R;
                        pixelData[pixelIndex+1] = effColor.G;
                        pixelData[pixelIndex+2] = effColor.B;
                        pixelData[pixelIndex+3] = effColor.A;
                    }
                }
                this.drawPin(this.canvasPixelDimension*0.35,x+this.canvasPixelDimension*0.4,y+this.canvasPixelDimension*0.4,effColor);
            }
        }
    }
    downloadArt(){
        this.size = pageSizeList[parseInt(document.getElementById("pageDownload").innerHTML.charAt(document.getElementById("pageDownload").innerHTML.length - 1))];
        const sWidth = this.size.horizontal*this.canvasPixelDimension;
        const sHeight = this.size.vertical*this.canvasPixelDimension;
        var list = [];
        var index = 0;
        for(var i=0;i<this.canvas.width;i+=sWidth){
            for(var j=0;j<this.canvas.height;j+=sHeight){
                const scaledCanvas = document.createElement("canvas");
                const context = scaledCanvas.getContext("2d");
                const scaleFactor = this.size.width/sWidth;
                
                scaledCanvas.width = this.size.width;
                scaledCanvas.height = this.size.height;
                context.fillStyle = "white";

                context.fillRect(0,0,scaledCanvas.width,scaledCanvas.height);
                context.drawImage(this.canvas,i,j,sWidth,sHeight,0,0,sWidth*scaleFactor,sHeight*scaleFactor);
                list.push({link:scaledCanvas.toDataURL(),name:"Area_"+index+".png"});
                index++;
            }
        }
        list.forEach(element=>{
            const link = document.createElement("a");
            link.href = element.link;
            link.download = element.name;
            link.click();
        });
    }
}