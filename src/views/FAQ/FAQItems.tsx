import { FAQItem } from "./FAQ";

export const FAQItems: FAQItem[] = [{
    id: 'price-and-supply',
    title: 'What is the mint price and supply',
    content: (
        <p>
            There will be 5,555 Creameow<br />
            Mint price: 0.03 ETH
        </p>
    )
}, {
    id: 'wen',
    title: 'When is the launch date?',
    content: (
        <p>
            Public sale starts on July 16th 8 pm UTC. Early access sale starts on July 15th 8 pm UTC.
        </p>
    )
}, {
    id: 'potluck-labs',
    title: 'Potluck Labs - team behind the project?',
    content: (
        <>
            <p>We help artists build out generative projects that are focused on the art first and foremost. Beyond the art, we then provide an ecosystem of value. This includes: NFT staking, passive earnings, GameFi partnerships and much more. Potluck is also on the forefront of cross-chain and technical innovation. Many of our collections are traversable between multiple chains. We believe in breaking down walls and bringing communities together. We currently have over 5,000 unique wallet addresses holding our NFTs. We are a fully doxxed team committed to building a brand that artists and collectors alike can trust.</p>
            <p>-True Voodoo</p>
            <p className='mt-4'>Learn more at <a href="https://potluck-labs.com" target="_blank">potluck-labs.com</a>.</p>
            <p className='mt-4'>Join our <a href="https://discord.gg/potluckprotocol" target="_blank">Discord community</a> and follow us on Twitter <a href="https://twitter.com/PotluckProtocol" target="_blank">@potluckprotocol</a>.</p>
        </>
    )
}]