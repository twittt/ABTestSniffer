


# A/B Test Sniffer

This tool runs a little headless browser on a list of ecommerce sites leveraging VWO to try to identify the tests they are running. 

## Setup Instructions

`npm install puppeteer`

`npx ts-node sniffer.ts`

### Prerequisites

- Node
- npm

### Steps

1. Clone the repository:
    ```sh
    git clone https://github.com/twittt/ABTestSniffer.git
    cd ABTestSniffer
    ```


## Usage

`npx ts-node sniffer.ts` to run the program


## A Little More About my Thought Process

I spent a good about of time trying to understand what is happening under the hood here. I woudl say the majority of the tiem I spent on this project was to unserstand how these kinds of A/B tests are implemented and what it means to listed for the response of those scripting calls. 

Ultimately, I ran out of time and wan't able to fully wrangle the regex to produce valid JSON but it's close and when pasted into a validator that formats it (I like this one: https://jsonchecker.com/), I think it provides helpful insight into what's going on. I also tried to build a web interfact but the delay was causing chaos. If you don't see this until next week I might very well have built it by then. 

## Roadmap
- I would love to see this actually structure the data since there really is so much there
- Building a web interface (I wrote the one below but couldn't get it to work ultimately) tso we can just enter a list of URLs would be cool

![Screenshot 2025-02-27 at 2 48 51 PM](https://github.com/user-attachments/assets/fe2980e5-30c2-424c-a4b6-3a4520908d66)
