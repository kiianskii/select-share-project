import axios from "axios";

const form = document.querySelector("form")!;
const input = document.getElementById("address")! as HTMLInputElement;

// declare var google: any;

type ApiResTypes = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

function searchHandler(e: Event) {
  e.preventDefault();
  const userAddress = input.value;
  axios
    .get<ApiResTypes>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        userAddress
      )}&key=${API_KEY}`
    )
    .then((res) => {
      if (res.data.status !== "OK") {
        throw new Error("Could not fetch location");
      }
      const coordinates = res.data.results[0].geometry.location;
      const map = new google.maps.Map(document.getElementById("map")!, {
        center: coordinates,
        zoom: 12,
      });
      new google.maps.Marker({ position: coordinates, map: map });
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });
}

form.addEventListener("submit", searchHandler);
