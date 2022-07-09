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
    user: User;
    contractAddress?: string;
    mintGasLimit: number;
    mintStateRefreshIntervalMs?: number;
    mintSupplyRefreshIntervalMs?: number;
    fixedMaxSupply: number;
    fixedMaxPerTx: number;
    fixedMintPrice: BigNumber;
}

class MintContract extends EventEmitter {

    private mintStateIntervalHandle: NodeJS.Timer | null = null;
    private mintSupplyIntervalHandle: NodeJS.Timer | null = null;
    private contract: ethers.Contract | null = null;

    constructor(
        private opts: MintContractOpts
    ) {
        super();

        if (this.opts.contractAddress) {
            this.contract = new Contract(
                this.opts.contractAddress,
                mintingAbi,
                this.opts.user.getSignerOrProvider()
            );
            this.initRefreshIntervals();
        }

    }

    public async getMaxSupply(): Promise<number> {
        return this.opts.fixedMaxSupply;
    }

    public async getMintedSupply(): Promise<number> {
        if (!this.contract) {
            return 0;
        }

        const res = await this.contract.totalSupply() as BigNumber;
        const mintedSupply = res.toNumber();

        this.emit(MintContractEvents.MintSupplyUpdated, mintedSupply);

        return mintedSupply;
    }

    public async getMintState(): Promise<MintState> {
        if (!this.contract) {
            return MintState.NotStarted;
        }

        const [isPaused] = await Promise.all([
            this.contract.paused(),
            // this.contract.whitelistedOnly()
        ]);

        let mintState: MintState;
        if (isPaused) {
            mintState = MintState.NotStarted;
            //} else if (isWhitelistMintEnabled) {
            //    mintState = MintState.Whitelist;
        } else {
            mintState = MintState.Public;
        }

        this.emit(MintContractEvents.MintStateUpdated, mintState);

        return mintState;
    }

    public async getMintPrice(): Promise<BigNumber> {
        return this.opts.fixedMintPrice;
    }

    public async getMaxPerTx(): Promise<number> {
        return this.opts.fixedMaxPerTx;
    }

    public async getWhitelistSpots(): Promise<number> {
        if (!this.opts.user.account) {
            return 0;
        }

        if (!this.contract) {
            throw new Error('No contract address defined');
        }

        const res = await this.contract.whiteListed(this.opts.user.account.walletAddress) as BigNumber;
        return res.toNumber();
    }

    public async mint(amount: number): Promise<void> {
        if (!this.opts.user.account) {
            throw new Error('Only connected account can mint');
        }

        if (!this.contract) {
            throw new Error('No contract address defined');
        }

        const mintPrice = BigNumber.from('25000000000000000000');

        (window as any).price = mintPrice.mul(amount);

        const tx = await this.contract.mint(amount, {
            value: mintPrice.mul(amount),
            gasLimit: String(this.opts.mintGasLimit * amount)
        });

        await tx.wait();
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