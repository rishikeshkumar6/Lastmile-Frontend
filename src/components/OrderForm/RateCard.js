import React from "react";
import Sidebar from "../Sidebar";

const courierData = [
  // Blue Dart (Premium Service)
  {
    id: 1,
    courier: "Blue Dart",
    mode: "Surface",
    minWeight: "0.5 kg",
    zoneA: { forward: "₹48", rto: "₹25" }, // +₹3 (prev. undervalued)
    zoneB: { forward: "₹58", rto: "₹30" }, // +₹3
    zoneC: { forward: "₹68", rto: "₹35" }, // +₹3
    zoneD: { forward: "₹78", rto: "₹40" }, // +₹3
    zoneE: { forward: "₹98", rto: "₹50" }, // +₹3
    codCharges: "2% (Min ₹25)",
    otherCharges: "Fuel: ₹8, ODA: ₹25", // ✓
  },
  {
    id: 2,
    courier: "Blue Dart",
    mode: "Air",
    minWeight: "0.5 kg",
    zoneA: { forward: "₹68", rto: "₹35" }, // +₹3
    zoneB: { forward: "₹78", rto: "₹40" }, // +₹3
    zoneC: { forward: "₹88", rto: "₹45" }, // +₹3
    zoneD: { forward: "₹98", rto: "₹50" }, // +₹3
    zoneE: { forward: "₹128", rto: "₹65" }, // +₹3
    codCharges: "2% (Min ₹25)",
    otherCharges: "Fuel: ₹12, ODA: ₹35", // ✓
  },

  // DTDC (Standard Service)
  {
    id: 3,
    courier: "DTDC",
    mode: "Surface",
    minWeight: "0.5 kg",
    zoneA: { forward: "₹42", rto: "₹20" }, // RTO:₹20 (prev.₹22 overpriced)
    zoneB: { forward: "₹52", rto: "₹25" }, // RTO:₹25 (prev.₹28 overpriced)
    zoneC: { forward: "₹62", rto: "₹30" }, // RTO:₹30 (prev.₹32 overpriced)
    zoneD: { forward: "₹72", rto: "₹35" }, // RTO:₹35 (prev.₹38 overpriced)
    zoneE: { forward: "₹92", rto: "₹45" }, // RTO:₹45 (prev.₹48 overpriced)
    codCharges: "2.5% (Min ₹20)",
    otherCharges: "Fuel: ₹7, ODA: ₹20", // ✓
  },
  {
    id: 4,
    courier: "DTDC",
    mode: "Air",
    minWeight: "0.5 kg",
    zoneA: { forward: "₹62", rto: "₹30" }, // RTO:₹30 (prev.₹32 overpriced)
    zoneB: { forward: "₹72", rto: "₹35" }, // RTO:₹35 (prev.₹38 overpriced)
    zoneC: { forward: "₹82", rto: "₹40" }, // RTO:₹40 (prev.₹42 overpriced)
    zoneD: { forward: "₹92", rto: "₹45" }, // RTO:₹45 (prev.₹48 overpriced)
    zoneE: { forward: "₹122", rto: "₹60" }, // RTO:₹60 (prev.₹62 overpriced)
    codCharges: "2.5% (Min ₹20)",
    otherCharges: "Fuel: ₹10, ODA: ₹30", // ✓
  },

  // Delhivery (Standard+)
  {
    id: 5,
    courier: "Delhivery",
    mode: "Surface",
    minWeight: "0.5 kg",
    zoneA: { forward: "₹38", rto: "₹18" }, // +₹3, RTO:₹18 (prev.₹20 overpriced)
    zoneB: { forward: "₹48", rto: "₹24" }, // +₹3, RTO:₹24 (prev.₹25 overpriced)
    zoneC: { forward: "₹58", rto: "₹29" }, // +₹3, RTO:₹29 (prev.₹30 overpriced)
    zoneD: { forward: "₹68", rto: "₹34" }, // +₹3, RTO:₹34 (prev.₹35 overpriced)
    zoneE: { forward: "₹88", rto: "₹44" }, // +₹3, RTO:₹44 (prev.₹45 overpriced)
    codCharges: "2% (Min ₹15)",
    otherCharges: "Fuel: ₹6, ODA: ₹18", // ✓
  },
  {
    id: 6,
    courier: "Delhivery",
    mode: "Air",
    minWeight: "0.5 kg",
    zoneA: { forward: "₹58", rto: "₹28" }, // +₹3, RTO:₹28 (prev.₹30 overpriced)
    zoneB: { forward: "₹68", rto: "₹33" }, // +₹3, RTO:₹33 (prev.₹35 overpriced)
    zoneC: { forward: "₹78", rto: "₹38" }, // +₹3, RTO:₹38 (prev.₹40 overpriced)
    zoneD: { forward: "₹88", rto: "₹43" }, // +₹3, RTO:₹43 (prev.₹45 overpriced)
    zoneE: { forward: "₹118", rto: "₹58" }, // +₹3, RTO:₹58 (prev.₹60 overpriced)
    codCharges: "2% (Min ₹15)",
    otherCharges: "Fuel: ₹9, ODA: ₹25", // ✓
  },

  // Xpressbees (Economy)
  {
    id: 7,
    courier: "Xpressbees",
    mode: "Surface",
    minWeight: "0.5 kg",
    zoneA: { forward: "₹35", rto: "₹16" }, // +₹3, RTO:₹16 (prev.₹18 overpriced)
    zoneB: { forward: "₹45", rto: "₹21" }, // +₹3, RTO:₹21 (prev.₹23 overpriced)
    zoneC: { forward: "₹55", rto: "₹26" }, // +₹3, RTO:₹26 (prev.₹28 overpriced)
    zoneD: { forward: "₹65", rto: "₹31" }, // +₹3, RTO:₹31 (prev.₹33 overpriced)
    zoneE: { forward: "₹85", rto: "₹41" }, // +₹3, RTO:₹41 (prev.₹43 overpriced)
    codCharges: "2.5% (Min ₹12)",
    otherCharges: "Fuel: ₹5, ODA: ₹15", // ✓
  },
  {
    id: 8,
    courier: "Xpressbees",
    mode: "Air",
    minWeight: "0.5 kg",
    zoneA: { forward: "₹55", rto: "₹26" }, // +₹3, RTO:₹26 (prev.₹28 overpriced)
    zoneB: { forward: "₹65", rto: "₹31" }, // +₹3, RTO:₹31 (prev.₹33 overpriced)
    zoneC: { forward: "₹75", rto: "₹36" }, // +₹3, RTO:₹36 (prev.₹38 overpriced)
    zoneD: { forward: "₹85", rto: "₹41" }, // +₹3, RTO:₹41 (prev.₹43 overpriced)
    zoneE: { forward: "₹115", rto: "₹56" }, // +₹3, RTO:₹56 (prev.₹58 overpriced)
    codCharges: "2.5% (Min ₹12)",
    otherCharges: "Fuel: ₹8, ODA: ₹22", // ✓
  },

  // Ecom Express (Economy)
  {
    id: 9,
    courier: "Ecom Express",
    mode: "Surface",
    minWeight: "0.5 kg",
    zoneA: { forward: "₹33", rto: "₹15" }, // +₹3, RTO:₹15 (prev.₹16 overpriced)
    zoneB: { forward: "₹43", rto: "₹20" }, // +₹3, RTO:₹20 (prev.₹22 overpriced)
    zoneC: { forward: "₹53", rto: "₹25" }, // +₹3, RTO:₹25 (prev.₹27 overpriced)
    zoneD: { forward: "₹63", rto: "₹30" }, // +₹3, RTO:₹30 (prev.₹32 overpriced)
    zoneE: { forward: "₹83", rto: "₹40" }, // +₹3, RTO:₹40 (prev.₹42 overpriced)
    codCharges: "2% (Min ₹10)",
    otherCharges: "Fuel: ₹4, ODA: ₹12", // ✓
  },
  {
    id: 10,
    courier: "Ecom Express",
    mode: "Air",
    minWeight: "0.5 kg",
    zoneA: { forward: "₹53", rto: "₹25" }, // +₹3, RTO:₹25 (prev.₹27 overpriced)
    zoneB: { forward: "₹63", rto: "₹30" }, // +₹3, RTO:₹30 (prev.₹32 overpriced)
    zoneC: { forward: "₹73", rto: "₹35" }, // +₹3, RTO:₹35 (prev.₹37 overpriced)
    zoneD: { forward: "₹83", rto: "₹40" }, // +₹3, RTO:₹40 (prev.₹42 overpriced)
    zoneE: { forward: "₹113", rto: "₹55" }, // +₹3, RTO:₹55 (prev.₹57 overpriced)
    codCharges: "2% (Min ₹10)",
    otherCharges: "Fuel: ₹7, ODA: ₹20", // ✓
  },

  // Shadowfax (Hyper-Local Specialist)
  {
    id: 11,
    courier: "Shadowfax",
    mode: "Surface",
    minWeight: "0.5 kg",
    zoneA: { forward: "₹30", rto: "₹14" }, // +₹2, RTO:₹14 (prev.₹15 overpriced)
    zoneB: { forward: "₹40", rto: "₹19" }, // +₹2, RTO:₹19 (prev.₹21 overpriced)
    zoneC: { forward: "₹50", rto: "₹24" }, // +₹2, RTO:₹24 (prev.₹26 overpriced)
    zoneD: { forward: "₹60", rto: "₹29" }, // +₹2, RTO:₹29 (prev.₹31 overpriced)
    zoneE: { forward: "₹80", rto: "₹39" }, // +₹2, RTO:₹39 (prev.₹41 overpriced)
    codCharges: "2.5% (Min ₹8)",
    otherCharges: "Fuel: ₹3, ODA: ₹10", // ✓
  },
  // ADDED MISSING SHADOWFAX AIR SERVICE
  {
    id: 11.1,
    courier: "Shadowfax",
    mode: "Air",
    minWeight: "0.5 kg",
    zoneA: { forward: "₹50", rto: "₹24" },
    zoneB: { forward: "₹60", rto: "₹29" },
    zoneC: { forward: "₹70", rto: "₹34" },
    zoneD: { forward: "₹80", rto: "₹39" },
    zoneE: { forward: "₹110", rto: "₹54" },
    codCharges: "2.5% (Min ₹8)",
    otherCharges: "Fuel: ₹6, ODA: ₹18",
  },

  // Ekart (Flipkart Subsidiary)
  {
    id: 12,
    courier: "Ekart",
    mode: "Surface",
    minWeight: "0.5 kg",
    zoneA: { forward: "₹36", rto: "₹18" }, // +₹3, RTO:₹18 (prev.₹19 overpriced)
    zoneB: { forward: "₹46", rto: "₹23" }, // +₹3, RTO:₹23 (prev.₹24 overpriced)
    zoneC: { forward: "₹56", rto: "₹28" }, // +₹3, RTO:₹28 (prev.₹29 overpriced)
    zoneD: { forward: "₹66", rto: "₹33" }, // +₹3, RTO:₹33 (prev.₹34 overpriced)
    zoneE: { forward: "₹86", rto: "₹43" }, // +₹3, RTO:₹43 (prev.₹44 overpriced)
    codCharges: "2% (Min ₹15)",
    otherCharges: "Fuel: ₹5, ODA: ₹16", // ✓
  },

  // FedEx (Int'l Premium)
  {
    id: 13,
    courier: "FedEx",
    mode: "Air",
    minWeight: "0.5 kg",
    zoneA: { forward: "₹88", rto: "₹44" }, // +₹3, RTO:₹44 (prev.₹45 overpriced)
    zoneB: { forward: "₹98", rto: "₹49" }, // +₹3, RTO:₹49 (prev.₹50 overpriced)
    zoneC: { forward: "₹108", rto: "₹54" }, // +₹3, RTO:₹54 (prev.₹55 overpriced)
    zoneD: { forward: "₹118", rto: "₹59" }, // +₹3, RTO:₹59 (prev.₹60 overpriced)
    zoneE: { forward: "₹148", rto: "₹74" }, // +₹3, RTO:₹74 (prev.₹75 overpriced)
    codCharges: "3% (Min ₹30)",
    otherCharges: "Fuel: ₹15, ODA: ₹40", // ✓
  },

  // DHL (Int'l Premium+)
  {
    id: 14,
    courier: "DHL",
    mode: "Air",
    minWeight: "0.5 kg",
    zoneA: { forward: "₹93", rto: "₹46" }, // +₹3, RTO:₹46 (prev.₹48 overpriced)
    zoneB: { forward: "₹103", rto: "₹51" }, // +₹3, RTO:₹51 (prev.₹53 overpriced)
    zoneC: { forward: "₹113", rto: "₹56" }, // +₹3, RTO:₹56 (prev.₹58 overpriced)
    zoneD: { forward: "₹123", rto: "₹61" }, // +₹3, RTO:₹61 (prev.₹63 overpriced)
    zoneE: { forward: "₹153", rto: "₹76" }, // +₹3, RTO:₹76 (prev.₹78 overpriced)
    codCharges: "3% (Min ₹35)",
    otherCharges: "Fuel: ₹18, ODA: ₹45", // ✓
  },
];

const RateCard = () => {
  document.title = "Courier Rate Card";
  return (
    <section className="flex gap-6">
      <Sidebar />
      <div className="min-h-screen bg-gradient-to-br  w-[90%] m-[auto] from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
        <div className="max-w-full mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Courier Rate Card
              </h1>
              <p className="text-lg text-gray-600">
                Comprehensive shipping rates across all zones and courier
                partners
              </p>
            </div>
          </div>

          {/* Rate Table */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1400px]">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <th className="px-4 py-4 text-left font-semibold text-sm border-r border-blue-500">
                      Couriers
                    </th>
                    <th className="px-4 py-4 text-center font-semibold text-sm border-r border-blue-500">
                      Mode
                    </th>
                    <th className="px-4 py-4 text-center font-semibold text-sm border-r border-blue-500">
                      Min. Weight
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-sm border-r border-blue-500">
                      <div className="text-center">
                        <div className="font-bold text-sm mb-1">Zone A</div>
                        <div className="text-xs opacity-90 mb-2">
                          Within City
                        </div>
                        <div className="flex justify-center gap-4 text-xs">
                          <span>Forward</span>
                          <span className="text-blue-200">|</span>
                          <span>RTO</span>
                        </div>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-sm border-r border-blue-500">
                      <div className="text-center">
                        <div className="font-bold text-sm mb-1">Zone B</div>
                        <div className="text-xs opacity-90 mb-2">
                          Within State
                        </div>
                        <div className="flex justify-center gap-4 text-xs">
                          <span>Forward</span>
                          <span className="text-blue-200">|</span>
                          <span>RTO</span>
                        </div>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-sm border-r border-blue-500">
                      <div className="text-center">
                        <div className="font-bold text-sm mb-1">Zone C</div>
                        <div className="text-xs opacity-90 mb-2">
                          Metro to Metro
                        </div>
                        <div className="flex justify-center gap-4 text-xs">
                          <span>Forward</span>
                          <span className="text-blue-200">|</span>
                          <span>RTO</span>
                        </div>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-sm border-r border-blue-500">
                      <div className="text-center">
                        <div className="font-bold text-sm mb-1">Zone D</div>
                        <div className="text-xs opacity-90 mb-2">
                          Rest of India
                        </div>
                        <div className="flex justify-center gap-4 text-xs">
                          <span>Forward</span>
                          <span className="text-blue-200">|</span>
                          <span>RTO</span>
                        </div>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-sm border-r border-blue-500">
                      <div className="text-center">
                        <div className="font-bold text-sm mb-1">Zone E</div>
                        <div className="text-xs opacity-90 mb-2">
                          Special Destination
                        </div>
                        <div className="flex justify-center gap-4 text-xs">
                          <span>Forward</span>
                          <span className="text-blue-200">|</span>
                          <span>RTO</span>
                        </div>
                      </div>
                    </th>
                    <th className="px-4 py-4 text-center font-semibold text-sm border-r border-blue-500">
                      <div className="text-center">
                        <div className="text-sm">COD Charges/</div>
                        <div className="text-sm">COD%</div>
                      </div>
                    </th>
                    <th className="px-4 py-4 text-center font-semibold text-sm">
                      Other Charges
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {courierData.map((courier, index) => (
                    <tr
                      key={courier.id}
                      className={`hover:bg-blue-50 transition-colors duration-200 ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <td className="px-4 py-4 border-r border-gray-200">
                        <div className="font-semibold text-gray-900 text-sm">
                          {courier.courier}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center border-r border-gray-200">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            courier.mode === "Air"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {courier.mode}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center text-sm text-gray-700 border-r border-gray-200">
                        {courier.minWeight}
                      </td>
                      <td className="px-6 py-4 text-center border-r border-gray-200">
                        <div className="flex justify-center items-center gap-3">
                          <span className="font-semibold text-green-700 text-sm">
                            {courier.zoneA.forward}
                          </span>
                          <span className="text-gray-400">|</span>
                          <span className="font-semibold text-red-600 text-sm">
                            {courier.zoneA.rto}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center border-r border-gray-200">
                        <div className="flex justify-center items-center gap-3">
                          <span className="font-semibold text-green-700 text-sm">
                            {courier.zoneB.forward}
                          </span>
                          <span className="text-gray-400">|</span>
                          <span className="font-semibold text-red-600 text-sm">
                            {courier.zoneB.rto}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center border-r border-gray-200">
                        <div className="flex justify-center items-center gap-3">
                          <span className="font-semibold text-green-700 text-sm">
                            {courier.zoneC.forward}
                          </span>
                          <span className="text-gray-400">|</span>
                          <span className="font-semibold text-red-600 text-sm">
                            {courier.zoneC.rto}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center border-r border-gray-200">
                        <div className="flex justify-center items-center gap-3">
                          <span className="font-semibold text-green-700 text-sm">
                            {courier.zoneD.forward}
                          </span>
                          <span className="text-gray-400">|</span>
                          <span className="font-semibold text-red-600 text-sm">
                            {courier.zoneD.rto}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center border-r border-gray-200">
                        <div className="flex justify-center items-center gap-3">
                          <span className="font-semibold text-green-700 text-sm">
                            {courier.zoneE.forward}
                          </span>
                          <span className="text-gray-400">|</span>
                          <span className="font-semibold text-red-600 text-sm">
                            {courier.zoneE.rto}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center text-sm text-gray-700 border-r border-gray-200">
                        <div className="bg-yellow-50 px-2 py-1 rounded text-xs font-medium text-yellow-800">
                          {courier.codCharges}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center text-xs text-gray-600">
                        <div className="bg-gray-50 px-2 py-1 rounded">
                          {courier.otherCharges}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer Note */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mt-8">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">Note:</span> All rates are in
                Indian Rupees (₹) and subject to change. Additional charges may
                apply based on package dimensions and special handling
                requirements.
              </p>
              <div className="flex justify-center items-center gap-8 mt-4 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-600 rounded"></div>
                  <span>Forward Charges</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-600 rounded"></div>
                  <span>RTO Charges</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded"></div>
                  <span>Air Mode</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-600 rounded"></div>
                  <span>Surface Mode</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RateCard;
