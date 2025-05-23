export function PromotionBanner() {
  return (
    <div className="bg-[#f8e8f3] py-10 my-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold text-[#942972] mb-2">SUMMER SALE</h2>
            <p className="text-lg text-[#414141] mb-4">Get up to 40% off on selected items</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <span className="block text-sm text-[#414141BF]">BUY</span>
                <span className="block text-xl font-bold text-[#942972]">$99</span>
                <span className="block text-sm text-[#414141BF]">Get 10% OFF</span>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                <span className="block text-sm text-[#414141BF]">BUY</span>
                <span className="block text-xl font-bold text-[#942972]">$199</span>
                <span className="block text-sm text-[#414141BF]">Get 20% OFF</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-4 -right-4 bg-[#942972] text-white text-xs font-bold px-2 py-1 rounded-full">
              FREE
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <img
                src="/placeholder.svg?height=150&width=150"
                alt="Gift with purchase"
                className="w-32 h-32 object-contain"
              />
              <p className="text-center text-sm font-medium text-[#942972] mt-2">
                Free Wall Art Print
                <br />
                with $199+ purchase
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
