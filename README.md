# Todo

- Caching system
  - use the file system to cache the results of every request
  - possibly use express middleware
  - repeatedly opening and closing files might be expensive
  - implement a cache hierarchy using memory and the file system
  - use a simple caching algorithm; LFU or LRU
  - use primary cache to store either the result, or the opened file handles of the results
  - *NOTE*: possibling look into Reddis

