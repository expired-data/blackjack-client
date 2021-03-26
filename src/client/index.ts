import { useEffect, useRef, useState } from "react";

type Suit = "Spades" | "Hearts" | "Diamonds" | "Clubs";
type CardValue = number | "Jack" | "Queen" | "King" | "Ace";

type Card = [CardValue, Suit];

export interface HandState {
  hand: Card[];
  value: number;
  busted?: boolean;
}

interface BlackjackClient {
  hit: () => Promise<void>;
  cards: () => Promise<void>;
  reset: () => Promise<void>; 
  stats: () => Promise<void>;
}

export interface Stats { 
    games: number, 
    total: number, 
    busts: number, 
    average: number
}

declare var TCPSocket: any;

export const useClient = (): [HandState | undefined, BlackjackClient | undefined, Stats | undefined] => {
  const [client, setClient] = useState<BlackjackClient | undefined>(); 
  const [hand, setHand] = useState<HandState | undefined>() 
  const [stats, setStats] = useState<Stats | undefined>(); 

  const handUpdateCall = (endpoint: string) => async (): Promise<void> => {
    const hand = await (await fetch(`/${endpoint}`)).json();
    setHand(hand); 
  }

  useEffect(() => { 
    fetch(`/connect`).then(body => body.json()).then(hand => { 
        setHand(hand); 
        setClient({ 
            hit: handUpdateCall("hit"),
            cards: handUpdateCall("cards"),
            reset: handUpdateCall("reset"),
            stats: async () => { 
                const stats = await (await fetch(`/stats`)).json();
                setStats(stats); 
            },
        });
    })
  }, [])
  return [hand, client, stats];
};
