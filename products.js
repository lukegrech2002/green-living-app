//Payment type: subscription/one-time/both

const products = [
  {
    id: "price_1KN2SmKuSSJ16z1DTcGf7oxh",
    name: "Football",
    price: 3995,
    paymentType: 1,
    currency: "USD",
    image: "/plants/kentiapalm.png",
    slots: 20,
    availableSlots: 20,
    ages: '5-12',
    transport: false
  },
  {
    id: "price_1JAEABEy9j6mAC9eYTnD6Rv7",
    name: "Basketball",
    price: 5995,
    paymentType: 1,
    currency: "USD",
    image: "/plants/monstera-deliciosa.png",
    slots: 20,
    availableSlots: 20,
    ages: '5-12',
    transport: false
  },
  {
    id: "price_1JAEABEy9j6mAC9eYTnD6Rv7",
    name: "Football Tournament",
    price: 5995,
    paymentType: 2,
    currency: "USD",
    image: "/plants/monstera-deliciosa.png",
    slots: 20,
    availableSlots: 20,
    ages: '5-12',
    transport: true
  },
];

export default products;
