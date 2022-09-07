import { useState } from "react";
import { Contract, providers, utils } from "ethers";
import { WrapperBuilder } from "redstone-evm-connector";
import { abi } from "../../artifacts/ScoreValidator.json";
import { CONTRACT_ADDRESS } from "../../config";

export const useScoreValidator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [minimalScore, setMinimalScore] = useState<number | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [isScoreEnough, setIsScoreEnough] = useState(false);

  const checkCreditScore = async (
    signer: providers.JsonRpcSigner,
    lensHandler: string
  ) => {
    setIsLoading(true);
    const contract = new Contract(CONTRACT_ADDRESS, abi, signer);
    const wrappedContract = WrapperBuilder.wrapLite(contract).usingPriceFeed(
      "redstone",
      { asset: lensHandler }
    );
    const lensHandlerAsBytes = utils.formatBytes32String(lensHandler);
    const [minimalScore, score, verdict] =
      await wrappedContract.checkCreditScore(lensHandlerAsBytes);
    setMinimalScore(Number(minimalScore));
    setScore(Number(utils.formatUnits(score, 8)));
    setIsScoreEnough(verdict);
    setIsLoading(false);
  };

  return {
    checkCreditScore,
    isLoading,
    minimalScore,
    score,
    isScoreEnough,
  };
};
