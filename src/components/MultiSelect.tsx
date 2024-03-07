/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import axios, { AxiosError } from "axios";
import useDebounce from "../hooks/useDebounce";
import Close from "../assets/icons/close.svg";

/**
 * Represents a character in the multi-select component.
 */
interface Character {
  id: number;
  name: string;
  image: string;
  episode: string[];
}

/**
 * MultiSelect component allows users to select multiple options from a list.
 * It provides a search functionality to filter the options based on the user's input.
 * Selected options are displayed as tags and can be removed individually.
 *
 * @returns A React functional component representing the MultiSelect component.
 */
const MultiSelect: React.FC = () => {
  const listRef = useRef<HTMLLIElement[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Character[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);

  const handleSearch = useDebounce(async (term) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/?name=${term}`,
      );
      if (term !== "") {
        setResults(response.data.results);
      } else {
        setResults([]);
        setHighlightedIndex(0);
      }
      setError(null);
    } catch (err) {
      const error = err as AxiosError;
      if (!error.response) {
        // network error
        setError("Something wrong with network");
      } else {
        // server error
        if (error.response.status === 404) {
          setError("No results found");
        } else {
          setError("Something wrong with server");
        }
      }
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, 500);

  /**
   * Handles the change event of the input element.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event object.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value);
  };

  /**
   * Handles the click event for an option in the multi-select component.
   * If the option is already selected, it will be deselected.
   * If the option is not selected, it will be added to the selected options.
   *
   * @param option - The option that was clicked.
   */
  const handleOptionClick = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  /**
   * Removes the specified option from the selected options list.
   *
   * @param {string} option - The option to be removed.
   */
  const handleRemoveOption = (option: string) => {
    setSelectedOptions(selectedOptions.filter((item) => item !== option));
  };

  /**
   * Highlights the search term within the given text by wrapping it in a <strong> tag.
   *
   * @param text - The text to be highlighted.
   * @param searchTerm - The search term to be highlighted within the text.
   * @returns The highlighted text with the search term wrapped in a <strong> tag.
   */
  const highlightSearchTerm = (text: string, searchTerm: string) => {
    const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
    return (
      <span className="text-rain-maker">
        {parts.map((part, index) =>
          part.toLowerCase() === searchTerm.toLowerCase() ? (
            <strong className="font-extrabold" key={index}>
              {part}
            </strong>
          ) : (
            part
          ),
        )}
      </span>
    );
  };

  /**
   * Handles the keydown event for the multi-select component.
   *
   * The following keys are supported:
   * - ArrowDown: Moves the highlight down to the next option.
   * - ArrowUp: Moves the highlight up to the previous option.
   * - Tab: Moves the highlight to the next or previous option based on the shift key.
   * - Enter: Selects the highlighted option.
   * - Backspace: Removes the last selected option if the search term is empty.
   *
   * @param event - The keyboard event.
   */
  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setHighlightedIndex((prevIndex) =>
          Math.min(prevIndex + 1, results.length - 1),
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        break;
      case "Tab":
        event.preventDefault();
        if (event.shiftKey) {
          // Shift + Tab was pressed
          if (highlightedIndex > 0) {
            setHighlightedIndex(highlightedIndex - 1);
          }
        } else {
          // Tab was pressed
          if (highlightedIndex < results.length - 1) {
            setHighlightedIndex(highlightedIndex + 1);
          }
        }
        break;
      case "Enter":
        event.preventDefault();
        if (results[highlightedIndex]) {
          handleOptionClick(results[highlightedIndex].name);
        }
        break;
      case "Backspace":
        if (searchTerm === "" && selectedOptions.length > 0) {
          handleRemoveOption(selectedOptions[selectedOptions.length - 1]);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (listRef.current[highlightedIndex]) {
      listRef.current[highlightedIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [highlightedIndex]);

  return (
    <div className="relative">
      <div className="flex min-h-14 w-full flex-wrap items-center rounded-[16px] border border-blouse-blue px-1 py-1">
        {selectedOptions.map((option, index) => (
          <div
            key={index}
            className="m-1 flex items-center rounded-[12px] bg-bell-flower-blue px-3 py-2 text-rain-maker"
          >
            <span>{option}</span>
            <button
              onClick={() => handleRemoveOption(option)}
              className="ml-1 rounded-md bg-blouse-blue p-1 text-xs"
            >
              <img src={Close} width={15} height={15} alt="Remove Character" />
            </button>
          </div>
        ))}
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={selectedOptions.length > 0 ? "" : "Search characters..."}
          className="flex-grow px-2 text-rain-maker focus:outline-none"
        />
        {loading && <div className="mr-3 animate-spin">&#9696;</div>}
      </div>
      {error && (
        <div className="absolute z-10 mt-3 w-full text-center text-red-500">
          {error}
        </div>
      )}
      {results.length > 0 && (
        <ul className="absolute z-10 mt-3 max-h-96 w-full divide-y divide-solid divide-blouse-blue overflow-y-auto rounded-xl border border-blouse-blue">
          {results.map((result, index) => (
            <li
              key={result.id}
              ref={(el) => {
                if (el && !listRef.current.includes(el)) {
                  listRef.current[index] = el;
                }
              }}
              onClick={() => handleOptionClick(result.name)}
              className={`cursor-pointer p-3 text-rain-maker ${index === highlightedIndex ? " bg-wash-me-500" : " bg-wash-me"}`}
            >
              <div className="flex flex-row gap-3 align-middle">
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(result.name)}
                  readOnly
                />
                <img
                  src={result.image}
                  alt={result.name}
                  className="w-12 rounded-md"
                />
                <div className="flex flex-col">
                  {highlightSearchTerm(result.name, searchTerm)}
                  <span className="text-rain-maker-500">{`${result.episode.length} ${
                    result.episode.length > 1 ? "Episodes" : "Episode"
                  }`}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiSelect;
