import { useEffect } from "react";

function useTestNumbers() {
  const sumSeries = (num: number): number => {
    if (num < 1) {
      throw new Error("Input must be a positive integer.");
    }
    return (num * (num + 1)) / 2;
  };

  function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function analyze(num: number): {
    sumOfVerses: number;
    numberOfEvenResults: number;
    numberOfOddResults: number;
    sumOfnumberOfEvenResults: number;
    sumOfnumberOfOddResults: number;
    sumOfChaperNumbers: number;
  } {
    if (num < 1) {
      throw new Error("Input must be a positive integer.");
    }

    let sumOfVerses = 0;
    let numberOfEvenResults = 0;
    let numberOfOddResults = 0;
    let sumOfnumberOfEvenResults = 0;
    let sumOfnumberOfOddResults = 0;

    for (let i = 1; i <= num; i++) {
      const random = getRandomInt(3, 114); // Generate random numbers between 1 and 200 inclusive
      const sum = i + random;

      sumOfVerses += random;

      if (sum % 2 === 0) {
        numberOfEvenResults++;
        sumOfnumberOfEvenResults += sum;
      } else {
        numberOfOddResults++;
        sumOfnumberOfOddResults += sum;
      }
    }

    const sumOfChaperNumbers = sumSeries(num);

    return {
      sumOfVerses,
      numberOfEvenResults,
      numberOfOddResults,
      sumOfnumberOfEvenResults,
      sumOfnumberOfOddResults,
      sumOfChaperNumbers,
    };
  }

  useEffect(() => {
    const num = 114; // Replace with the desired number of iterations in the series
    const maxAttempts = 100000;

    let attempt = 0;
    let success = false;

    while (attempt < maxAttempts && !success) {
      const result = analyze(num);

      console.log(`Attempt ${attempt + 1}:`, result);

      if (
        result.sumOfnumberOfEvenResults === result.sumOfVerses &&
        result.sumOfnumberOfOddResults === result.sumOfChaperNumbers &&
        result.numberOfEvenResults === result.numberOfOddResults
      ) {
        console.log("Success! Conditions met on attempt:", attempt + 1);
        console.log("Final Result:", result);
        success = true;
      }

      attempt++;
    }

    if (!success) {
      console.log("Failed to meet conditions after", maxAttempts, "attempts.");
    }
  }, []);

  return {};
}

export default useTestNumbers;
