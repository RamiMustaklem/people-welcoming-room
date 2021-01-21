import { useEffect, useRef, useState } from 'react';
import './App.css';

const originalNames = [
  'Name 1', 'Name 2', 'Name 3', 'Name 4'
];

function App() {
  const [displayName, setDisplayName] = useState('');
  const [enteredNamesArray, setEnteredNamesArray] = useState([]);

  const intervalRef = useRef(null);

  const removePersonNameFromRoom = (index) => {
    // filter out the item we do not need and return new array
    setEnteredNamesArray(arr => arr.filter((_, i) => i !== index));
  };

  const addPersonNameToRoom = (value) => {
    // add person name to end of array and return new array
    setEnteredNamesArray(arr => [...arr, value]);
  };

  const personButtonClickHandler = (name) => {
    // check if person name already exists to either add or remove
    const idx = enteredNamesArray.indexOf(name);
    if (idx > -1) {
      removePersonNameFromRoom(idx);
    } else {
      addPersonNameToRoom(name);
    }
  };

  /**
   * log the names of the people in the room
   */
  useEffect(() => {
    console.log('enteredNamesArray changed', enteredNamesArray)
  }, [enteredNamesArray]);

  /**
   * log the name to be displayed on the screen
   */
  useEffect(() => {
    console.log('displayName changed', displayName)
  }, [displayName]);

  // run this hook function when the array of names change
  useEffect(() => {
    if (enteredNamesArray.length) {

      // if there isn't an interval already, start the a new interval
      if (!intervalRef.current) {

        // display the first name in the array
        setDisplayName(enteredNamesArray[0]);

        // start the 3 second interval to display names
        // which will trigger this effect hook to run every 3 seconds
        intervalRef.current = setInterval(() => {
          
          // filter out the first element of the array which was already displayed
          setEnteredNamesArray(arr => {
            const newArr = arr.filter((_, i) => i !== 0);

            if (!newArr.length) {
              setDisplayName('');
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }

            setDisplayName(newArr[0]);
            return newArr;
          });
        }, 3000);
      }
    }
  }, [enteredNamesArray]);

  return (
    <div className="App">
      <div className="screen">
        <h1>
          Hello {displayName}
        </h1>
      </div>

      <div className="buttons-container">
        {originalNames.map((val, idx) => (
          <button
            key={idx}
            className="btn"
            onClick={() => personButtonClickHandler(val)}
          >
            {val}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
