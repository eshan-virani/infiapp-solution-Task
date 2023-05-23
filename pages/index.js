import { useState } from "react";
import { RxButton } from "react-icons/rx";
import { MdOutlineSubtitles, MdOutlineTitle } from "react-icons/md";
import { BsImage } from "react-icons/bs";
import Button from "../components/Button";
import Header from "../components/Header";
import ImageComponent from "../components/Image";
import Title from "../components/Title";

export default function Home() {
  const [elements, setElements] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedElementId, setSelectedElementId] = useState(null);

  const handleAddElement = (newelement) => {
    const newElement = {
      id: elements.length + 1,
      text: newelement,
      selected: false,
      events: [],
    };
    setElements([...elements, newElement]);
  };

  const handleSelectElement = (id) => {
    const updatedElements = elements.map((element) => {
      if (element.id === id) {
        return { ...element, selected: !element.selected };
      } else if (element.selected) {
        element.selected = !element.selected;
      }
      return element;
    });

    setElements(updatedElements);
    setSelectedElementId(id);
  };

  const handleAddEvent = () => {
    if (selectedElementId && selectedEvent) {
      const updatedElements = elements.map((element) => {
        if (element.id === selectedElementId && element.selected) {
          return { ...element, events: [...element.events, selectedEvent] };
        }
        return element;
      });

      setElements(updatedElements);
      setSelectedEvent("");
    }
  };

  const handleRemoveElement = (id) => {
    const updatedElements = elements.filter((element) => element.id !== id);
    setElements(updatedElements);
  };

  return (
    <div className="container mx-auto px-10">
      <div className="flex gap-10 mt-5">
        <div
          onClick={() => handleAddElement(<Button />)}
          className="h-10 w-14 shadow-lg flex justify-center items-center text-2xl bg-gray-50 rounded-lg"
        >
          <RxButton />
        </div>
        <div
          onClick={() => handleAddElement(<Title />)}
          className="h-10 w-14 shadow-lg flex justify-center items-center text-2xl bg-gray-50 rounded-lg"
        >
          <MdOutlineTitle />
        </div>
        <div
          onClick={() => handleAddElement(<Header />)}
          className="h-10 w-14 shadow-lg flex justify-center items-center text-2xl bg-gray-50 rounded-lg"
        >
          <MdOutlineSubtitles />
        </div>
        <div
          onClick={() => handleAddElement(<ImageComponent />)}
          className="h-10 w-14 shadow-lg flex justify-center items-center text-2xl bg-gray-50 rounded-lg"
        >
          <BsImage />
        </div>
      </div>

      {elements.map((element) => (
        <div key={element.id} className="relative mt-5">
          {element.selected && (
            <button
              className="absolute -top-4 -right-4 cursor-pointer text-white font-bold w-5 h-5 flex justify-center items-center bg-red-700 border-none"
              onClick={() => handleRemoveElement(element.id)}
            >
              X
            </button>
          )}
          <div
            className={`p-3 ${element.selected && "border-2 border-solid"}`}
            onClick={() => handleSelectElement(element.id)}
            onMouseEnter={() => handleAddEvent("mouse in")}
            onMouseLeave={() => handleAddEvent("mouse out")}
          >
            {element.text}
            <div>
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
              >
                <option value="">Select an event</option>
                <option value="click">Click</option>
                <option value="hover">Hover</option>
                <option value="mouse in">Mouse In</option>
                <option value="mouse out">Mouse Out</option>
              </select>
              <button onClick={() => handleAddEvent(element.id)}>
                Add Event
              </button>
              <ul>
                {element.events.map((event, index) => (
                  <li key={index}>{event}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
