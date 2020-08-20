const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

//const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function repositoriesCheck( request, response, next){
  const {id} = request.params;
  const newrepositoriesIndex = repositories.findIndex(newRepositories => newRepositories.id == id);

  if(newrepositoriesIndex < 0){
    return response.status(400).json("Repositorios nao encontrados")
  }

  request.newrepositoriesIndex = newrepositoriesIndex;
  request.id = id;

  return next();
};

app.use("/repositories/:id", repositoriesCheck);


app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;

  const newRepositories = {id: uuid(),title, url, techs, likes: 0};

  repositories.push(newRepositories);

  return response.status(201).json(newRepositories);
});

app.put("/repositories/:id", (request, response) => {
  const {title, url, techs} = request.body;
  const {id} = request.params;

  const newrepositoriesIndex = repositories.findIndex(newRepositories=> newRepositories.id == id);

  if(newrepositoriesIndex < 0){
    return response.status(400).json("Repositorios nao encontrado")
  };

  repositories[newrepositoriesIndex]= {
    id,
    title: title ? title : repositories[newrepositoriesIndex].title,
    url: url ? url : repositories[newrepositoriesIndex].url,
    techs: techs ? techs : repositories[newrepositoriesIndex.techs],
    likes: repositories[newrepositoriesIndex].likes
  }

  return response.json(repositories[newrepositoriesIndex]);

});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const newrepositoriesIndex = repositories.findIndex(newRepositories => newRepositories.id == id);

  if(newrepositoriesIndex < 0){
    return response.status(400).json(newrepositoriesIndex);
  }

  repositories.splice(newrepositoriesIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const newrepositoriesIndex = repositories.findIndex(newRepositories => newRepositories.id == id);

  repositories[newrepositoriesIndex].likes += 1;

  return response.json(repositories[newrepositoriesIndex]);
});

module.exports = app;
