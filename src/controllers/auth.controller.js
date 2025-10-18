import * as svc from "../services/auth.service.js";
import { badRequest, ok, created } from "../utils/http.js";

export async function register(req, res) {
  try {
    const user = await svc.register(req.body);
    return created(res, user);
  } catch (e) {
    return badRequest(res, e.message);
  }
}

export async function login(req, res) {
  try {
    const result = await svc.login(req.body);
    return ok(res, result);
  } catch (e) {
    return badRequest(res, e.message);
  }
}
