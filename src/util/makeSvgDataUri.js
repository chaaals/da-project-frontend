import { Canvg } from "canvg";

const makeSvgDataUri = async (svgString) => {
  const canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 500;

  const ctx = canvas.getContext("2d");
  const v = Canvg.fromString(ctx, svgString);
  await v.render();
  return canvas.toDataURL("image/png");
};

export default makeSvgDataUri;
