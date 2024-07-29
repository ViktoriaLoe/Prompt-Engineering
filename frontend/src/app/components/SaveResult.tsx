import { useAppContext } from '../context/AppContext'; // Adjust the import according to your file structure
import { useState } from 'react';

const SaveResult = () => {
  const { result } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch("/api/save_result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ result }),
      });

      const data = await response.json();
      if (data.error) {
        console.error(data.error);
        setMessage('Failed to save the result');
      } else {
        setMessage('Result saved successfully');
      }
    } catch (error) {
      console.error('Failed to save the result', error);
      setMessage('Failed to save the result');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        className={`btn btn-secondary ${loading ? 'btn-disabled' : ''}`}
        onClick={handleSave}
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save Result'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SaveResult;
