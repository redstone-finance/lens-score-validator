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
  const [errorMessage, setErrorMessage] = useState("");

  const checkScore = async (
    signer: providers.JsonRpcSigner,
    lensHandler: string
  ) => {
    setIsLoading(true);
    const wrappedContract = buildWrappedContract(signer, lensHandler);
    try {
      const { minimalScore, score, verdict } = await fetchScoreDataFromContract(
        lensHandler,
        wrappedContract
      );
      setMinimalScore(Number(minimalScore));
      setScore(Number(utils.formatUnits(score, 8)));
      setIsScoreEnough(verdict);
    } catch (error: any) {
      if (error[0].response.status === 500) {
        setErrorMessage("Invalid Lens handler");
      } else {
        setErrorMessage("Fetching score data from contract failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const buildWrappedContract = (
    signer: providers.JsonRpcSigner,
    lensHandler: string
  ) => {
    const contract = new Contract(CONTRACT_ADDRESS, abi, signer);
    return WrapperBuilder.wrapLite(contract).usingPriceFeed("redstone", {
      asset: lensHandler,
    });
  };

  const fetchScoreDataFromContract = async (
    lensHandler: string,
    wrappedContract: Contract
  ) => {
    const lensHandlerAsBytes = utils.formatBytes32String(lensHandler);
    const [minimalScore, score, verdict] =
      await wrappedContract.checkCreditScore(lensHandlerAsBytes);
    return { minimalScore, score, verdict };
  };

  return {
    checkScore,
    isLoading,
    minimalScore,
    score,
    isScoreEnough,
    errorMessage,
  };
};
