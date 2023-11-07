import { styled } from "@mui/system";
import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import testJson from "./TestJsons/test.json";

// Example: Move the object at index 0 to index 1 within the "PC" category
// moveObject(CategoryFull[0].children, 0, 1);

const DragItem = (props) => {
  const type = "category";
  const ref = useRef(null);

  const [{ opacity, isDragging }, drag] = useDrag(
    () => ({
      type: type,
      item: { props },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    []
  );

  const [{ isDropped }, drop] = useDrop({
    accept: type,
    hover(item) {
      if (!ref.current) return;
      const dragItem = item.props;
      const dropItem = props;
      // console.log(dragItem.key);
      // console.log(dragItem);
      // item.props.moveFunc(dragItem);
    },
    drop(item) {
      if (!ref.current) return;
      if (item.props.path === props.path) return;
      const dragItem = item.props;
      dragItem.moveFunc(dragItem);
    },
  });
  drag(drop(ref));
  return (
    <div
      style={{
        marginRight: `${props.layer >= 1 ? 18 : 0}px`,
        fontSize: `${20 - props.layer * 2}pt`,
      }}
      ref={ref}
    >
      <p style={{ margin: 0 }}>{props.text}</p>

      {props.children}
    </div>
  );
};

export default DragItem;
