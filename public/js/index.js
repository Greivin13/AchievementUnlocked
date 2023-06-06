// function GetPlayerSummaries() {
//   return new Promise(function (resolve, reject) {
//     $.ajax({
//       url: "/steamData",
//       type: "GET",
//       dataType: "json",
//       success: function (data) {
//         console.log("GetPlayerSummaries success");
//         displayPlayerSummary(data);
//         // $("#testDiv").html(JSON.stringify(data));
//         // insert data into handlebars template
//         // res.render("profile", { data: data });
//         resolve(data);
//         return data;
//       },
//       error: function (err) {
//         reject(err);
//       },
//     });
//   });
// }

// async function displayPlayerSummary(data) {
//   router.get("/", (req, res) => {
//     res.render("homepage", data);
//   });
// }

// const thisPlayerSummary = GetPlayerSummaries(async (data) => {
//   const api_url = "/steamData";
//   const response = await fetch(api_url);
//   const playerData = await response.json();
//   console.log(playerData);
// });

// app.get("/steamData", async (request, response) => {
//   console.log(req.params);
//   const queryUrl = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.steamkey}&steamids=${process.env.rinSteam64ID}`;
//   const fetch_response = await fetch(queryUrl);
//   const playerData = await fetch_response.json();
//   response.json(playerData);
//   // console.log(res.json(playerData));
//   // res.render("homepage", playerData);
// });
