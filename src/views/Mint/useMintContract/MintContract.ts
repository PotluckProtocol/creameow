import { BigNumber, Contract, ethers } from "ethers";
import EventEmitter from "events";
import User from "../../../user/User";
import mintingAbi from './abi';

export const MintContractEvents = Object.freeze({
    MintSupplyUpdated: 'MintSupplyUpdated',
    MintStateUpdated: 'MintStateUpdated'
});

export enum MintState {
    NotStarted,
    Whitelist,
    Public
}

export type MintContractOpts = {
    mintStateRefreshIntervalMs?: number;
    mintSupplyRefreshIntervalMs?: number;
    fixedMaxSupply?: number;
}

class MintContract extends EventEmitter {

    private mintStateIntervalHandle: NodeJS.Timer | null = null;
    private mintSupplyIntervalHandle: NodeJS.Timer | null = null;
    private contract: ethers.Contract;

    constructor(
        contractAddress: string,
        user: User,
        private opts: MintContractOpts = {}
    ) {
        super();

        this.contract = new Contract(
            contractAddress,
            mintingAbi,
            user.getSignerOrProvider()
        );

        this.initRefreshIntervals();
    }

    public async getMaxSupply(): Promise<number> {
        if (typeof this.opts.fixedMaxSupply === 'number') {
            return this.opts.fixedMaxSupply;
        }

        const res = await this.contract.maxSupply() as BigNumber;
        return res.toNumber();
    }

    public async getMintedSupply(): Promise<number> {
        const res = await this.contract.totalSupply() as BigNumber;
        const mintedSupply = res.toNumber();

        this.emit(MintContractEvents.MintSupplyUpdated, mintedSupply);

        return mintedSupply;
    }

    public async getMintState(): Promise<MintState> {
        const [isPaused, isWhitelistMintEnabled] = await Promise.all([
            this.contract.paused(),
            this.contract.whitelistedOnly()
        ]);

        let mintState: MintState;
        if (isPaused) {
            mintState = MintState.NotStarted;
        } else if (isWhitelistMintEnabled) {
            mintState = MintState.Whitelist;
        } else {
            mintState = MintState.Public;
        }

        this.emit(MintContractEvents.MintStateUpdated, mintState);

        return mintState;
    }

    public clear() {
        if (this.mintStateIntervalHandle) {
            clearInterval(this.mintStateIntervalHandle);
        }

        if (this.mintSupplyIntervalHandle) {
            clearInterval(this.mintSupplyIntervalHandle);
        }

        this.removeAllListeners();
    }

    private initRefreshIntervals() {
        if (typeof this.opts.mintStateRefreshIntervalMs === 'number') {
            this.mintStateIntervalHandle = setInterval(() => {
                this.getMintState();
            }, this.opts.mintStateRefreshIntervalMs);
        }

        if (typeof this.opts.mintSupplyRefreshIntervalMs === 'number') {
            this.mintStateIntervalHandle = setInterval(() => {
                this.getMintedSupply();
            }, this.opts.mintSupplyRefreshIntervalMs);
        }
    }

}

export default MintContract;