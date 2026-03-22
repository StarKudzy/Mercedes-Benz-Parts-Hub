const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Product = require("./models/Product");

dotenv.config();

const products = [
  {
    name: "Front Brake Pad Set",
    price: 89.95,
    stock: 12,
    description: "Used for reducing wheel speed and stopping the vehicle safely.",
    category: "brakes",
    condition: "new",
    image: "images/brake1.png"
  },
  {
    name: "Brake Disc Rotor",
    price: 129.95,
    stock: 8,
    description: "Works with brake pads to reduce wheel rotation and provide controlled braking.",
    category: "brakes",
    condition: "new",
    image: "images/brake2.png"
  },
  {
    name: "Rear Brake Caliper",
    price: 149.95,
    stock: 6,
    description: "Holds the brake pads and applies pressure to the rotor during braking.",
    category: "brakes",
    condition: "new",
    image: "images/brake3.png"
  },
  {
    name: "Brake Wear Sensor",
    price: 24.95,
    stock: 20,
    description: "Monitors brake pad wear and alerts the driver when replacement is needed.",
    category: "brakes",
    condition: "new",
    image: "images/brake4.png"
  },
  {
    name: "Brake Hose Assembly",
    price: 39.95,
    stock: 10,
    description: "Carries brake fluid from the brake line to the caliper for hydraulic braking.",
    category: "brakes",
    condition: "new",
    image: "images/brake5.png"
  },
  {
    name: "Engine Oil Filter",
    price: 18.95,
    stock: 15,
    description: "Removes contaminants from engine oil to ensure smooth engine performance and longevity.",
    category: "engine",
    condition: "new",
    image: "images/engine1.png"
  },
  {
    name: "Air Filter Element",
    price: 24.95,
    stock: 20,
    description: "Filters incoming air to the engine, preventing dust and debris from entering combustion.",
    category: "engine",
    condition: "new",
    image: "images/engine2.png"
  },
  {
    name: "Spark Plug Set",
    price: 49.95,
    stock: 10,
    description: "Provides the spark needed to ignite the air-fuel mixture in the engine cylinders.",
    category: "engine",
    condition: "new",
    image: "images/engine3.png"
  },
  {
    name: "Engine Belt Kit",
    price: 64.95,
    stock: 7,
    description: "Drives essential engine components such as the alternator, water pump, and air conditioning system.",
    category: "engine",
    condition: "new",
    image: "images/engine4.png"
  },
  {
    name: "MAF Sensor",
    price: 79.95,
    stock: 9,
    description: "Measures the amount of air entering the engine to optimize fuel injection and performance.",
    category: "engine",
    condition: "new",
    image: "images/engine5.png"
  },
  {
    name: "Alternator",
    price: 189.95,
    stock: 6,
    description: "Generates electrical power to charge the battery and run vehicle electronics.",
    category: "electrical",
    condition: "new",
    image: "images/el1.png"
  },
  {
    name: "Starter Motor",
    price: 159.95,
    stock: 5,
    description: "Cranks the engine to start the vehicle by turning the crankshaft.",
    category: "electrical",
    condition: "new",
    image: "images/el2.png"
  },
  {
    name: "Oxygen (O2) Sensor",
    price: 69.95,
    stock: 14,
    description: "Measures oxygen levels in exhaust gases to optimize fuel efficiency and emissions.",
    category: "electrical",
    condition: "new",
    image: "images/el3.png"
  },
  {
    name: "MAF Sensor Electrical",
    price: 79.95,
    stock: 9,
    description: "Monitors air intake to ensure correct fuel-to-air ratio for engine performance.",
    category: "electrical",
    condition: "new",
    image: "images/el4.png"
  },
  {
    name: "Ignition Coil",
    price: 54.95,
    stock: 11,
    description: "Converts battery voltage into high voltage needed to ignite the fuel mixture.",
    category: "electrical",
    condition: "new",
    image: "images/el5.png"
  },
  {
    name: "LED Headlight Assembly",
    price: 249.95,
    stock: 7,
    description: "Provides bright forward illumination for safe night driving and visibility.",
    category: "lighting",
    condition: "new",
    image: "images/light1.png"
  },
  {
    name: "Rear Tail Light Unit",
    price: 119.95,
    stock: 10,
    description: "Displays braking, reversing and signaling functions for vehicles behind.",
    category: "lighting",
    condition: "new",
    image: "images/light2.png"
  },
  {
    name: "Fog Light Assembly",
    price: 69.95,
    stock: 13,
    description: "Improves visibility in fog, rain, and low-visibility driving conditions.",
    category: "lighting",
    condition: "new",
    image: "images/light3.png"
  },
  {
    name: "Turn Signal Indicator",
    price: 34.95,
    stock: 18,
    description: "Signals direction changes to other drivers for safer road communication.",
    category: "lighting",
    condition: "new",
    image: "images/light1.png"
  },
  {
    name: "LED Light Bulb Set",
    price: 29.95,
    stock: 25,
    description: "Energy-efficient bulbs providing bright illumination for various vehicle lights.",
    category: "lighting",
    condition: "new",
    image: "images/light2.png"
  },
  {
    name: "Alternator (Pre-Owned)",
    price: 95.0,
    stock: 3,
    description: "Supplies electrical power and charges the battery while the engine is running.",
    category: "other",
    condition: "preowned",
    image: "images/alternator.png"
  },
  {
    name: "Starter Motor (Pre-Owned)",
    price: 89.0,
    stock: 4,
    description: "Engages the engine to start the vehicle by rotating the crankshaft.",
    category: "other",
    condition: "preowned",
    image: "images/startermotor.png"
  },
  {
    name: "Gearbox",
    price: 350.0,
    stock: 2,
    description: "Transfers engine power to the wheels and allows gear shifting for speed control.",
    category: "other",
    condition: "preowned",
    image: "images/gearbox.png"
  },
  {
    name: "Body Panel",
    price: 140.0,
    stock: 5,
    description: "Exterior vehicle panel used for structural protection and appearance.",
    category: "other",
    condition: "preowned",
    image: "images/door.png"
  },
  {
    name: "Side Mirror",
    price: 55.0,
    stock: 6,
    description: "Provides rear and side visibility for safer driving and lane changes.",
    category: "other",
    condition: "preowned",
    image: "images/mirror.png"
  },
  {
    name: "Radiator",
    price: 120.0,
    stock: 4,
    description: "Cools engine coolant by dissipating heat to prevent engine overheating.",
    category: "other",
    condition: "preowned",
    image: "images/radiator.png"
  }
];

const seedProducts = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Products seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedProducts();