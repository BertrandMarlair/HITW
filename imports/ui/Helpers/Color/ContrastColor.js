export function getContrastYIQ(color){
    let hexcolor = color.substring(1,7);
    let r = parseInt(hexcolor.substr(0,2),16);
    let g = parseInt(hexcolor.substr(2,2),16);
    let b = parseInt(hexcolor.substr(4,2),16);
    let yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? 'rgba(0, 0, 0, 0.87)' : 'white';
}