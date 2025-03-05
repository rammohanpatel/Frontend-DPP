import { useState} from "react";

export default function App() {
  const [list1, setList1] = useState([
    "HTML",
    "JavaScript",
    "CSS",
    "TypeScript",
  ]);
  const [list2, setList2] = useState(["React", "Angular", "Vue", "Svelte"]);
  const [selectedlist1, setSelectedList1] = useState([]);
  const [selectedlist2, setSelectedList2] = useState([]);

  const handleChange1 = (e) => {
    const { value } = e.target;
    const updatedList = selectedlist1.includes(value)
      ? selectedlist1.filter((item) => item !== value)
      : [...selectedlist1, value];

    setSelectedList1(updatedList);
  };

  const handleChange2 = (e) => {
    const { value } = e.target;
    const updatedList = selectedlist2.includes(value)
      ? selectedlist2.filter((item) => item !== value)
      : [...selectedlist2, value];

    setSelectedList2(updatedList);
  };

  const handleItemToLeft = () => {
    // Adding items to left list
    setList1((prev)=>([...prev,...selectedlist2]))
    // Removing selected items from list2
    setList2((prev) => prev.filter((item) => !selectedlist2.includes(item)))
    // Emptying selected items
    setSelectedList1((prev)=>([...prev,...selectedlist2]))
    setSelectedList2([]);
  };

  const handleItemToRight = () => {
    setList2((prev)=>([...prev,...selectedlist1]))
    setList1((prev) => prev.filter((item) => !selectedlist1.includes(item)))
    setSelectedList2((prev)=>([...prev,...selectedlist1]))
    setSelectedList1([]);
  };

    const handleAllItemToLeft = () => {
     setList1((prev)=>([...prev,...list2]))
     setSelectedList1((prev)=>([...prev,...selectedlist2]))
     setList2([]);
     setSelectedList2([]);
  };

  const handleAllItemToRight = () => {
     setList2((prev)=>([...prev,...list1]))
     setSelectedList2((prev)=>([...prev,...selectedlist1]))
     setList1([]);
     setSelectedList1([]);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <div>
        {list1.map((item, index) => (
          <div key={index}>
            <input
              type="checkbox"
              name={item}
              value={item}
              onChange={handleChange1}
              checked={selectedlist1.includes(item)}
            />
            <label>{item}</label>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <button disabled={list2.length==0} onClick={handleAllItemToLeft}> {"<<"} </button>
        <button disabled={selectedlist2.length == 0} onClick={handleItemToLeft}>
          {" "}
          {"<"}{" "}
        </button>
        <button
          disabled={selectedlist1.length == 0}
          onClick={handleItemToRight}
        >
          {" "}
          {">"}{" "}
        </button>
        <button disabled={list1.length==0} onClick={handleAllItemToRight}> {">>"} </button>
      </div>

      <div>
        {list2.map((item, index) => (
          <div key={index}>
            <input
              type="checkbox"
              name={item}
              value={item}
              onChange={handleChange2}
              checked={selectedlist2.includes(item)}
            />
            <label>{item}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
