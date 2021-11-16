# internship

To do:

 * Move `nft/`, `collection/` & `admin/` to `app/` folder as `index.html`, `collection.html` & `admin.html`
 * Move `loadWeb3()`, `loadContract()` and other shared functions to its own JS file, imported by all others
 * Fix issues with Solidity code:
  * The URI for all token ids point all to the same metadata URI https://gateway.pinata.cloud/ipfs/QmWimcL9J1cyJ1nVn5Kb8rfGexT5NNVL2K5ZpfgH74aprG
  * I guess the contract should return https://gateway.pinata.cloud/ipfs/QmWimcL9J1cyJ1nVn5Kb8rfGexT5NNVL2K5ZpfgH74aprG/{id}.json (the /{id}.json is missing)
  * Then, the json files should be numbered hexadecimal. E.g. the metadata json file for token id 10 should be named …000a.json instead of …0010.json (which would normally be the metadata for token id 16 if the metadata were correct).
  * The metadata for the ‘Rare’ token id 42 should point to the rare image R_06.png but points to the ‘Uncommon’ image U_06.png (see https://gateway.pinata.cloud/ipfs/QmWimcL9J1cyJ1nVn5Kb8rfGexT5NNVL2K5ZpfgH74aprG/0000000000000000000000000000000000000000000000000000000000000042.json). The uncommon one is actually the token id 16.
  * The token id’s 52 and 77 contain the same metadata pointing to the C_19 image (Common #19). All other token Id’s point to different images. Is that correct that token id 52 and 77 are both Common #19?

