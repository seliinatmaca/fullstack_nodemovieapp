const fs = require("fs");

const getRequest = (req, res) => {
  //console.log(req.url);

  // const url = "/api/movies/5";
  // const id1 = "5";

  //! url sonund a ki id değerini değişkene aktar
  const id = req.url.split("/")[3];
  console.log(id);

  //! url temel adresini değişkene aktar(sonda ki param dışarısında kalan)
  const path = req.url.substring(0, 11);
  console.log(path);

  // temel url'e istek atılırsa bütün filmleri gönder
  if (req.url === "/api/movies") {
    //! 1)json dosyasından filmleri al
    const movies = fs.readFileSync("./data/movies.json", "utf-8");

    //! 2) clienta cevap gönder
    // return res.end("Bütün filmler");
    return res.end(movies);
  }

  // yola id eklenirse bir filmi gönder
  if (path === "/api/movies" && id) {
    //! 1)json dosyasından filmleri al
    const data = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

    //! 2)url'de ki id'ye karşılık gelen elemanı dizide ara
    const movie = data.find((i) => i.id === id);

    //! 3) eğer ki film bulunursa clienta gönder
    if (movie) {
      return res.end(JSON.stringify(movie));
    }

    //! 4) eğer film bulunmazsa hata gönder

    //res.statusCode = 404;

    res.writeHead(404);

    return res.end(JSON.stringify({ message: "Aranılan film bulunamadı" }));
  }

  // yol yanlışsa hata gönder
  res.writeHead(404);
  return res.end(JSON.stringify({ message: "Yol bulunamadı" }));
};

module.exports = getRequest;
