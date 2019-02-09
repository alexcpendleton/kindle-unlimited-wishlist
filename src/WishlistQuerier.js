import AmazonListScraperFetcher from "./amazonListScraperFetcher";

class WishlistQuerier {
  constructor() {
    this.itemFetcher = new AmazonListScraperFetcher();
    this.sleepMilliseconds = 500;
  }
  async start({ wishlistId, onItemQueried, onFinished, onWishlistRetrieved }) {
    // get the wishlist items
    const items = await this.getWishlistItems({ wishlistId });

    onWishlistRetrieved(items);

    // loop through each one
    for (let i = 0; i < items.length; i++) {
      // then look up on Amazon
      const itemData = items[i];
      await this.sleep();
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
  sleep(ms = this.sleepMilliseconds) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async queryUnlimitedStatus(itemData) {
    const result = { ...itemData, hasKindleUnlimited: false };
    const amazonPageUri = `https://oasis-plane.glitch.me/?productUri=${
      result.uri
    }`;
    const response = await fetch(amazonPageUri);
    const body = await response.json();
    if (body) {
      result.hasKindleUnlimited = body.hasKindleUnlimited;
    }
    return result;
  }
}
export default WishlistQuerier;
