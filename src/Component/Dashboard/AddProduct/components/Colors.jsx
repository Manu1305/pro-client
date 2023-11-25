const Colors = ({  color,setColor}) => {
  
    const handleColorChange = (value, index) => {
      // Create a copy of the colors array
      const newColors = [...color];
      // Update the color at the specified index
      newColors[index] = value;
      // Set the updated colors array using setColors
      setColor(newColors);
    };
    
      const colorInputs =color.length >0 && color.map((colorObj, index) => (
        <input
          key={index}
          type="color"
          id={`color-${index}`}
          className=""
          required
          value={colorObj}
          name={`color-${index}`}
          onChange={(e) => {
            handleColorChange(e.target.value, index);
          }}
        />
      ));
    
      return <div>{colorInputs}</div>;
    };
    
    export default Colors;