// figma.showUI(__html__, { width: 430, height: 526 });

// // This function is called whenever the selection changes in Figma
// figma.on("selectionchange", () => {
//     let selectionType = null;

//     // Check if there is a selection and if it's a frame or component
//     if (figma.currentPage.selection.length > 0) {
//         const selectedNode = figma.currentPage.selection[0];
//         if (selectedNode.type === "FRAME" || selectedNode.type === "COMPONENT") {
//             selectionType = selectedNode.type;
//         }
//     }

//     // Send a message to the UI with the type of the selection
//     figma.ui.postMessage({
//         type: "selectionChanged",
//         message: selectionType,
//     });
// });

// figma.ui.onmessage = (msg: { type: string }) => {
//     if (msg.type === "create-html") {
//         const nodes = figma.currentPage.selection;
//         let html = "";
//         let css = "";
//         let js = "";

//         nodes.forEach((node) => {
//             if (node.type === "FRAME" || node.type === "COMPONENT") {
//                 html += `<div id="${String(node.name)}">\n`;
//                 css += `#${String(node.name)} {\n`;

//                 node.children.forEach((child) => {
//                     if (child.type === "TEXT") {
//                         html += `  <p>${String(child.characters)}</p>\n`;
//                         css += `  p {\n    font-size: ${String(child.fontSize)}px;\n  }\n`;
//                     } else if (child.type === "RECTANGLE" || child.type === "ELLIPSE") {
//                         html += `  <div id="${String(child.name)}"></div>\n`;
//                         if (
//                             child.fills &&
//                             Array.isArray(child.fills) &&
//                             child.fills.length > 0 &&
//                             "color" in child.fills[0]
//                         ) {
//                             const fill = child.fills[0] as SolidPaint;
//                             css += `  #${String(child.name)} {\n    width: ${
//                                 child.width
//                             }px;\n    height: ${
//                                 child.height
//                             }px;\n    background-color: rgb(${Math.round(
//                                 fill.color.r * 255
//                             )}, ${Math.round(fill.color.g * 255)}, ${Math.round(
//                                 fill.color.b * 255
//                             )});\n  }\n`;
//                             if (child.type === "ELLIPSE") {
//                                 css += `    border-radius: 50%;\n`;
//                             }
//                         }
//                     } else if (child.type === "VECTOR") {
//                         // Create an SVG path element for the vector node
//                         html += `  <svg id="${String(
//                             child.name
//                         )}"><path d="${child.vectorPaths.reduce(
//                             (d, path) => d + " " + path.data,
//                             ""
//                         )}"/></svg>\n`;

//                         // Handle the fill color
//                         if (
//                             child.fills &&
//                             Array.isArray(child.fills) &&
//                             child.fills.length > 0 &&
//                             "color" in child.fills[0]
//                         ) {
//                             const fill = child.fills[0] as SolidPaint;
//                             css += `  #${String(
//                                 child.name
//                             )} path {\n    fill: rgb(${Math.round(
//                                 fill.color.r * 255
//                             )}, ${Math.round(fill.color.g * 255)}, ${Math.round(
//                                 fill.color.b * 255
//                             )});\n  }\n`;

//                             // Handle the stroke color and width
//                             if (
//                                 child.strokes &&
//                                 Array.isArray(child.strokes) &&
//                                 child.strokes.length > 0 &&
//                                 "color" in child.strokes[0]
//                             ) {
//                                 const stroke = child.strokes[0] as SolidPaint;
//                                 css += `  #${String(
//                                     child.name
//                                 )} path {\n    stroke: rgb(${Math.round(
//                                     stroke.color.r * 255
//                                 )}, ${Math.round(stroke.color.g * 255)}, ${Math.round(
//                                     stroke.color.b * 255
//                                 )});\n    stroke-width: ${String(
//                                     child.strokeWeight
//                                 )}px;\n  }\n`;
//                             }

//                             // Handle the opacity
//                             css += `  #${String(child.name)} path {\n    opacity: ${
//                                 child.opacity
//                             };\n  }\n`;

//                             // Height & Width
//                             css += `  #${String(child.name)} {\n    width: ${
//                                 child.width
//                             }px;\n    height: ${child.height}px;\n  }\n`;

//                             // Rotation

//                             if (child.rotation) {
//                                 css += `  #${String(child.name)} {\n    transform: rotate(${
//                                     child.rotation
//                                 }deg);\n  }\n`;
//                             }

//                             // Stroke Weight
//                             if (child.strokeWeight) {
//                                 css += `  #${String(child.name)} {\n    stroke-width: ${String(
//                                     child.strokeWeight
//                                 )}px;\n  }\n`;
//                             }
//                         }
//                     } else if (child.type === "BOOLEAN_OPERATION") {
//                         // Export the boolean operation node as SVG
//                         child.exportAsync({ format: "SVG" }).then((svg) => {
//                             html += `  <svg id="${String(child.name)}">${svg}</svg>\n`;

//                             // Handle the fill color
//                             if (
//                                 child.fills &&
//                                 Array.isArray(child.fills) &&
//                                 child.fills.length > 0 &&
//                                 "color" in child.fills[0]
//                             ) {
//                                 const fill = child.fills[0] as SolidPaint;
//                                 css += `  #${String(
//                                     child.name
//                                 )} path {\n    fill: rgb(${Math.round(
//                                     fill.color.r * 255
//                                 )}, ${Math.round(fill.color.g * 255)}, ${Math.round(
//                                     fill.color.b * 255
//                                 )});\n  }\n`;

//                                 // Handle the stroke color and width
//                                 if (
//                                     child.strokes &&
//                                     Array.isArray(child.strokes) &&
//                                     child.strokes.length > 0 &&
//                                     "color" in child.strokes[0]
//                                 ) {
//                                     const stroke = child.strokes[0] as SolidPaint;
//                                     css += `  #${String(
//                                         child.name
//                                     )} path {\n    stroke: rgb(${Math.round(
//                                         stroke.color.r * 255
//                                     )}, ${Math.round(stroke.color.g * 255)}, ${Math.round(
//                                         stroke.color.b * 255
//                                     )});\n    stroke-width: ${String(
//                                         child.strokeWeight
//                                     )}px;\n  }\n`;
//                                 }

//                                 // Handle the opacity
//                                 css += `  #${String(child.name)} path {\n    opacity: ${
//                                     child.opacity
//                                 };\n  }\n`;

//                                 // Handle stroke miter limit and line cap/join
//                                 css += `    stroke-miterlimit: ${child.strokeMiterLimit};\n`;
//                                 css += `    stroke-linecap: ${String(child.strokeCap)};\n`;
//                                 css += `    stroke-linejoin: ${String(child.strokeJoin)};\n`;

//                                 // Handle the blend mode
//                                 css += `  #${String(child.name)} {\n    mix-blend-mode: ${
//                                     child.blendMode
//                                 };\n  }\n`;

//                                 // Handle the effects
//                                 child.effects.forEach((effect) => {
//                                     if (
//                                         effect.type === "DROP_SHADOW" ||
//                                         effect.type === "INNER_SHADOW"
//                                     ) {
//                                         const shadowType =
//                                             effect.type === "DROP_SHADOW"
//                                                 ? "box-shadow"
//                                                 : "inset box-shadow";
//                                         const color = effect.color;
//                                         css += `  #${String(child.name)} {\n    ${shadowType}: ${
//                                             effect.offset.x
//                                         }px ${effect.offset.y}px ${
//                                             effect.radius
//                                         }px rgba(${Math.round(color.r * 255)}, ${Math.round(
//                                             color.g * 255
//                                         )}, ${Math.round(color.b * 255)}, ${color.a});\n  }\n`;
//                                     } else if (effect.type === "LAYER_BLUR") {
//                                         css += `  #${String(child.name)} {\n    filter: blur(${
//                                             effect.radius
//                                         }px);\n  }\n`;
//                                     } else if (effect.type === "BACKGROUND_BLUR") {
//                                         // Background blur can't be represented in CSS
//                                     }
//                                 });

//                                 // Handle the layout align and grow
//                                 css += `  #${String(child.name)} {\n    align-self: ${
//                                     child.layoutAlign
//                                 };\n    flex-grow: ${child.layoutGrow};\n  }\n`;
//                             }

//                             // Handle the width and height
//                             css += `  #${String(child.name)} {\n    width: ${
//                                 child.width
//                             }px;\n    height: ${child.height}px;\n  }\n`;

//                             // Handle the rotation
//                             if (child.rotation) {
//                                 css += `  #${String(child.name)} {\n    transform: rotate(${
//                                     child.rotation
//                                 }deg);\n  }\n`;
//                             }

//                             // Handle the corner radius
//                             if (child.cornerRadius) {
//                                 css += `  #${String(child.name)} {\n    border-radius: ${String(
//                                     child.cornerRadius
//                                 )}px;\n  }\n`;
//                             }
//                         });
//                     } else if (
//                         child.type === "STAR" ||
//                         child.type === "POLYGON" ||
//                         child.type === "LINE"
//                     ) {
//                         child.exportAsync({ format: "SVG" }).then((svg) => {
//                             html += `  <svg id="${String(child.name)}" width="${
//                                 child.width
//                             }" height="${child.height}">${svg}</svg>\n`;

//                             // Handle the fill color
//                             if (
//                                 child.fills &&
//                                 Array.isArray(child.fills) &&
//                                 child.fills.length > 0 &&
//                                 "color" in child.fills[0]
//                             ) {
//                                 const fill = child.fills[0] as SolidPaint;
//                                 css += `  #${String(
//                                     child.name
//                                 )} path {\n    fill: rgb(${Math.round(
//                                     fill.color.r * 255
//                                 )}, ${Math.round(fill.color.g * 255)}, ${Math.round(
//                                     fill.color.b * 255
//                                 )});\n  }\n`;

//                                 css += `  #${String(child.name)} {\n    width: ${
//                                     child.width
//                                 }px;\n    height: ${child.height}px;\n  }\n`;

//                                 if (child.rotation) {
//                                     css += `  #${String(child.name)} {\n    transform: rotate(${
//                                         child.rotation
//                                     }deg);\n  }\n`;
//                                 }

//                                 if (child.strokeWeight) {
//                                     css += `  #${String(
//                                         child.name
//                                     )} {\n    stroke-width: ${String(
//                                         child.strokeWeight
//                                     )}px;\n  }\n`;
//                                 }

//                                 // Handle the stroke color and width
//                                 if (
//                                     child.strokes &&
//                                     Array.isArray(child.strokes) &&
//                                     child.strokes.length > 0 &&
//                                     "color" in child.strokes[0]
//                                 ) {
//                                     const stroke = child.strokes[0] as SolidPaint;
//                                     css += `  #${String(
//                                         child.name
//                                     )} path {\n    stroke: rgb(${Math.round(
//                                         stroke.color.r * 255
//                                     )}, ${Math.round(stroke.color.g * 255)}, ${Math.round(
//                                         stroke.color.b * 255
//                                     )});\n    stroke-width: ${String(
//                                         child.strokeWeight
//                                     )}px;\n  }\n`;
//                                 }
//                             }
//                         });
//                     }

//                     // Handle other types of nodes here...
//                 });

//                 html += `</div>\n`;
//                 css += `}\n`;
//             }
//             // Handle other types of nodes here...
//         });

//         figma.ui.postMessage({ type: "html-css-js", html, css, js });
//     }
// };

const handleTextNode = (child: TextNode, html: string, css: string) => {
  html += ` 
          ${String(child.characters)}
          \n`;
  css += ` p {\n font-size: ${String(child.fontSize)}px;\n }\n`;
};

function handleRectangleNode(
  node: RectangleNode,
  html: string,
  css: string
): { html: string; css: string } {
  html += `<div id="${String(node.name)}"></div>\n`;
  css += `#${String(node.name)} {\n`;

  // Handle width and height
  css += `width: ${node.width}px;\n`;
  css += `height: ${node.height}px;\n`;

  // Handle corner radius
  if (node.cornerRadius) {
    css += `border-radius: ${String(node.cornerRadius)}px;\n`;
  }

  // Handle fills (background color)
  if (
    node.fills &&
    Array.isArray(node.fills) &&
    node.fills.length > 0 &&
    "color" in node.fills[0]
  ) {
    const fill = node.fills[0] as SolidPaint;
    css += `background-color: rgb(${Math.round(
      fill.color.r * 255
    )}, ${Math.round(fill.color.g * 255)}, ${Math.round(
      fill.color.b * 255
    )});\n`;
  }

  css += "}\n";

  return { html, css };
}

function handleEllipseNode(
  node: EllipseNode,
  html: string,
  css: string
): { html: string; css: string } {
  html += `<div id="${String(node.name)}"></div>\n`;
  css += `#${String(node.name)} {\n`;

  // Handle width and height
  css += `width: ${node.width}px;\n`;
  css += `height: ${node.height}px;\n`;

  // An ellipse should always be round
  css += `border-radius: 50%;\n`;

  // Handle fills (background color)
  if (
    node.fills &&
    Array.isArray(node.fills) &&
    node.fills.length > 0 &&
    "color" in node.fills[0]
  ) {
    const fill = node.fills[0] as SolidPaint;
    css += `background-color: rgb(${Math.round(
      fill.color.r * 255
    )}, ${Math.round(fill.color.g * 255)}, ${Math.round(
      fill.color.b * 255
    )});\n`;
  }

  css += "}\n";

  return { html, css };
}

function handleVectorNode(
  child: VectorNode,
  html: string,
  css: string
): { html: string; css: string } {
  html += `
    <svg id="${String(child.name)}">
      <path></path>
    </svg>
  `;

  const fillColor =
    child.fills &&
    Array.isArray(child.fills) &&
    child.fills.length > 0 &&
    "color" in child.fills[0]
      ? (child.fills[0] as SolidPaint).color
      : null;
  if (fillColor) {
    css += `
      #${String(child.name)} path {
        fill: rgb(${Math.round(fillColor.r * 255)}, ${Math.round(
      fillColor.g * 255
    )}, ${Math.round(fillColor.b * 255)});
      }
    `;
  }

  const strokeColor =
    child.strokes &&
    Array.isArray(child.strokes) &&
    child.strokes.length > 0 &&
    "color" in child.strokes[0]
      ? (child.strokes[0] as SolidPaint).color
      : null;
  if (strokeColor) {
    css += `
      #${String(child.name)} path {
        stroke: rgb(${Math.round(strokeColor.r * 255)}, ${Math.round(
      strokeColor.g * 255
    )}, ${Math.round(strokeColor.b * 255)});
        stroke-width: ${String(child.strokeWeight)}px;
      }
    `;
  }

  css += `
    #${String(child.name)} path {
      opacity: ${child.opacity};
    }
    #${String(child.name)} {
      width: ${child.width}px;
      height: ${child.height}px;
    }
  `;

  if (child.rotation) {
    css += `
      #${String(child.name)} {
        transform: rotate(${child.rotation}deg);
      }
    `;
  }

  return { html, css };
}

const handleBooleanOperationNode = async (child: BooleanOperationNode) => {
  let html = "";
  let css = "";

  const svg = await child.exportAsync({ format: "SVG" });
  html += ` ${svg}\n`;

  // Handle the fill color
  if (
    child.fills &&
    Array.isArray(child.fills) &&
    child.fills.length > 0 &&
    "color" in child.fills[0]
  ) {
    const fill = child.fills[0] as SolidPaint;
    css += ` #${String(child.name)} path {\n fill: rgb(${Math.round(
      fill.color.r * 255
    )}, ${Math.round(fill.color.g * 255)}, ${Math.round(
      fill.color.b * 255
    )});\n }\n`;
  }

  // Handle the stroke color and width
  if (
    child.strokes &&
    Array.isArray(child.strokes) &&
    child.strokes.length > 0 &&
    "color" in child.strokes[0]
  ) {
    const stroke = child.strokes[0] as SolidPaint;
    css += ` #${String(child.name)} path {\n stroke: rgb(${Math.round(
      stroke.color.r * 255
    )}, ${Math.round(stroke.color.g * 255)}, ${Math.round(
      stroke.color.b * 255
    )});\n stroke-width: ${String(child.strokeWeight)}px;\n }\n`;
  }

  // Handle the opacity
  css += ` #${String(child.name)} path {\n opacity: ${child.opacity};\n }\n`;

  // Handle the width and height
  css += ` #${String(child.name)} {\n width: ${child.width}px;\n height: ${
    child.height
  }px;\n }\n`;

  // Handle the rotation
  if (child.rotation) {
    css += ` #${String(child.name)} {\n transform: rotate(${
      child.rotation
    }deg);\n }\n`;
  }

  // Handle the corner radius
  if (child.cornerRadius) {
    css += ` #${String(child.name)} {\n border-radius: ${String(
      child.cornerRadius
    )}px;\n }\n`;
  }

  // Handle effects
  child.effects.forEach((effect) => {
    if (effect.type === "DROP_SHADOW" || effect.type === "INNER_SHADOW") {
      const shadowType =
        effect.type === "DROP_SHADOW" ? "box-shadow" : "inset box-shadow";
      const color = effect.color;
      css += ` #${String(child.name)} {\n ${shadowType}: ${effect.offset.x}px ${
        effect.offset.y
      }px ${effect.radius}px rgba(${Math.round(color.r * 255)}, ${Math.round(
        color.g * 255
      )}, ${Math.round(color.b * 255)}, ${color.a});\n }\n`;
    } else if (effect.type === "LAYER_BLUR") {
      css += ` #${String(child.name)} {\n filter: blur(${
        effect.radius
      }px);\n }\n`;
    } else if (effect.type === "BACKGROUND_BLUR") {
      // Background blur can't be represented in CSS
    }
  });

  // Handle blend mode
  css += ` #${String(child.name)} {\n mix-blend-mode: ${
    child.blendMode
  };\n }\n`;

  // Handle layout align and grow
  css += ` #${String(child.name)} {\n align-self: ${
    child.layoutAlign
  };\n flex-grow: ${child.layoutGrow};\n }\n`;

  return { html, css };
};

const handleShapeNode = (child: SceneNode) => {
  if (
    child.type === "STAR" ||
    child.type === "POLYGON" ||
    child.type === "LINE"
  ) {
    child.exportAsync({ format: "SVG" }).then((svg) => {
      let html = `${svg}\n`;
      let css = "";

      // Handle the fill color
      if (
        child.fills &&
        Array.isArray(child.fills) &&
        child.fills.length > 0 &&
        "color" in child.fills[0]
      ) {
        const fill = child.fills[0] as SolidPaint;
        css += `#${String(child.name)} path {\nfill: rgb(${Math.round(
          fill.color.r * 255
        )}, ${Math.round(fill.color.g * 255)}, ${Math.round(
          fill.color.b * 255
        )});\n}\n`;
      }

      // Handle the stroke color and width
      if (
        child.strokes &&
        Array.isArray(child.strokes) &&
        child.strokes.length > 0 &&
        "color" in child.strokes[0]
      ) {
        const stroke = child.strokes[0] as SolidPaint;
        css += `#${String(child.name)} path {\nstroke: rgb(${Math.round(
          stroke.color.r * 255
        )}, ${Math.round(stroke.color.g * 255)}, ${Math.round(
          stroke.color.b * 255
        )});\nstroke-width: ${String(child.strokeWeight)}px;\n}\n`;
      }

      // Width & Height
      css += `#${String(child.name)} {\nwidth: ${child.width}px;\nheight: ${
        child.height
      }px;\n}\n`;

      // Rotation
      if (child.rotation) {
        css += `#${String(child.name)} {\ntransform: rotate(${
          child.rotation
        }deg);\n}\n`;
      }

      // Stroke Weight
      if (child.strokeWeight) {
        css += `#${String(child.name)} {\nstroke-width: ${String(
          child.strokeWeight
        )}px;\n}\n`;
      }

      return { html, css };
    });
  }
};

figma.ui.onmessage = (msg: { type: string }) => {
  if (msg.type === "create-html") {
    const nodes = figma.currentPage.selection;
    let html = "";
    let css = "";
    let js = "";

    nodes.forEach((node) => {
      if (node.type === "FRAME" || node.type === "COMPONENT") {
        html += `\n\n`;
        css += `#${String(node.name)} {\n`;

        node.children.forEach((child) => {
          if (child.type === "TEXT") {
            handleTextNode(child, html, css);
          } else if (child.type === "RECTANGLE") {
            handleRectangleNode(child, html, css);
          } else if (child.type === "ELLIPSE") {
            handleEllipseNode(child, html, css);
          } else if (child.type === "VECTOR") {
            handleVectorNode(child, html, css);
          } else if (child.type === "BOOLEAN_OPERATION") {
            handleBooleanOperationNode(child);
          } else if (
            child.type === "STAR" ||
            child.type === "POLYGON" ||
            child.type === "LINE"
          ) {
            handleShapeNode(child);
          }

          // Handle other types of nodes here...
        });

        html += `\n\n`;
        css += `}\n`;
      }

      // Handle other types of nodes here...
    });

    figma.ui.postMessage({ type: "html-css-js", message: { html, css, js } });
  }
};
