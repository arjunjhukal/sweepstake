
import React from "react";
import { GameItem } from "@/types/game";

export default function ExlusiveGameDetail({ game }: { game: GameItem }) {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">{game.name}</h1>
            <p className="text-gray-600">{game.description}</p>
            <p className="text-sm">Provider: {game.provider}</p>
        </div>
    );
}
