import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { Button, ButtonProps } from "antd";
import { useState } from "react";

interface MetaMaskButtonProps extends ButtonProps {
  onConnect?: (address: string) => void;
}

export default function MetaMaskButton(props: MetaMaskButtonProps) {
  const [address, setAddress] = useState<string | null>(null);
  const [connecting, setConnecting] = useState<boolean>(false);

  async function connectToMetaMask() {
    try {
      setConnecting(true);
      await (window as any).ethereum.request({ method: "eth_requestAccounts" });
      const provider = new Web3Provider((window as any).ethereum);
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();
      setAddress(userAddress);
      // TODO: PUT USER
      props.onConnect && props.onConnect(userAddress);
    } catch (error) {
      console.log("Failed to connect to MetaMask: ", error);
    } finally {
      setConnecting(false);
    }
  }

  return (
    <Button type="primary" onClick={connectToMetaMask} loading={connecting} className="bg-blue-500 hover:bg-blue-600" {...props}>
      {address ? "Connected successfully to MetaMask" : "Connect to MetaMask"}
    </Button>
  );
}