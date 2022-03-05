# Polka

Easy P2P Uncensorable File Sharing

## Setup

```bash
$ npm install -g polka
```

## About
Polka creates a `polka` file on your desktop. When you run `polka seed` everything inside this file is sharable with the hash that gets printed on the screen. Share that with anyone and they can run `polka read <hash>` to view that file. They can then save it and seed it for the rest of the network.

This works completely without any servers. Everyone that runs the software shares the files between each other, with no middlemen! It cannot be shut down. Once you have received the file from someone it's on your computer, no one can take it down. It operates similar to BitTorrent, just easier to use and made for smaller file sharing.

Currently, this is basically a wrapper around IPFS that makes it a bit easier to use. Long term, I have many more ideas, see below. 

This is super new (so is IPFS) so expect bugs. 

## Available commands

For list of all available commands please run from your command line:

```bash
$ polka

Commands:	
  polka seed      	Starts seeding the `polka` folder on your desktop
  polka read <frequency>     View the file at that hash
```


## Future Plans
I want to make a fully P2P social network / browser / file sharer. I'm still figuring it out. Join our Discord to help build it out. 

Some ideas:

* Mobile app (app store, but also open source)
* Decentralized P2P Pub Sub
* Desktop app
* P2P specific optimizations. It's a very under explored space

## License
Do what you want