class AmazonListScraperFetcher {
  async getWishlistItems({ wishlistId }) {
    let items = [];
    const uri = `https://cors-anywhere.herokuapp.com/http://www.justinscarpetti.com/projects/amazon-wish-lister/api/?id=${wishlistId}`;
    const response = await fetch(uri);
    const json = await response.json();
    items = Array.from(json || []);
    const results = items.map(i => ({
      id: i.link,
      uri: i.link,
      name: i.name,
      price: ""
    }));
    console.log(uri, items, results);
    return results;

    // [
    //   {
    //     "title": "A Programmer's Introduction to Mathematics",
    //     "price": 31.5,
    //     "productId": "1727125452",
    //     "link": "https://amzn.com/dp/1727125452/?coliid=I3DQBGU3GMOTJ5&colid=11A3M56RENLVO&psc=0&ref_=lv_vv_lig_dp_it"
    //   },
    //   {
    //     "title": "Don't Panic: Douglas Adams & The Hitchhiker's Guide to the Galaxy",
    //     "price": 9.99,
    //     "productId": "B07HY7YH7R",
    //     "link": "https://amzn.com/dp/B07HY7YH7R/?coliid=I177RR9FCH3DHK&colid=11A3M56RENLVO&psc=0&ref_=lv_vv_lig_dp_it"
    //   }
    // ]
  }
}
export default AmazonListScraperFetcher;
