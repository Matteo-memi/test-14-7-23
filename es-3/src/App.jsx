import React, { useState } from 'react';

const Note = ({ day, note }) => {
  return (
    <div className="relative w-1/7 h-32">
      <div className="absolute top-0 left-0 w-full h-full bg-gray-200 flex flex-col justify-center items-center">
        <div className="absolute top-0 left-0 h-4 w-4 bg-black"></div>
        <div className="absolute top-0 left-0 flex items-center justify-center h-4 w-4">
          <span className="text-red-500 font-bold">{day}</span>
        </div>
        <div className="text-xs mt-1 px-2 overflow-hidden overflow-ellipsis">{note}</div>
      </div>
    </div>
  );
};

const App = () => {
  const [notes, setNotes] = useState([
    { day: 7, note: 'imparare Svelte' },
    { day: 10, note: 'creare Vite 2.0' },
    { day: 16, note: 'sistemare cicalino' },
    { day: 22, note: 'abolire le campane' },
    { day: 30, note: 'meeting con la gang di Michele' },
  ]);
  const [day, setDay] = useState('');
  const [note, setNote] = useState('');

  const handleInsertNote = () => {
    if (day && note) {
      const existingNoteIndex = notes.findIndex((n) => n.day === parseInt(day));
      if (existingNoteIndex !== -1) {
        const updatedNotes = [...notes];
        updatedNotes[existingNoteIndex].note = note;
        setNotes(updatedNotes);
      } else {
        setNotes([...notes, { day: parseInt(day), note }]);
      }
      setDay('');
      setNote('');
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center">
      <h2 className="text-2xl font-bold mt-8">Calendario</h2>
      <div className="flex mb-4">
        <input className="border p-2 mr-2"type="number"placeholder="Giorno (1-31)"value={day}onChange={(e) => setDay(e.target.value)}/>
        <input className="border p-2 flex-grow" type="text" placeholder="Inserisci la nota" value={note} onChange={(e) => setNote(e.target.value)} />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded" onClick={handleInsertNote} >
        Inserisci nota
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 w-full px-4">
        {Array.from(Array(31).keys()).map((d) => {
          const dayNumber = d + 1;
          const noteObj = notes.find((n) => n.day === dayNumber);
          const noteText = noteObj ? noteObj.note : '';

          return <Note key={dayNumber} day={dayNumber} note={noteText} />;
        })}
      </div>
    </div>
  );
};

export default App;






