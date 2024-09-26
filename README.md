# Map Bet

This project is a Solana-based betting game application that allows participants to wager their SOL tokens. The game operates under a set of straightforward rules:

1. Betting Window: The game runs in 24-hour cycles, during which at least one bet must be placed. If no bets are made within this window, the accumulated tokens will be distributed among all participants.

2. Profit Distribution: There is no single winner in the game. Participants profit based on their position in the betting sequence. The participant who placed the last bet within the window will receive a substantial share of the profit, while early participants will also gain significant returns.

3. Bet Increment: Each new bet must be greater than the previous bet amount, ensuring an increasing stake throughout the game.

This structure creates a dynamic and competitive environment, rewarding both strategic early entries and timely last-minute bets.

## Backend and frontend installtion guide

- `npm install`
- Then change the directory to `cd backend_bet_map/` then again run `npm install`

## Backend command for database

- npx prisma generate
- npx prisma db push

## Frontend Folder Structure

## Backend Folder Structure

The Transaction file is responsible for handling the core logic of processing player transactions within the betting game.

- Game Management
- Player Management
- Reward Distribution
- Owner Updates
