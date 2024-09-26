import { Request, Response } from "express";

import prisma from "../db/db";

const Game = async (req: Request, res: Response) => {
  const game = await prisma.game.findFirst({
    where: {
      isActive: "ONGOING",
    },
  });

  if (game) {
    const players = await prisma.player.findMany({
      where: { gameId: game.id },
    });
    res.send({ game, players });
  } else {
    res.send("Create Game");
  }
};

export default Game;
