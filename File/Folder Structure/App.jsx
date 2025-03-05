import "./styles.css";
import json from "./data.json";
import { useState } from "react";

export default function App() {
  const [data, setData] = useState(json);

  const addNodeToList = (parentId) => {
    const name = prompt("Enter Name : ");
    const updateTree = (list) => {
      return list.map((node) => {
        if (node.id == parentId) {
          return {
            ...node,
            children: [
              ...node.children,
              {
                id: Date.now.toString(),
                name: name,
                isFolder: true,
                children: [],
              },
            ],
          };
        }

        if (node.children) {
          return { ...node, children: updateTree(node.children) };
        }
        return node;
      });
    };

    setData((prev) => updateTree(prev));
  };

  const removeNodeToList = (nodeId) => {
    const updateTree = (list) => {
      return list
        .filter((node) => node.id !== nodeId)
        .map((node) => {
          if (node.children) {
            return { ...node, children: updateTree(node.children) };
          }
          return node;
        });
    };

    setData((prev) => updateTree(prev));
  };

  const List = ({ data, addNodeToList }) => {
    const [isExpanded, setIsExpanded] = useState({});
    return (
      <div className="container">
        {data.map((node) => (
          <div key={node.id}>
            {/* Expand and Collapse Functionality */}
            <div
              onClick={() => {
                if (node.isFolder) {
                  setIsExpanded((prev) => ({
                    ...prev,
                    [node.name]: !prev[node.name],
                  }));
                }
              }}
            >
              {node.isFolder && (
                <>
                  <span>{isExpanded[node.name] == true ? "-" : "+"} </span>
                  {node.name}
                  <img
                    src={
                      "https://cdn-icons-png.flaticon.com/512/4732/4732459.png"
                    }
                    style={{ width: "20px", marginLeft: "10px" }}
                    onClick={() => addNodeToList(node.id)}
                  />
                </>
              )}
              {node.isFolder == false && node.name}
              <img
                src={"https://cdn-icons-png.flaticon.com/512/1214/1214428.png"}
                style={{ width: "15px", marginLeft: "5px" }}
                onClick={() => removeNodeToList(node.id)}
              />
            </div>
            {/* Calling it recursively */}
            {isExpanded[node.name] && node.isFolder && (
              <List data={node?.children} addNodeToList={addNodeToList} />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>File/Folder Structure</h1>
      <List data={data} addNodeToList={addNodeToList} />
    </div>
  );
}
