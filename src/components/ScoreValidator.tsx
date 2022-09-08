import { useState } from "react";
import { providers } from "ethers";
import { Loader } from "./Loader";
import { useScoreValidator } from "../hooks/useScoreValidator";

interface Props {
  signer: providers.JsonRpcSigner;
}

export const ScoreValidator = ({ signer }: Props) => {
  const [lensHandler, setLensHandler] = useState<string>("");
  const {
    checkScore,
    isLoading,
    minimalScore,
    score,
    isScoreEnough,
    errorMessage,
  } = useScoreValidator();

  if (isLoading) {
    return <Loader />;
  }

  if (errorMessage) {
    return (
      <div className="flex flex-col w-1/2">
        <p className="mb-4 text-white font-bold text-lg">{errorMessage}</p>
      </div>
    );
  }

  if (score) {
    return (
      <div className="flex flex-col w-1/2">
        <p className="mb-4 text-white font-bold text-lg">
          {isScoreEnough
            ? "Yay! Your score is high enough"
            : "We are sorry but your score isn't high enough"}
        </p>
        <p className="mb-4 text-white">
          Required score: <span className="font-bold">{minimalScore}</span>
        </p>
        <p className="mb-4 text-white">
          Your score: <span className="font-bold">{score}</span>
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-1/2">
      <p className="mb-4 text-white">Provide Lens handler</p>
      <input
        className="shadow border rounded w-full py-2 px-3 text-neutral-600 focus:outline-none focus:shadow-outline mb-4"
        placeholder="Lens handler"
        onChange={(event) => setLensHandler(event.currentTarget.value)}
        value={lensHandler}
      />
      <div className="flex justify-center">
        <button
          className="hover:opacity-75 text-white"
          onClick={() => checkScore(signer, lensHandler)}
          disabled={isLoading}
        >
          Check score
        </button>
      </div>
    </div>
  );
};
