export const fetchStockDetails = async (symbols: string[]) => {
  const apiKey = 'cu6a8kpr01qujm3q5tegcu6a8kpr01qujm3q5tf0'; // Replace with your actual Finnhub API key
  
  const requests = symbols.map(symbol =>
    fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`)
  );

  try {
    const responses = await Promise.all(requests);

    const dataPromises = responses.map(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch data for symbol: ${symbols}`);
      }
      return response.json();
    });

    const data = await Promise.all(dataPromises);

    return data.map((stockData, index) => ({
      id: symbols[index],
      name: symbols[index],
      price: stockData.c, // Current price
      high: stockData.h, // High price of the day
      low: stockData.l, // Low price of the day
      open: stockData.o, // Opening price
      previousClose: stockData.pc, // Previous close price
    }));

  } catch (error) {
    console.error('Error fetching stock data:', error);
    return [];
  }
};
