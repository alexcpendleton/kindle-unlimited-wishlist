import AmazonListScraperFetcher from "./amazonListScraperFetcher";

class WishlistQuerier {
  constructor() {
    this.itemFetcher = new AmazonListScraperFetcher();
  }
  async start({ wishlistId, onItemQueried, onFinished, onWishlistRetrieved }) {
    // get the wishlist items
    const items = await this.getWishlistItems({ wishlistId });

    onWishlistRetrieved(items);

    // loop through each one
    for (let i = 0; i < items.length; i++) {
      // then look up on Amazon
      const itemData = items[i];
      await this.sleep(1000);
      // I assume screen scraping will be involved, and we'll have to throttle
      const queryResult = await this.queryUnlimitedStatus(itemData);
      // as it's processed emit an event if it's determined to be unlimited or not
      onItemQueried(queryResult);
    }
    onFinished();
  }
  async getWishlistItems({ wishlistId }) {
    return this.itemFetcher.getWishlistItems({ wishlistId });
  }
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async queryUnlimitedStatus(itemData) {
    const result = { ...itemData, hasKindleUnlimited: false };
    // result.name = `item ${itemData.id}`;
    // result.uri = `https://amazon.com/${itemData.id}`;
    // result.id = itemData.id;

    // if (itemData.id % 2 === 0) {
    //   result.hasKindleUnlimited = true;
    // }
    const amazonPageUri = `https://cors-anywhere.herokuapp.com/${result.uri}`;
    const response = await fetch(amazonPageUri);
    const body = await response.text();
    if (body.indexOf(`id="tmm-ku-upsell"`) > -1) {
      result.hasKindleUnlimited = true;
    }
    return result;
  }
}
export default WishlistQuerier;
