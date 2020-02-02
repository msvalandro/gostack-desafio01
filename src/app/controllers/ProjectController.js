class ProjectController {
  constructor() {
    this.projects = [];
  }

  index(req, res) {
    return res.json(this.projects);
  }

  store(req, res) {
    const { id, title } = req.body;
    const project = { id, title, tasks: [] };

    this.projects.push(project);

    return res.json(project);
  }

  update(req, res) {
    const { id } = req.params;
    const { title } = req.body;
    const project = this.projects.find(p => p.id === parseInt(id));

    project.title = title;

    return res.json(project);
  }

  delete(req, res) {
    const { id } = req.params;

    this.projects = this.projects.filter(p => p.id !== parseInt(id));

    return res.json(true);
  }

  // should be in TaskController
  addTask(req, res) {
    const { id } = req.params;
    const { title } = req.body;
    const project = this.projects.find(p => p.id === parseInt(id));

    project.tasks.push(title);

    return res.json(project);
  }
}

export default new ProjectController();
