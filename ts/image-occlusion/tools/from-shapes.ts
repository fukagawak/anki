// Copyright: Ankitects Pty Ltd and contributors
// License: GNU AGPL, version 3 or later; http://www.gnu.org/licenses/agpl.html

import { fabric } from "fabric";
import type { Shape } from "image-occlusion/shapes";

import { addBorder, disableRotation, enableUniformScaling } from "./lib";

export const addShape = (
    canvas: fabric.Canvas,
    shape: Shape,
): void => {
    const fabricShape = shape.toFabric(canvas);
    addBorder(fabricShape);
    disableRotation(fabricShape);
    if (fabricShape.type === "i-text") {
        enableUniformScaling(canvas, fabricShape);
    }
    canvas.add(fabricShape);
};

export const addShapeGroup = (
    canvas: fabric.Canvas,
    shapes: Shape[],
): void => {
    const group = new fabric.Group();
    shapes.map((shape) => {
        const fabricShape = shape.toFabric(canvas);
        addBorder(fabricShape);
        group.addWithUpdate(fabricShape);
        disableRotation(group);
    });
    canvas.add(group);
};