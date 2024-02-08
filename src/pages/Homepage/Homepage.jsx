import { useContext, useEffect, useState } from "react";
import "./Homepage.css";
import axios from "axios";
import { TbReload } from "react-icons/tb";
import { FaCopy } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { UserContext } from "../../App";
import { ImNewTab } from "react-icons/im";

export default function Section() {
  const { API, token } = useContext(UserContext)
  const [notes, setNotes] = useState([]);
  const [inputValue, setInputValue] = useState({ original_url: "" });

  // get all urls
  const fetchUrls = async () => {
    try {
      const response = await axios.get(`${API}/api/user/urls`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      if (response) {
        setNotes(response.data.urls)
      }
    } catch (error) {
      console.log(error.response);
    }
  }

  // fetch generate short url
  const generateShortUrl = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put(`${API}/api/user/url`,
        { ...inputValue }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      if (response) {
        fetchUrls()
      }
    } catch (error) {
      console.log("Error fetching notes:", error);
    }
  };

  // remove short url
  const removeShortUrl = async (shortId) => {
    try {
      const response = await axios.delete(`${API}/api/user/urls/${shortId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      if (response.data) {
        fetchUrls()
      }
    } catch (error) {
      console.log(error);
    }
  }

  // handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  // copy text to clipboard 
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('url copied');
      })
      .catch((error) => {
        console.log('error in copying text', error);
      })
  }

  useEffect(() => {
    fetchUrls()
  }, [token])

  return (
    <section className="body-section">
      <form className="add-note-form" onSubmit={generateShortUrl}>
        <textarea
          type="text"
          name="original_url"
          value={inputValue.original_url}
          onChange={handleInputChange}
          placeholder="Enter Original URL here..."
          cols={40}
          className="note-input"
        />
        <div className="form-actions">
          <button type="submit" className="submit-button">
            Convert URL
          </button>
        </div>
      </form>
      <br />
      <div className="notes-list">
        {notes ?
         ( notes?.map((note) => {
            const { _id, short_url, url_id } = note
            return (
              <div key={_id} className="note-item">
                <div className="note-content-box">
                  <p className="note-content">{short_url}</p>
                </div>
                <div className="note-icon-box">
                  <FaCopy size={14} onClick={() => copyToClipboard(short_url)} title="Copy Url" />
                  <TbReload size={16} title="Change Url" />
                  <MdDelete size={17} onClick={() => removeShortUrl(url_id)} title="Delete Url" />
                  <a href={short_url} target="_blank"><ImNewTab size={16} title="Open in New Tab" /></a>
                </div>
              </div>
            )
          })) : 'loading'}
      </div>
    </section>
  );
};
