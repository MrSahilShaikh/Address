import React, { useState } from 'react';
import Web3 from 'web3';
const usdtraisingContractABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_admin",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_superAdmin",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "stableCoin",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_maxContribution",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_minContribution",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "AccessControlBadConfirmation",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "internalType": "bytes32",
                "name": "neededRole",
                "type": "bytes32"
            }
        ],
        "name": "AccessControlUnauthorizedAccount",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address[]",
                "name": "_accounts",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "_amounts",
                "type": "uint256[]"
            }
        ],
        "name": "addMultipleToWhitelist",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_account",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "addToWhitelist",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "claim",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "contribute",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "enableWhitelist",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "endRaise",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "grantRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_newHardCap",
                "type": "uint256"
            }
        ],
        "name": "HardCapIncreased",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_newHardCap",
                "type": "uint256"
            }
        ],
        "name": "increaseHardCap",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_max",
                "type": "uint256"
            }
        ],
        "name": "MaxContributionSet",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_min",
                "type": "uint256"
            }
        ],
        "name": "MinContributionSet",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "previousAdminRole",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "newAdminRole",
                "type": "bytes32"
            }
        ],
        "name": "RoleAdminChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "RoleGranted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "RoleRevoked",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "_account",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "_value",
                "type": "bool"
            }
        ],
        "name": "WhitelistUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [],
        "name": "raiseEndedEvent",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [],
        "name": "raiseStartedEvent",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_account",
                "type": "address"
            }
        ],
        "name": "removeFromWhitelist",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "callerConfirmation",
                "type": "address"
            }
        ],
        "name": "renounceRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "revokeRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_feePercent",
                "type": "uint256"
            }
        ],
        "name": "setFeePercent",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_max",
                "type": "uint256"
            }
        ],
        "name": "setMaxContribution",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_min",
                "type": "uint256"
            }
        ],
        "name": "setMinContribution",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "startRaise",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "_user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_time",
                "type": "uint256"
            }
        ],
        "name": "totalContributed",
        "type": "event"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    },
    {
        "inputs": [],
        "name": "ADMIN_ROLE",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "contractCreator",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "contributions",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "contributorsList",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "DEFAULT_ADMIN_ROLE",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "feePercent",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            }
        ],
        "name": "getRoleAdmin",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "hardCap",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "hasRole",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "isHardCapSet",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "maxContribution",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "minContribution",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "numOfContributors",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "raiseEnded",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "raiseStarted",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "superAdmin",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalRaised",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "usdtToken",
        "outputs": [
            {
                "internalType": "contract IERC20",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "whitelist",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "WhitelistAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "whitelistEnabled",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

const ContractAddress = '0xB940db20C8A97efbA110F4eaa607B2029C3aa441'; // Replace with your contract address

const ContributionDetails = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState('');
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [index, setIndex] = useState('');
    const [contributorAddress, setContributorAddress] = useState('');
    const [addresses, setAddresses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // Connect to MetaMask
    const connectMetaMask = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);
                const contractInstance = new web3Instance.eth.Contract(
                    usdtraisingContractABI,
                    ContractAddress
                );
                setContract(contractInstance);
                const accounts = await web3Instance.eth.getAccounts();
                setAccount(accounts[0]);
            } catch (error) {
                console.error(error);
            }
        } else {
            alert('MetaMask not installed');
        }
    };

    // Function to fetch contribution amount
    const getContributionAmount = async () => {
        if (!contract || !address || !web3) return;

        try {
            const weiAmount = await contract.methods.contributions(address).call({ from: account });
            setAmount(weiAmount.toString()); // Set the amount in Wei
        } catch (error) {
            console.error(error);
        }
    };

    // Function to fetch contributor address at the given index
    // async function getContributorAddress() {
    //     if (!contract || !web3) {
    //         console.error('Web3 or contract instance not initialized');
    //         return;
    //     }
    //     try {
    //         const result = await contract.methods.contributorsList(index).call();
    //         setContributorAddress(result);
    //     } catch (error) {
    //         console.error('Error fetching contributor address:', error);
    //     }
    // }

    const getAllContributorAddresses = async () => {
        if (!contract || !web3 || isLoading) return;

        setIsLoading(true);

        try {
            const contributorsCount = await contract.methods.numOfContributors().call();
            const addresses = [];
            for (let i = 0; i < contributorsCount; i++) {
                const address = await contract.methods.contributorsList(i).call();
                addresses.push(address);
            }
            console.log(addresses);
            setAddresses(addresses);
        } catch (error) {
            console.error('Error fetching contributor addresses:', error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        
    <div>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ marginRight: '10px', fontWeight: 'bold' }}>Connected Wallet Address: {account}</p>
            <button style={{ padding: '5px 10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }} onClick={connectMetaMask}>Connect MetaMask</button>
          </div>
        </header>

        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
          {/* <div style={{ marginBottom: '10px' }}>
          <label>Enter Index:</label>
            <input
              type="text"
              value={index}
              onChange={(e) => setIndex(e.target.value)}
              placeholder="Enter index"
              style={{ marginRight: '10px', padding: '5px', border: '1px solid #ccc', borderRadius: '3px' }}
            />
            <button style={{ padding: '5px 10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }} onClick={getContributorAddress}>Get Contributor Address</button>
          </div>
          {contributorAddress && (
            <div style={{ marginTop: '20px' }}>
              <h2>Contributor Address at Index {index}:</h2>
              <p>{contributorAddress}</p>
            </div>
          )} */}

<div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
                    <button style={{ marginBottom: '10px', padding: '5px 10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }} onClick={getAllContributorAddresses} disabled={!contract || !web3 || isLoading}>Get All Contributor Addresses</button>
                    {isLoading && <p>Loading...</p>}
                    <div>
                        {addresses.length > 0 && (
                            <div>
                                <h2>All Contributor Addresses:</h2>
                                <ul>
                                    {addresses.map((address, index) => (
                                        <li key={index}>{address}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Enter Address:</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} style={{ marginRight: '10px', padding: '5px', border: '1px solid #ccc', borderRadius: '3px' }} />
            <button style={{ padding: '5px 10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }} onClick={getContributionAmount}>Get Contribution</button>
          </div>
          <div>
            <p>Contribution Amount: {amount} Wei</p>
          </div>
        </div>
      </div>
    </div>

    );
};

export default ContributionDetails;
