import axios from "axios";

const url = "https://covid19.mathdro.id/api"; //url of the api where the data is being fetched from

export const fetchData = async (country) => {
  let changeableUrl = url;

  if (country) {
    changeableUrl = `${url}/countries/${country}`; //fetch data by the specified country
  }

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate }, //destructuring for the data i want to fetch from the api
    } = await axios.get(changeableUrl);

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    return error;
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);

    return data.map(({ confirmed, deaths, reportDate: date }) => ({
      //report by date
      confirmed: confirmed.total,
      deaths: deaths.total,
      date,
    }));
  } catch (error) {
    return error;
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name); //fetch by country name
  } catch (error) {
    return error;
  }
};
