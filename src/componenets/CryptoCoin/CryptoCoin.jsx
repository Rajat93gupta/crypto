import axios from "axios";
import React, { useEffect, useState } from "react";

const CryptoCoin = () => {
  const [search, setSearch] = useState("");
  const [crypto, setCrypto] = useState([]);
  const [loading, setLoading] = useState(false); 
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const FetchData = async () => {
      try {
        setLoading(true);
        const resp = await axios.get("https://openapiv1.coinstats.app/coins", {
          headers: {
            "X-API-KEY": apiKey,
          },
        });

        setCrypto(resp.data.result);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    FetchData();
  }, [apiKey]);

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      {/* Header + Search */}
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="underline text-2xl font-bold text-gray-800 mb-4">
          All Cryptocurrencies
        </h1>
        <input
          type="text"
          placeholder="Search coin..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-md shadow-sm w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 shadow-lg rounded-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 text-left">Rank</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Symbol</th>
                <th className="p-3 text-left">Market Cap</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Available Supply</th>
                <th className="p-3 text-left">Volume (24h)</th>
              </tr>
            </thead>
            <tbody>
              {crypto
                .filter((val) =>
                  val.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((val) => (
                  <tr
                    key={val.id}
                    className="hover:bg-gray-100 transition-colors"
                  >
                    <td className="p-3">{val.rank}</td>
                    <td className="p-3 flex items-center gap-2">
                      <a
                        href={val.websiteUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={val.icon}
                          alt="logo"
                          className="w-6 h-6 rounded-full"
                        />
                      </a>
                      <span className="font-medium">{val.name}</span>
                    </td>
                    <td className="p-3">{val.symbol}</td>
                    <td className="p-3">₹{val.marketCap.toLocaleString()}</td>
                    <td className="p-3">₹{val.price.toFixed(2)}</td>
                    <td className="p-3">{val.availableSupply.toLocaleString()}</td>
                    <td className="p-3">{val.volume.toLocaleString()}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CryptoCoin;
