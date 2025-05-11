import { Coins01Icon, DeliveryTruck01Icon, VestIcon } from "hugeicons-react";

// Main Component
function FeaturesSection() {
  return (
    <div className="mx-4 flex items-center justify-between py-10 lg:mx-28">
      {/* Payment Column */}
      <div className="flex flex-col items-center">
        <div className="mb-4 text-supporting-success/30">
          <Coins01Icon size="3em" />
        </div>
        <h3 className="mb-2 text-lg">PAYMENT</h3>
        <p className="max-w-48 text-center text-sm text-gray-600">
          Easy payment methods for your convenience.
        </p>
      </div>

      <div className="flex flex-col items-center">
        <div className="mb-4 text-supporting-success/30">
          <DeliveryTruck01Icon size="3em" />
        </div>
        <h3 className="mb-2 text-lg">DELIVERY</h3>
        <p className="max-w-48 text-center text-sm text-gray-600">
          Get your products easy with fast delivery.
        </p>
      </div>

      <div className="flex flex-col items-center">
        <div className="mb-4 text-supporting-success/30">
          <VestIcon size="3em" />
        </div>
        <h3 className="mb-2 text-lg">VARAIBILITY</h3>
        <p className="max-w-48 text-center text-sm text-gray-600">
          Different types of clothes with cheap exercise.
        </p>
      </div>
    </div>
  );
}

export default FeaturesSection;
