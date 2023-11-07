import React, { useCallback, useState } from "react";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragItem from "./DragItem";
import { Typography } from "@mui/material";
import testJson from "./TestJsons/test.json";

const style = { fontSize: "20pt", marginRight: "0px" };
function changeOrderCategory(category, droppedCategory) {}

const CategoryOrderDnD = () => {
  const [category, setCategory] = useState(testJson.CategoryFull);
  const moveObject = (object) => {
    const path = object.path;

    let cat = category[parseInt(path[0] - 1)];

    for (let i = 1; i <= path.length; i++) {
      if (path[i] == null) break;
      if (path[i] === ".") {
        if (path[i + 1] != null) cat = cat.children[parseInt(path[i + 1] - 1)];
      }
    }
    console.log(cat);
  };
  // const isChild = (object,target)=>{

  // }
  const renderDragItem = useCallback((cat, index) => {
    if (!cat) {
      return null;
    }
    console.log(cat);
    return (
      <DragItem
        key={cat.id}
        path={cat.path}
        text={cat.title}
        layer={cat.path.split(".").length - 1}
        moveFunc={moveObject}
        isDropable={true}
      >
        {cat.children.length > 0 &&
          cat.children.map((cat, i) => renderDragItem(cat, i))}
      </DragItem>
    );
  }, []);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Typography variant="h5"> ویرایش دسته بندی</Typography>
        <div>
          {category && category.map((cat, i) => renderDragItem(cat, i))}
        </div>

        {/* <DragItem key={4} text={"DRAG 1"} layer={0}>
           <DragItem key={5} text={"DRAG 1.1"} layer={1} />
         </DragItem>
         <DragItem key={1} text={"DRAG 2"} layer={0}>
           <DragItem key={6} text={"DRAG 2.1"} layer={1}>
             <DragItem key={7} text={"DRAG 2.1.1"} layer={2}>
               <DragItem key={8} text={"DRAG 2.1.1.1"} layer={3} />
             </DragItem>
           </DragItem>
           <DragItem key={9} text={"DRAG 2.2"} layer={1} />
         </DragItem>
         <DragItem key={2} text={"DRAG 3"} layer={0} />
         <DragItem key={3} text={"DRAG 4"} layer={0} /> */}
      </DndProvider>
    </>
  );
};

export default CategoryOrderDnD;
