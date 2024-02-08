import { useState } from "react";
import "./Homepage.css";
import axios from "axios";
import { TbReload } from "react-icons/tb";
import { FaCopy } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

export default function Section() {
  const [notes, setNotes] = useState([
    { content: "https://url-shortner-2ruv.onrender.com/RCoqc6BD", color: "grey" },
    { content: "Hello world", color: "skyblue" },
    { content: "Hello world", color: "grey" },
    { content: "Hello world", color: "skyblue" },
    { content: "Hello world", color: "grey" },
    { content: "Hello world", color: "skyblue" },
  ]);
  const [inputValue, setInputValue] = useState({ content: "", color_code: "" });
  const colors = [
    { id: "1", color_code: "#FF0000" },
    { id: "2", color_code: "#00FF00" },
    { id: "3", color_code: "#0000FF" },
    { id: "4", color_code: "#FFFF00" },
    { id: "5", color_code: "#800080" },
    { id: "6", color_code: "#FFA500" },
    { id: "7", color_code: "#FFC0CB" },
    { id: "8", color_code: "#A52A2A" },
    { id: "9", color_code: "#808080" },
    { id: "10", color_code: "#008080" },
  ];

  // fetch notes
  const fetchNotes = async () => {
    try {
      const response = await axios.post(
        "/api/notes",
        { ...inputValue }
      );
      if (response) {
        setNotes((prev) => ({ ...prev, ...response.data }));
      }
    } catch (error) {
      console.log("Error fetching notes:", error);
    }
  };

  const handleError = () => { };

  // handle input change
  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputValue);
  };

  return (
    <section className="body-section">
      <form className="add-note-form" onSubmit={handleSubmit}>
        <textarea
          type="text"
          name="content"
          value={inputValue.content}
          onChange={handleInputChange}
          placeholder="Enter URL here..."
          cols={38}
          className="note-input"
          style={{
            backgroundColor: `${inputValue.color_code ? inputValue.color_code : "transparent"
              }`,
          }}
        />
        <div className="form-actions">
          <button type="submit" className="submit-button">
            Convert URL
          </button>
          <div className="color-options">
            <p className="color-label">Choose Color :</p>
            <ul className="color-palette">
              {colors.map((color) => {
                const { id, color_code } = color;
                return (
                  <li
                    key={id}
                    className="color-tag"
                    style={{ backgroundColor: `${color_code}` }}
                    onClick={() =>
                      setInputValue((prev) => ({
                        ...prev,
                        color_code: color_code,
                      }))
                    }
                  />
                );
              })}
            </ul>
          </div>
        </div>
      </form>
      <br />
      <div className="notes-list">
        {notes.map((note, i) => (
          <div key={i} className="note-item">
            <div className="note-content-box">
              <p className="note-content">{note.content}</p>
            </div>
            <div className="note-icon-box">
              <FaCopy size={14} />
              <TbReload size={16} />
              <MdDelete size={17}/>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
