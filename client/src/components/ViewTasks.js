import React, { useState } from 'react';

function ViewTasks({ tasks, onClose }) {
  const [isChecked, setIsChecked] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    return `${day} ${month}`;
  };

  const updateTask = async () => {
    try {
      const statusN = isChecked ? 'concluido' : 'pendente';

      // Convertendo a data para o formato ISO sem considerar o fuso horário
      const formattedDate = new Date(tasks.date).toISOString().split('T')[0];

      await fetch(`http://localhost:3333/tasks/${tasks.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...tasks, date: formattedDate, status: statusN }),
      });

      onClose(); // Fechar o modal após a atualização
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);

  };

  return (
    <div
      className="modal-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: '9999',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={onClose}
    >
      <div
        className="modal"
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          padding: '20px',
          width: '50%',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ textAlign: 'right', marginBottom: '10px' }}>
          <span
            className="close"
            onClick={onClose}
            style={{ cursor: 'pointer', fontSize: '24px' }}
          >
            &times;
          </span>
        </div>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', fontFamily: 'Arial, sans-serif', color: '#333' }}>Task</h2>
        <p
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            margin: '10px 0',
            fontFamily: 'Arial, sans-serif',
            color: '#555',
          }}
        >
          {tasks.title}
        </p>
        <p
          style={{
            textAlign: 'center',
            margin: '10px 0',
            fontFamily: 'Arial, sans-serif',
            color: '#555',
          }}
        >
          Descrição: {tasks.description}
        </p>
        <hr />
        <p
          style={{
            fontFamily: 'Arial, sans-serif',
            color: '#555',
            marginLeft: '-30em'
          }}
        >
          Data Final: {formatDate(tasks.date)}
        </p>
        <label 
        style={{ 
          fontFamily: 'Arial, sans-serif', 
          color: '#555', 
          marginRight: '10px' 
          }}
          >
          Concluído:
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            style={{ 
              marginLeft: '5px',
              cursor:'pointer'
             }}
          />
        </label>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={updateTask}
            style={{
              marginRight: '10px',
              fontFamily: 'Arial, sans-serif',
              backgroundColor: '#f44336',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Fechar
          </button>
          {/* <button onClick={onClose} style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f44336', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Fechar</button> */}
        </div>
      </div>
    </div>
  );
}

export default ViewTasks;
