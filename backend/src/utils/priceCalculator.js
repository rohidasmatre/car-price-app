function calculatePrice(exShowroom, taxPercent, insurance) {
  const roadTax = (exShowroom * taxPercent) / 100;
  const fastag = 500;
  const handling = 3000;

  return {
    roadTax,
    fastag,
    handling,
    onRoadPrice:
      exShowroom + roadTax + insurance + fastag + handling
  };
}

module.exports = calculatePrice;
