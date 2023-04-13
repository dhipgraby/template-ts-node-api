import { Network, Alchemy, OwnedNftsResponse } from "alchemy-sdk";

export const useAlchemy = (_network: Network) => {
    const config = {
        apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API,
        network: _network
    };

    const alchemy: Alchemy = new Alchemy(config);
    // if (alchemy) console.log(`useAlchemy:${_network}:Ready`);

    const getNftsForOwner = async (address: `${string}`): Promise<OwnedNftsResponse | null> => {
        try {
            const _nftsForOwner = await alchemy.nft.getNftsForOwner(address);
            // console.log("useAlchemy:getNftsForOwner:success", { _nftsForOwner });
            return _nftsForOwner;
        } catch (error) {
            console.log("useAlchemy:getNftsForOwner:error", { error });
            return null;
        }
    };

    const refreshNftMetadata = async (contractAddress: `0x${string}`, tokenId: string) => {
        try {
            const _refreshNft = await alchemy.nft.refreshNftMetadata(contractAddress, tokenId);
            console.log("useAlchemy:refreshNftMetadata:success", { _refreshNft });
        } catch (error) {
            console.log("useAlchemy:refreshNftMetadata:error", { error });

        }
    };

    return {
        getNftsForOwner,
        refreshNftMetadata
    };
};