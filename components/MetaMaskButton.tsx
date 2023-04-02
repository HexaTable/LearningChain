import { useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { useSession } from "next-auth/react";
import { Button, ButtonProps } from "antd";

import { notifyError, notifySuccess } from "./Notify";

interface MetaMaskButtonProps extends ButtonProps {
  onConnect?: (address: string) => void;
}

export default function MetaMaskButton(props: MetaMaskButtonProps) {
  const [address, setAddress] = useState<string | null>(null);
  const [connecting, setConnecting] = useState<boolean>(false);

  const { data: session } = useSession();

  async function connectToMetaMask() {
    try {
      setConnecting(true);

      if (!(window as any).ethereum) {
        notifyError(
          "MetaMask extension not detected",
          "Please install it to use this feature"
        );

        throw new Error("MetaMask not detected.");
      } else {
        notifySuccess(
          "MetaMask detected",
          "Metamask extension detected with success"
        );
      }

      await (window as any).ethereum.request({ method: "eth_requestAccounts" });
      const provider = new Web3Provider((window as any).ethereum);
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();

      setAddress(userAddress);
      updateUser(userAddress);

      props.onConnect && props.onConnect(userAddress);
    } catch (error) {
      notifyError("Error connecting to MetaMask", error.message);
    } finally {
      setConnecting(false);
    }
  }

  async function updateUser(userAddress: string) {
    const body = {
      wallet: userAddress,
    };

    try {
      const email = session?.user?.email;
      await fetch(`/api/users/${email}`, {
        method: "PUT",
        body: JSON.stringify(body),
      });
    } catch (error) {
      notifyError("Error", "Could not update user");
    }
  }

  return (
    <Button
      type="primary"
      onClick={connectToMetaMask}
      loading={connecting}
      className="bg-blue-500 hover:bg-blue-600"
      {...props}
    >
      {address ? "Already connected to MetaMask" : "Connect to MetaMask"}
    </Button>
  );
}
