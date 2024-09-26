import { Request, Response } from "express";
import prisma from "../db/db";

const Closing = async (req: Request, res: Response) => {
  const game = await prisma.game.findFirst({
    where: {
      isActive: "ONGOING",
    },
  });

  const players = await prisma.player.findMany({
    where: { gameId: game?.id },
  });

  for (const player of players){
    // PERFORM LOGIC HERE TO DISTRIBUTE THE AMOUNT
    console.log(`Player: ${player}`);
  }

  await prisma.game.update({
    where: { id: game?.id },
    data: {
      isActive: "TERMINATE",
    },
  });

  res.send("Closing");
};

export default Closing;
