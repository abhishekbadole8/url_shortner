import { useContext, useEffect, useState } from "react";
import "./Homepage.css";
import axios from "axios";
import { TbReload } from "react-icons/tb";
import { FaCopy } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { UserContext } from "../../App";
import { ImNewTab } from "react-icons/im";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Section() {
  const { API, token, isLoading, setIsLoading } = useContext(UserContext)
  const [notes, setNotes] = useState([]);
  const [inputValue, setInputValue] = useState({ original_url: "" });
  const [error, setError] = useState({ generic: "No data found." })

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
      console.log(error);
    }
  }

  // fetch generate short url
  const generateShortUrl = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setInputValue({ original_url: "" })
    try {
      const response = await axios.put(`${API}/api/user/url`,
        { ...inputValue }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      if (response) {
        setIsLoading(false)
        fetchUrls()
      }
    } catch (error) {
      console.log("Error fetching notes:", error);
    }
  };

  // remove short url
  const removeShortUrl = async (urlId) => {
    toast('Removing Url, Please wait')
    try {
      const response = await axios.delete(`${API}/api/user/urls/${urlId}`, {
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

  // refresh url
  const refreshUrl = (urlId) => {
    toast('work in progress')
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
        toast('url copied')
      })
      .catch((error) => {
        console.log('error in copying text', error);
      })
  }

  useEffect(() => {
    fetchUrls()
  }, [token])

  return (
    <>
      <section className="body-section">
        <form className="add-note-form" onSubmit={generateShortUrl}>
          <textarea
            type="text"
            name="original_url"
            value={inputValue.original_url}
            onChange={handleInputChange}
            placeholder={`Enter Original URL here... Ex:-https://www.google.com`}
            cols={40}
            className="note-input"
          />
          <div className="form-actions">
            <button type="submit" className="submit-button" disabled={!inputValue.original_url.trim() || isLoading}>
              {isLoading ? 'Loading...' : 'Convert URL'}
            </button>
          </div>
        </form>
        <br />
        <div className="notes-list">
          {notes.length ?
            (notes.map((note) => {
              const { _id, short_url, url_id } = note
              return (
                <div key={_id} className="note-item">
                  <div className="note-content-box">
                    <p className="note-content">{short_url}</p>
                  </div>
                  <div className="note-icon-box">
                    <FaCopy size={14} onClick={() => copyToClipboard(short_url)} title="Copy Url" />
                    <TbReload size={16} title="Change Url" onClick={() => refreshUrl(url_id)} />
                    <MdDelete size={17} onClick={() => removeShortUrl(url_id)} title="Delete Url" />
                    <a href={short_url} target="_blank" rel="noopener noreferrer"><ImNewTab size={16} title="Open in New Tab" /></a>
                  </div>
                </div>
              )
            })) : <div className="note-item note-content" >
              <p>{error.generic}</p>
            </div>}
        </div>
      </section>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

    </>
  );
};
