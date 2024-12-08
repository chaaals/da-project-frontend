import { Canvg } from "canvg";

const makeSvgDataUri = async (svgString, { width, height }) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  const v = Canvg.fromString(ctx, svgString);
  await v.render();
  return canvas.toDataURL("image/png");
};

export default makeSvgDataUri;
