export default function DealerCTA({ car, city }) {
  const message = encodeURIComponent(
    `Hi, I'm interested in ${car.brand} ${car.model} (${car.variant}) in ${city}. Please share best on-road offer.`
  );

  return (
    <div className="mt-10 bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded text-black">
      <h3 className="text-xl font-bold mb-2">Get Best Dealer Offer</h3>
      <p className="mb-4">
        Connect with authorised dealers for discounts & offers.
      </p>

      <a
        href={`https://wa.me/91XXXXXXXXXX?text=${message}`}
        target="_blank"
        rel="noreferrer"
        className="inline-block bg-black text-white px-6 py-3 rounded"
      >
        Contact Dealer on WhatsApp
      </a>
    </div>
  );
}
