import React, {useState} from "react"
const SearchBar=()=> {
    const [query, setQuery] = useState('');
  
    function handleInputChange(event) {
      setQuery(event.target.value);
    }
  
    return (
      <div style={{ backgroundColor: '#f2f2f2', padding: '10px', borderRadius: '5px', display: 'flex', alignItems: 'center' }}>
        <i className="fas fa-search" style={{ marginRight: '10px' }}></i>
        <input type="text" value={query} onChange={handleInputChange} style={{ width: '100%', border: 'none', outline: 'none', backgroundColor: 'transparent' }} />
      </div>
    );
  }
  export default SearchBar
  