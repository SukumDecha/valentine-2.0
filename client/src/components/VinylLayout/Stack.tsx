
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";

type CardData = {
  id: string;
  url: string;
  text?: string;
};

type CardRotateProps = {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
};

function CardRotate({ children, onSendToBack, sensitivity }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_: unknown, info: { offset: { x: number; y: number } }) {
    if (
      Math.abs(info.offset.x) > sensitivity ||
      Math.abs(info.offset.y) > sensitivity
    ) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className="absolute cursor-grab"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

type StackProps = {
  randomRotation?: boolean;
  sensitivity?: number;
  cardDimensions?: { width: number; height: number };
  cardsData?: CardData[];
  animationConfig?: { stiffness: number; damping: number };
  sendToBackOnClick?: boolean;

};

export default function Stack({
  randomRotation = false,
  sensitivity = 200,
  cardDimensions = { width: 208, height: 208 },
  cardsData = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false,
}: StackProps) {
  const [cards, setCards] = useState<CardData[]>(
    cardsData.length
      ? cardsData
      : [
        { id: `1`, url: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format", text: 'Title' },
        { id: `2`, url: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format", text: 'Title' },
        { id: `3`, url: "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format", text: 'Title' },
        { id: `4`, url: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format", text: 'Title' }
      ]
  );

  const sendToBack = (id: number) => {
    setCards((prev) => {
      const newCards = [...prev];
      const index = newCards.findIndex((card) => Number(card.id) === id);
      if (index === -1) return prev;
      const [card] = newCards.splice(index, 1);
      newCards.unshift(card);
      return newCards;
    });
  };

  return (
    <div
      className="relative"
      style={{
        width: cardDimensions.width,
        height: cardDimensions.height,
        perspective: 600,
      }}
    >
      {cards.map((card, index) => {
        const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0;

        const cardId = Number(card.id);
        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(cardId)}
            sensitivity={sensitivity}
          >
            <motion.div
              className="absolute w-full h-full rounded-[4px] overflow-hidden bg-gray-100 p-4 px-2 shadow-lg"
              onClick={() => sendToBackOnClick && sendToBack(cardId)}
              animate={{
                rotateZ: (cards.length - index - 1) * 4 + randomRotate,
                scale: 1 + index * 0.06 - cards.length * 0.06,
                transformOrigin: "90% 90%",
              }}
              initial={false}
              transition={{
                type: "spring",
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping,
              }}
              style={{
                width: cardDimensions.width,
                height: cardDimensions.height,
              }}
            >
              <div className="h-full">
                <img
                  src={card.url}
                  alt={`card-${card.id}`}
                  className="w-full object-cover h-3/4"
                  draggable="false"
                />
                <div className="h-1/4 flex justify-center items-center sm:text-lg md:text-2xl">"{card.text}"</div>
              </div>
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}
