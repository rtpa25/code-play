import { Request, Response, Router, json } from 'express';
import fs from 'fs/promises';
import path from 'path';

interface Cell {
  id: string;
  content: string;
  type: 'text' | 'code';
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = Router();

  router.use(json());

  const fullPath = path.join(dir, filename);

  router.get('/cells', async (req: Request, res: Response) => {
    try {
      const result = await fs.readFile(fullPath, { encoding: 'utf-8' });
      res.send(JSON.parse(result));
    } catch (error) {
      if (error.code === 'ENOENT') {
        await fs.writeFile(fullPath, '[]', 'utf-8');
        res.send([]);
      } else {
        throw error;
      }
    }
  });

  router.post('/cells', async (req: Request, res: Response) => {
    const { cells }: { cells: Cell[] } = req.body;
    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');
    res.send({ status: 'OK' });
  });

  return router;
};
