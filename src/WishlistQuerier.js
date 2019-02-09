class WishlistQuerier {
  async start({ wishlistId, onItemQueried, onFinished }) {
    // get the wishlist items
    const items = await this.getWishlistItems({ wishlistId });
    // loop through each one
    for (let i = 0; i < items.length; i++) {
      // then look up on Amazon
      const itemData = items[i];
      // I assume screen scraping will be involved, and we'll have to throttle
      const queryResult = await this.queryUnlimitedStatus(itemData);
      // as it's processed emit an event if it's determined to be unlimited or not
      onItemQueried(queryResult);
    }
    onFinished();
  }
  async getWishlistItems({ wishlistId }) {
    const items = [{ asin: 1 }, { asin: 2 }, { asin: 3 }, { asin: 4 }];
    console.log("getWishlistItems", wishlistId, items);
    return items;
  }
  async queryUnlimitedStatus(itemData) {
    const result = { raw: itemData, hasKindleUnlimited: false };
    result.name = `item ${itemData.asin}`;
    result.uri = `https://amazon.com/${itemData.asin}`;
    result.asin = itemData.asin;
    if (itemData.asin % 2 === 0) {
      result.hasKindleUnlimited = true;
    }
    return result;
  }
}
export default WishlistQuerier;
