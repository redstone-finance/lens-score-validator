// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.2;

import "redstone-evm-connector/lib/contracts/message-based/PriceAware.sol";

contract ScoreValidator is PriceAware {
  uint256 minimalScoreRequired;
  constructor(uint256 _minimalScoreRequired) {
    minimalScoreRequired = _minimalScoreRequired;
  }

  function isSignerAuthorized(address _receviedSigner) public override virtual view returns (bool) {
    return _receviedSigner == 0x0C39486f770B26F5527BBBf942726537986Cd7eb; // redstone-main
  }

  function checkCreditscore(bytes32 lensHandle) view public returns (uint256, uint256, bool) {
    uint256 score = getPriceFromMsg(lensHandle);
    return (minimalScoreRequired, score, (score / 10 ** 8) >= minimalScoreRequired);
  }
}
