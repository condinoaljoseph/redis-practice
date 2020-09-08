# Redis Caching Practice

Node + Redis Fundamentals of Caching (Includes installing secure redis on Ubuntu 18.04)
You can visit this [link](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-18-04) for the whole installation process I just made it to practice creating **.md** files.

## Installation

### Step 1: Installing and Configuring Redis

Update local apt package and install redis using

`sudo apt update sudo apt install redis-server`

Open this file
`sudo nano /etc/redis/redis.conf`

Find `supervised` and set it to systemmd since you are running Ubuntu which uses the systemd init system

`supervised systemd`

## Node JS Setup

### Step 1: Generate and Install packages

Generate package.json without asked any questions
`npm init -y`

Install Express, Redis, and node-fetch. You can also use dotenv for your password config if you set password to your redis and the `server.js` has syntax on how to connect to client with password auth on your redis.

`npm i express node-fetch redis dotenv`

### Step 2: Create server.js and run it to your api debugger

I'm tired typing this just clone it then `npm install` arggghhh...
