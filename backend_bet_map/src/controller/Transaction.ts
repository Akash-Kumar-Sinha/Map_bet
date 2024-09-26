import { Request, Response } from "express";

import prisma from "../db/db";

const Transaction = async (req: Request, res: Response) => {
  console.log("transaction");
  const { playerPublicKey, transactionAmount } = req.body;

  const rewarded_profit = 0.1 * transactionAmount;

  const actualBettedAmount = transactionAmount - rewarded_profit;

  // FINDING ONGOING GAME
  try {
    const game = await prisma.game.findFirst({
      where: {
        isActive: "ONGOING",
      },
    });

    if (game) {
      // UPDATING GAME
      try {
        await prisma.game.update({
          where: { id: game.id },
          data: {
            lastTransactionPublicKey: playerPublicKey,
            lastTransactionAmount: transactionAmount.toString(),
            lastTransactiontime: new Date(),
            playerCount: game.playerCount + 1,
          },
        });

        // PER PERSON SOL
        const numberOfPlayer = game.playerCount + 1;
        const solPerPerson = rewarded_profit / numberOfPlayer;

        // FINDING PLAYER
        const player = await prisma.player.findFirst({
          where: { gameId: game.id, pubkey: playerPublicKey },
        });

        if (!player) {
          // CREATING PLAYER
          const newPlayer = await prisma.player.create({
            data: {
              gameId: game.id,
              pubkey: playerPublicKey,
              playerBettedAmount: transactionAmount.toString(),
              playerRewardAmount: "0",
            },
          });

          // TRANSACTION CREATED
          await prisma.transaction.create({
            data: {
              bettedAmount: transactionAmount.toString(),
              playerId: newPlayer.id,
            },
          });

          // FINDING PLAYER WHICH COMES BEFORE THE CURRENT PLAYER
          const rewardedPlayers = await prisma.player.findMany({
            where: {
              gameId: game.id,
              id: {
                not: newPlayer?.id,
              },
            },
          });

          // REWARDING ALL THE PLAYER EXCEPT THE CURRENT PLAYER BY LOOPING THROUGH IT
          if (rewardedPlayers.length > 0) {
            for (const rewardedPlayer of rewardedPlayers) {
              await prisma.player.update({
                where: {
                  id: rewardedPlayer.id,
                },
                data: {
                  playerRewardAmount: (
                    Number(rewardedPlayer.playerRewardAmount) + solPerPerson
                  ).toString(),
                },
              });
            }
          }
        } else {
          // UPDATING PLAYER
          await prisma.player.update({
            where: { id: player.id },
            data: {
              playerBettedAmount: (
                Number(player.playerBettedAmount) + transactionAmount
              ).toString(),
            },
          });

          // TRANSACTION CREATED
          await prisma.transaction.create({
            data: {
              bettedAmount: transactionAmount.toString(),
              playerId: player.id,
            },
          });

          // FINDING PLAYER WHICH COMES BEFORE THE CURRENT PLAYER
          const rewardedPlayers = await prisma.player.findMany({
            where: {
              gameId: game.id,
              pubkey: {
                not: player?.pubkey,
              },
            },
          });

          // REWARDING ALL THE PLAYER EXCEPT THE CURRENT PLAYER BY LOOPING THROUGH IT
          if (rewardedPlayers.length > 0) {
            for (const rewardedPlayer of rewardedPlayers) {
              await prisma.player.update({
                where: {
                  id: rewardedPlayer.id,
                },
                data: {
                  playerRewardAmount: (
                    Number(rewardedPlayer.playerRewardAmount) + solPerPerson
                  ).toString(),
                },
              });
            }
          }
        }

        // UPDATE OWNER
        const owner = await prisma.owner.findFirst({
          where: { gameId: game.id },
        });

        if (owner) {
          await prisma.owner.update({
            where: { id: owner.id },
            data: {
              bettedAmount: (
                Number(owner.bettedAmount) + actualBettedAmount
              ).toString(),
              profitAmount: (
                Number(owner?.profitAmount) + solPerPerson
              ).toString(),
            },
          });
        }
        res.status(200).send({
          message: "If Transaction successfull",
          game,
        });
      } catch (error) {
        console.log(`Internal server Error ${error}`);
        res.status(500).send("Some error occured at transaction if statement");
      }

      // GAME DOES NOT EXIST
    } else {
      try {
        const address = "jGBVZGZqDQZz97VFmkMxmzbsLCiW9XZpVx5GJXMWdMF";

        // NEW GAME CREATION
        const newGame = await prisma.game.create({
          data: {
            isActive: "ONGOING",
            lastTransactionPublicKey: playerPublicKey,
            lastTransactionAmount: transactionAmount.toString(),
            timeForNextTransaction: new Date(
              new Date().getTime() + 24 * 60 * 60 * 1000
            ),
            playerCount: 1,
          },
        });

        // PLAYER CREATION
        const newPlayer = await prisma.player.create({
          data: {
            gameId: newGame.id,
            pubkey: playerPublicKey,
            playerBettedAmount: transactionAmount.toString(),
            playerRewardAmount: "0",
          },
        });

        // TRANSACTION CREATED
        await prisma.transaction.create({
          data: {
            bettedAmount: transactionAmount.toString(),
            playerId: newPlayer.id,
          },
        });

        // OWNER CREATION
        await prisma.owner.create({
          data: {
            gameId: newGame.id,
            bettedAmount: transactionAmount.toString(),
            profitAmount: rewarded_profit.toString(),
            ownerPublicKey: address,
          },
        });
        res.status(200).send({
          message: "Else Transaction successfull",
          newGame,
        });
      } catch (error) {
        console.log(`Internal server Error ${error}`);
        res
          .status(500)
          .send("Some error occured at transaction else statement");
      }
    }
  } catch (error) {
    console.error(`Internal server Error: ${error}`);
    res
      .status(500)
      .send(
        "An error occurred while processing the transaction at transaction root try catch"
      );
  }
};

export default Transaction;
