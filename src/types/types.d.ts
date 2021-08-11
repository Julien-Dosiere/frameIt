declare module 'node-vibrant/dist/vibrant.js';

// interface Color {
//   r:number;
//   g:number;
//   b:number;
// }

type Color = [number, number, number]

interface Settings{
  framing: number;
  matting: number;
  imageWidth: number;


}

interface Dimensions{
  imageHeight: number;
  totalWidth: number;
  totalHeight: number;

}

// interface CustomPalette {
//   vibrant: Color;
//   light: Color;
//   dark: Color;
//   custom: Color;
//   black: Color;
// }
