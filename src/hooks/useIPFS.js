import { useMemo } from "react";
import { create } from "ipfs-http-client";
import PinataClient, { PinataSDK } from "@pinata/sdk";
// import { PinataSDK } from "pinata-web3";

import { useApplicationContext } from "../context/applicationContext";


// returns null on errors
export const useIPFS = () => {
  const {
    domainSettings: { ipfsInfuraProjectId, ipfsInfuraProjectSecret },
  } = useApplicationContext();

  const projectId =
    ipfsInfuraProjectId || process.env.REACT_APP_INFURA_IPFS_KEY;
  const projectSecret =
    ipfsInfuraProjectSecret || process.env.REACT_APP_INFURA_IPFS_SECRET;

  return useMemo(() => {
    if (!projectId || !projectSecret) return null;

    // try {
    //   const auth = "Basic " + Buffer.from(projectId + ":" + projectSecret).toString('base64');

    //   return create({
    //     host: "ipfs.infura.io",
    //     port: 5001,
    //     protocol: "https",
    //     headers: {
    //       authorization: auth,
    //     },
    //   });
    // } catch (error) {
    //   console.error('Failed to get IFPS', error)
    //   return null
    // }
    try {
      // This creates a Pinata client.
      // Even though the variable names say "Infura", we are passing them to Pinata.
      const pinata = new PinataClient(projectId, projectSecret);


      // Verify connection
      pinata
        .testAuthentication()
        .then((result) => {
          console.log("Pinata authentication successful:", result);
        })
        .catch((error) => {
          console.error("Pinata authentication failed:", error);
          return null;
        });
      return pinata;
    } catch (error) {
      console.error("Failed to create Pinata client", error);
      return null;
    }
  }, [projectId, projectSecret]);
};
