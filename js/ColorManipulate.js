// Uncomment Transparent if neccessary.
const RGBList = [
    // {value:0,R:0,G:0,B:0,A:0},
    {value:0,R:0,G:0,B:0,A:255},
    {value:1,R:255,G:0,B:0,A:255},
    {value:2,R:0,G:255,B:0,A:255},
    {value:3,R:0,G:0,B:255,A:255},
    {value:4,R:255,G:165,B:0,A:255},
    {value:5,R:255,G:255,B:0,A:255},
    {value:6,R:125,G:0,B:125,A:255},
    {value:7,R:125,G:125,B:125,A:255},
    {value:8,R:255,G:190,B:205,A:255},
    {value:9,R:255,G:255,B:255,A:255},
];

// Class to manipulate the input colors and produce efficient color from palette.
class ColorManipulate{
    constructor(RGB){
        this.RGB = RGB;
    }
    calculateDistance(RGB1, RGB2){
        const rdif = RGB1.R - RGB2.R;
        const gdif = RGB1.G - RGB2.G;
        const bdif = RGB1.B - RGB2.B;
        const adif = RGB1.A - RGB2.A;
        return Math.sqrt(rdif*rdif + gdif*gdif + bdif*bdif + adif*adif);
    }
    findReplacement(randomness){
        randomness = (randomness == 2 || randomness == 5) ? randomness + 1 : randomness;
        let minDistance = Infinity;
        let effRGB = null;
        for(let i=0;i<RGBList.length;i++){
            const currentRGB = RGBList[i];
            const distance = this.calculateDistance(this.RGB,currentRGB);
            if(distance < minDistance){
                minDistance = distance;
                effRGB = currentRGB;
            }
        }
        console.log(effRGB === null ? RGBList[0] : (effRGB.value+(Math.round(Math.random())*randomness))%RGBList.length);
        return effRGB === null ? RGBList[0] : RGBList[(effRGB.value+(Math.round(Math.random())*randomness))%RGBList.length];
    }
}