import React, { useEffect, useState } from "react";
import api from './services/api'
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get(`repositories`).then(response => {
      const { data: repositories } = response;
      setRepositories(repositories)
    })
  }, []);

  async function handleAddRepository() {
    const newrepo = {
      url: "https://github.com/josepholiveira",
      title: `Desafio ReactJS ${repositories.length}`,
      techs: ["React", "Node.js"],
    };

    const repo = await api.post(`repositories`, newrepo)

    setRepositories([...repositories, repo.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    const index = repositories.findIndex(item => item.id === id)
    repositories.splice(index, 1)
    setRepositories([...repositories]);
  }

  async function handleLikeRepository(id) {
    const repo = await api.post(`repositories/${id}/like`)
    const index = repositories.findIndex(item => item.id === id)
    repositories[index] = repo.data
    setRepositories([...repositories]);
  }

  return (
    <div>
      <button onClick={handleAddRepository}>Adicionar</button>
      <ul data-testid="repository-list">
        {repositories && repositories.map(repo => (
          <li key={repo.id}>
            <div>Id: {repo.id}</div>
            <div>Title: <b>{repo.title}</b></div>
            <div>Likes: {repo.likes}</div>
            <div>
              <button onClick={() => handleLikeRepository(repo.id)}>
                Like
              </button>
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
