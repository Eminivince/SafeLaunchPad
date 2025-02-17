import { useWeb3React } from "@web3-react/core";
import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { networks } from "../constants/networksInfo";
import { utils } from "../utils";
import { useApplicationContext } from "./applicationContext";

export const PoolContext = createContext({});

export const PoolContextProvider = ({ children }) => {
  const [allPoolAddress, setAllPoolAddress] = useState([]);
  const [userPoolAddresses, setUserPoolAddresses] = useState([]);
  const [allPools, setAllPools] = useState({});
  const [IDOCreatedEvent, setIDOCreatedEvent] = useState(null);

  const [allLockerAddress, setAllLockerAddress] = useState([]);
  const [userLockersAddresses, setUserLockersAddresses] = useState([]);
  const [allLocker, setAllLocker] = useState({});
  const [lockerCreatedEvent, setLockerCreatedEvent] = useState(null);

  const dispatch = useDispatch();
  const contract = useSelector((state) => state.contract);
  const { account, chainId } = useWeb3React();

  const {
    domainSettings: { ipfsInfuraDedicatedGateway },
  } = useApplicationContext();

  // Effect: Load pool data when IPFS gateway is available
  useEffect(() => {
    
    if (ipfsInfuraDedicatedGateway) {

      const delayDebounceFn = setTimeout(() => {
        allPoolAddress.forEach(async (address, index) => {
          
          try {
            const IDOPoolData = await utils.loadPoolData(
              address,
              contract.web3,
              account,
              ipfsInfuraDedicatedGateway
            );
            
            setAllPools((prev) => ({ ...prev, [address]: IDOPoolData }));
            const { owner, userData, idoAddress } = IDOPoolData;
            if (
              owner?.toLowerCase() === account?.toLowerCase() ||
              (userData?.totalInvestedETH && userData?.totalInvestedETH !== "0")
            ) {
              
              setUserPoolAddresses((prev) => [...prev, idoAddress]);
            }
          } catch (err) {
            console.error(
              `[PoolContext] Error loading pool data for ${address}:`,
              err
            );
          }
        });
      }, 500);

      return () => {
        clearTimeout(delayDebounceFn);
      };
    }
  }, [allPoolAddress, ipfsInfuraDedicatedGateway, account, contract.web3]);

  // Effect: Refresh user pool addresses based on updated pool data
  useEffect(() => {
    
    setUserPoolAddresses([]);
    const delayDebounceFn = setTimeout(() => {
      Object.values(allPools).forEach(async (IDOPoolData, index) => {
        
        try {
          const userData = await utils.loadUserData(
            IDOPoolData.idoAddress,
            contract.web3,
            account
          );
          IDOPoolData.userData = userData;
          setAllPools((prev) => ({
            ...prev,
            [IDOPoolData.idoAddress]: IDOPoolData,
          }));
          const { owner, idoAddress } = IDOPoolData;
          if (
            owner?.toLowerCase() === account?.toLowerCase() ||
            (userData?.totalInvestedETH && userData?.totalInvestedETH !== "0")
          ) {
            
            setUserPoolAddresses((prev) => [...prev, idoAddress]);
          }
        } catch (err) {
          
        }
      });
    }, 500);

    return () => {
      clearTimeout(delayDebounceFn);

    };
  }, [account, allPools, contract.web3]);

  // Effect: Load locker data for each locker address
  useEffect(() => {
    
    const delayDebounceFn = setTimeout(() => {
      allLockerAddress.forEach(async (address, index) => {
        
        try {
          const lockerData = await utils.getLockerData(address, contract.web3);
          
          setAllLocker((prev) => ({ ...prev, [address]: lockerData }));
        } catch (err) {
          
        }
      });
    }, 500);

    return () => {
      clearTimeout(delayDebounceFn);
    };
  }, [allLockerAddress, contract.web3]);

  // // Effect: Subscribe to IDOCreated events to update pool addresses
  // useEffect(() => {
  //   if (!contract?.IDOFactory) {
  //     console.log("[PoolContext] IDOFactory contract not available");
  //     return;
  //   }

  //   console.log("[PoolContext] Setting up IDOCreated event subscription");
  //   if (IDOCreatedEvent) {
  //     console.log(
  //       "[PoolContext] Unsubscribing from previous IDOCreated event",
  //       IDOCreatedEvent
  //     );
  //     IDOCreatedEvent.unsubscribe();
  //     setAllPools({});
  //     setUserPoolAddresses([]);
  //   }

  //   const fromBlock = networks?.[chainId]?.fromBlock || 0;
  //   console.log(
  //     "[PoolContext] Subscribing to IDOCreated events from block",
  //     fromBlock
  //   );

  //   const newEvent = contract.IDOFactory.events.IDOCreated(
  //     { fromBlock },
  //     function (error, event) {
  //       if (error) {
  //         console.error("[PoolContext] IDOCreated event error:", error);
  //         return;
  //       }
  //       if (event) {
  //         console.log("[PoolContext] IDOCreated event received:", event);
  //         setAllPoolAddress((prev) => [...prev, event.returnValues.idoPool]);
  //       }
  //     }
  //   );
  //   setIDOCreatedEvent(newEvent);
  // }, [dispatch, contract, chainId]);

  useEffect(() => {
    if (!contract?.IDOFactory) {
      return;
    }

    const pollIDOCreatedEvents = async () => {
      try {
        const fromBlock = networks?.[chainId]?.fromBlock || 0;
        const latestBlock = await contract.web3.eth.getBlockNumber();
        

        const events = await contract.IDOFactory.getPastEvents("IDOCreated", {
          fromBlock,
          toBlock: "latest",
        });
        events.forEach((event) => {
          // Optionally, you can filter out duplicates if necessary
          setAllPoolAddress((prev) => {
            if (!prev.includes(event.returnValues.idoPool)) {
              return [...prev, event.returnValues.idoPool];
            }
            return prev;
          });
        });
      } catch (error) {

      }
    };

    // Initial poll
    pollIDOCreatedEvents();
    // Poll every 10 seconds (adjust as needed)
    const interval = setInterval(pollIDOCreatedEvents, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [contract, chainId]);

  // Effect: Subscribe to LockerCreated events to update locker addresses
  useEffect(() => {
    if (!contract.TokenLockerFactory) {
      return;
    }
    if (lockerCreatedEvent) {
      lockerCreatedEvent.unsubscribe();
      setAllLockerAddress([]);
      setUserLockersAddresses([]);
    }

    const fromBlock = networks?.[chainId]?.fromBlock || 0;

    const newLockerEvent = contract.TokenLockerFactory.events.LockerCreated(
      { fromBlock },
      function (error, event) {
        if (error) {
          return;
        }
        if (event) {
          setAllLockerAddress((prev) => [
            ...prev,
            event.returnValues.lockerAddress,
          ]);
        }
      }
    );
    setLockerCreatedEvent(newLockerEvent);
  }, [dispatch, contract, chainId]);

  // Effect: Filter user lockers based on owner/withdrawer
  useEffect(() => {
    setUserLockersAddresses([]);
    const delayDebounceFn = setTimeout(() => {
      Object.values(allLocker).forEach((lockerData, index) => {
        const { withdrawer, owner, lockerAddress } = lockerData;
        if (
          owner?.toLowerCase() === account?.toLowerCase() ||
          withdrawer?.toLowerCase() === account?.toLowerCase()
        ) {
          setUserLockersAddresses((prev) => [...prev, lockerAddress]);
        }
      });
    }, 500);

    return () => {
      clearTimeout(delayDebounceFn);
    };
  }, [account, allLocker]);

  const value = {
    allPools,
    allPoolAddress,
    userPoolAddresses,
    allLocker,
    allLockerAddress,
    userLockersAddresses,
  };

  return <PoolContext.Provider value={value}>{children}</PoolContext.Provider>;
};

export const usePoolContext = () => React.useContext(PoolContext);
