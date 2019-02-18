# Summary

This is an attempt to check which books on a wishlist are also eligible for Amazon Prime Unlimited.

It doesn't work very well, and probably never will. :( This is, of course, very disappointing. Amazon doesn't currently provide APIs for wishlists, nor for Kindle Unlimited, and the existing ways around it are problematic. The wishlist parsers I've found are unreliable at best, and having to scrape each product page individually is slow and prone to blockage from Amazon. I spent a considerable amount of time getting to those conclusions, and don't wish to spend any more.

This was a fun project anyway, and it occasionally works, so feel free to give it a go. Just don't get your hopes up. ;)

# Building & Running

It was built with Node 11.9, using React 16.8.1, with yarn as the package manager. These instructions assume a Unix-based shell.

- Clone the repository

```bash
git clone https://github.com/alexcpendleton/kindle-unlimited-wishlist.git
cd kindle-unlimited wishlist
```

- And run it:

```
yarn install
yarn start -o
```

- Find your wishlist ID from its URL and enter it in the textbox (your wishlist must be public or shared)
- Push the button and hope for the best! If there are no results, or it doesn't get all your items, try it again a few times. Once it finds items it takes a while to check each individually.
