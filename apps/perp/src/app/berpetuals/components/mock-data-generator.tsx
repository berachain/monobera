export interface Instrument {
  name: string;
  logoURI: string;
  amount: number;
  change24H: number;
}

export const DEFAULT_INSTRUMENT = {
  name: "BTC-BERP",
  logoURI:
    "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389",
  amount: 30350.69,
  change24H: 6.99,
};

export function generateRandomInstruments(): Instrument[] {
  const instruments: Instrument[] = [];

  const names = ["BTC-USD", "ETH-BERP", "LTC-BERP", "XRP-BERP", "ADA-BERP"];
  const logoURIs = [
    "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389",
    "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880",
    "https://assets.coingecko.com/coins/images/2/small/litecoin.png?1547033580",
    "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png?1605778731",
    "https://assets.coingecko.com/coins/images/975/small/cardano.png?1547034860",
  ];

  for (let i = 0; i < 30; i++) {
    const randomIndex = Math.floor(Math.random() * names.length);
    const randomAmount = +(Math.random() * 100000).toFixed(2);
    const randomChange = +(Math.random() * 100).toFixed(2);

    instruments.push({
      name: names[randomIndex] as string,
      logoURI: logoURIs[randomIndex] as string,
      amount: randomAmount,
      change24H: randomChange,
    });
  }

  return instruments;
}
