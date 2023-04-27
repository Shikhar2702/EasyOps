import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newContact = { name, number };

    if (contacts.some((contact) => contact.name === name || contact.number === number)) {
      alert('Name or number already exists!');
      return;
    }

    setContacts([...contacts, newContact]);
    setName('');
    setNumber('');
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      const newContacts = [...contacts];
      newContacts.splice(index, 1);
      setContacts(newContacts);
    }
  };

  const handleSort = () => {
    window.alert('Sort by name')
    const sortedContacts = [...contacts];
    sortedContacts.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setContacts(sortedContacts);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Contacts</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Person's Name:  <br>
          </br>
          <input type="text" value={name} onChange={handleNameChange} required />
        </label><br>
        </br>
        <label>
          Contact Number:<br></br>
          <input type="text" value={number} onChange={handleNumberChange} required />
        </label>
        <br></br>
        <button type="submit">Save</button>
        <br>
        </br>
      </form>
      <br></br>
      <label>
        Search Person: <br>
        </br>
        <input type="text" value={search} onChange={handleSearch} />
      </label>
      <table>
        <thead>
          <tr>
            <th onClick={handleSort}>Name</th>
            <th>Number</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.map((contact, index) => (
            <tr key={index}>
              <td>{contact.name}</td>
              <td>{contact.number}</td>
              <td>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
