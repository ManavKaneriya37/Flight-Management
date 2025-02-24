const { getJson } = require("serpapi");

module.exports.fetchFlightsData = async (
  departure_id,
  arrival_id,
  outbound_date,
  return_date
) => {
    return new Promise((resolve, reject) => {
        getJson(
            {
              engine: "google_flights",
              api_key: process.env.SERPAPI_API_KEY,
              departure_id,
              arrival_id,
              outbound_date,
              return_date,
              currency: "USD",
              hl: "en",
            },
            (data) => {
              resolve(data);
            }
          );
    });
};
