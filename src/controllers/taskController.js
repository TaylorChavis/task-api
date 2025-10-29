import * as taskService from '../services/taskService.js';

export async function getTasks(req, res, next) {
  const tasks = await taskService.getAllTasks();
  res.json(tasks);
}

export async function createTask(req, res, next) {
  const { title, completed } = req.body;
  const task = await taskService.createTask({ title, completed });
  res.status(201).json(task);
}

export async function getTaskById(req, res, next) {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    const error = new Error('ID must be a number');
    error.status = 400;
    return next(error);
  }

  const task = await taskService.getTaskById(id);

  if (!task) {
    const error = new Error('Task not found');
    error.status = 404;
    return next(error);
  }

  res.json(task);
}