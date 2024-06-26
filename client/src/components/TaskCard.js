import React, { useState, useEffect } from 'react';
import ViewTasks from './ViewTasks';
import People from './People';

function TaskCard() {
  const [selectedPeople, setSelectedPeople] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);

  const handleTaskEdit = (task) => {
    setSelectedTask(task); // Define o task selecionado quando clicado
  }

  useEffect(() => {
    fetchTasks();
  }, [handleTaskEdit, selectedTask]);

  useEffect(() => {
    fetchTasks();
  }, []);

 
  const handlePeopleByTeam = (task) => {
    setSelectedPeople(task);
  }

  const verifyIconStatus = (status) => {
    switch (status) {
      case 'pendente':
        return 'cancel';
      case 'concluido':
        return 'check_circle';
    }
  }

  const verifyColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return '#FFD700';
      case 'low':
        return 'green';
      default:
        return 'black';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate(); // Retorna o dia do mês (1 a 31)
    const month = date.toLocaleString('default', { month: 'short' }); // Retorna o mês abreviado
    return `${day} ${month}`;
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3333/tasks');
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const tasksData = await response.json();
      setTasks(tasksData);
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    }
  };

  return (
    <div className="task-card">
      <div style={{
        borderRadius: '5px',
        margin: '1rem',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '-20px', // Para centralizar verticalmente as informações
      }}>
        <p>
          Titulo
        </p>
        <div
          style={{
            display: 'flex',
          }}>
          <p
            style={{
              marginRight: '25px'
            }}
          >
            Data Final
          </p>
          <p
            style={{
              marginRight: '25px'
            }}
          >
            Status
          </p>
          <p
            style={{
              marginRight: '25px'
            }}
          >
            Prioridade
          </p>
          <p
            style={{
              marginRight: '25px'
            }}
          >
            Pessoa
          </p>
        </div>
      </div>

      {tasks.map(task => (
        <div
          key={task.id}
          style={{
            border: '1px solid black',
            borderRadius: '5px',
            margin: '1rem',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor:'pointer'
          }}
          onClick={() => handleTaskEdit(task)}
         >
          <p>
            {task.title}
          </p>
          <div
            style={{
              display: 'flex',
            }}>
            <p
              style={{
                marginRight: '44px',
                marginTop: '27px'
              }}
            >
              {formatDate(task.date)}
            </p>

            <p
              style={{
                marginRight: '55px',
                fontSize: '30px',
                marginTop: '20px',
                fontFamily: 'Material Symbols Outlined',
              }}>
              {verifyIconStatus(task.status)}
            </p>

            <p
              style={{
                marginRight: '65px',
                marginTop: '20px',
                fontFamily: 'Material Symbols Outlined',
                fontSize: '30px',
                color: verifyColor(task.priority),
              }}
            >
              flag_circle
            </p>

            <p
              style={{
                marginRight: '26px',
                fontFamily: 'Material Symbols Outlined',
                fontSize: '25px',
                cursor:'pointer',
              }}  
            >
              <span
                onClick={(e) => {
                  e.stopPropagation(); // Evita que o evento se propague para o contêiner pai
                  handlePeopleByTeam(task); // Chama handlePeopleByTeam apenas ao clicar no ícone
                }}
              >
                visibility
              </span>
            </p>
          </div>
        </div>
      ))}
      {selectedTask &&
        <ViewTasks
          tasks={selectedTask}
          onClose={() => setSelectedTask(null)}
        />}
      {selectedPeople &&
        <People
          tasks={selectedPeople}
          onClose={() => setSelectedPeople(null)}
        />}
    </div>
  );
}

export default TaskCard;
