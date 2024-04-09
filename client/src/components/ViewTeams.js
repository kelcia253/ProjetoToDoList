import React, { useState, useEffect } from 'react';
import ViewDetails from './ViewDetails';

function ViewTeams({ onClose }) {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null); // Estado para armazenar o time selecionado

  useEffect(() => {
    fetchTeam();
  }, []);

  const deleteTeam = async (id) => {
    try {
      await fetch(`http://localhost:3333/team/${id}`, {
        method: 'DELETE',
      });

      onClose();
    } catch (error) {
      console.error('Error deleting team:', error);
    }
  }

  const fetchTeam = async () => {
    try {
      const response = await fetch('http://localhost:3333/team');
      const teams = await response.json();
      setTeams(teams);
    } catch (error) {
      console.error('Error fetching team:', error);
    }
  }

  const handleTeamClick = (team) => {
    setSelectedTeam(team); // Define o time selecionado quando clicado
  }

  return (
    <div
      className="modal-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: '9998', // Z-index menor que o modal para ficar por trás
        backdropFilter: 'blur(8px)', // Aplica um efeito de desfoque ao fundo
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semitransparente
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        className="modal"
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          padding: '20px',
          maxHeight: '400px', // Defina a altura máxima desejada
          overflowY: 'auto', // Adicione rolagem vertical quando necessário
          width: '50%',
        }}
      >
        <div style={{ textAlign: 'right', marginBottom: '10px' }}>
          <span
            className="close"
            onClick={onClose} // Adicionando evento onClick
            style={{ cursor: 'pointer', fontSize: '24px' }}
          >
            &times;
          </span>
        </div>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Times</h2>
        <ul style={{ listStyle: 'none', padding: '0' }}>
          {teams.map((team) => (
            <li
              key={team.id}
              style={{
                padding: '10px',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px',
                marginBottom: '10px',
                cursor: 'pointer', // Adicione o cursor pointer para indicar que é clicável
              }}
              onClick={() => handleTeamClick(team)} // Adicione o evento de clique com o time
            >
              {team.title}
              <p
                style={{
                  marginRight: '65em',
                  marginTop: '-1em',
                  fontFamily: 'Material Symbols Outlined',
                  fontSize: '20px',
                  cursor:'pointer'

                }}
                onClick={() => deleteTeam(team.id)}
              >
                delete
              </p>
            </li>
            
          ))}
        </ul>
      </div>
      {selectedTeam && 
      <ViewDetails 
      team={selectedTeam} 
      onClose={() => setSelectedTeam(null)} />} {/* Renderiza ViewDetails apenas se um time estiver selecionado */}
    </div>
  );
}

export default ViewTeams;
