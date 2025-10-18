export function ok(res, data) {
  return res.status(200).json(data);
}

export function created(res, data) {
  return res.status(201).json(data);
}

export function noContent(res) {
  return res.status(204).send();
}

export function notFound(res, message = "Not Found") {
  return res.status(404).json({ message });
}

export function serverError(res, error) {
  console.error(error);
  return res.status(500).json({ message: "Internal Server Error" });
}

export function badRequest(res, message = "Bad Request") {
  return res.status(400).json({ message });
}
