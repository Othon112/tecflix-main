import { Movie } from "@/types/Movie";
import { motion } from "framer-motion";
import { useState } from "react";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isActive, setIsActive] = useState<boolean>(false);
  return (
    <>
      <motion.div
        whileHover={{ scale: 1.2 }}
        className={`w-1/6 h-40 bg-blue-60  shrink-0`}
        onMouseEnter={() => {
          setIsActive(true);
        }}
        onMouseLeave={() => {
          setIsActive(false);
        }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url(${movie.cover})`,
            backgroundSize: "cover",
          }}
        ></div>
        {isActive && (
          <div className="bg-slate-900 flex flex-col py-5">
            <div className="flex flex-row p-5">
              <p className="text-white">{movie.title}</p>
            </div>
            <div className="flex flex-row px-5 space-x-5">
              <div className="w-10 h-10 border-solid border-white border rounded-full"></div>
              <div className="w-10 h-10 border-solid border-white border rounded-full"></div>
              <div className="w-10 h-10 border-solid border-white border rounded-full"></div>
            </div>
            <div className="flex flex-row p-5">
              <div className="border border-white">
                <p className="p-2  text-white text-xs">{movie.votes}</p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}
