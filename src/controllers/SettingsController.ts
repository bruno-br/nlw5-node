import { Request, Response } from "express";
import { SettingsService } from "../services/SettingsService";

export class SettingsController {
  async create(request: Request, response: Response) {
    const { chat, username } = request.body;
    const settingsService = new SettingsService();
    const settings = await settingsService.create({ chat, username });
    return response.json({ chat, username });
  }
}
