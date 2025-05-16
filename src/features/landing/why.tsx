import { Coins01Icon, DeliveryTruck01Icon, VestIcon } from "hugeicons-react";

// Main Component
function FeaturesSection() {
  return (
    <div className="flex flex-col items-center justify-around gap-10 px-4 py-28 sm:flex-row lg:px-28">
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
          Get different types of clothes cheaply.
        </p>
      </div>
    </div>
  );
}

export default FeaturesSection;
