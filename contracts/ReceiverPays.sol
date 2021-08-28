// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "hardhat/console.sol";

contract ReceiverPays {
    address owner = msg.sender;
    mapping(uint256 => bool) usedNonces;

    constructor() payable {}

    function claimPayment(
        uint256 amount,
        uint256 nonce,
        bytes memory signature
    ) public {
        require(!usedNonces[nonce], "Nonce already used");
        usedNonces[nonce] = true;

        bytes32 message = prefixed(
            keccak256(abi.encodePacked(msg.sender, amount, nonce, this))
        );

        console.logBytes32(message);
        console.logBytes(signature);
        address temp = recoverSigner(message, signature);
        console.log(temp);

        require(temp == owner, "Message do not match");

        payable(msg.sender).transfer(amount);
    }

    function recoverSigner(bytes32 message, bytes memory sig)
        internal
        view
        returns (address)
    {
        (uint8 v, bytes32 r, bytes32 s) = splitSignature(sig);

        return ecrecover(message, v, r, s);
    }

    function splitSignature(bytes memory sig)
        internal
        view
        returns (
            uint8 v,
            bytes32 r,
            bytes32 s
        )
    {
        console.logUint(sig.length);
        require(sig.length == 65, "Signature must be 65 bytes long");
        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }
        return (v, r, s);
    }

    function prefixed(bytes32 hash) internal pure returns (bytes32) {
        return
            keccak256(
                abi.encodePacked("\x19Ethereum Signed Message:\n32", hash)
            );
    }

    function shutdonw() public {
        require(msg.sender == owner, "Only owner can shutdown");
        selfdestruct(payable(msg.sender));
    }
}
