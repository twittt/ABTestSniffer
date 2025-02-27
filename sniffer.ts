import puppeteer from 'puppeteer';

const urls = [
    "https://www.anker.com/",
    "https://www.tonal.com/",
    "https://www.rugsusa.com/",
    "https://www.humnutrition.com/",
    "https://www.bragg.com/",
    "https://flyingtiger.com/",
    "https://vessi.com/",
    "https://wineracksamerica.com/",
    "https://onecountry.com/",
    "https://www.amway.com/",
    "https://www.allstate.com/",
    "https://www.egnyte.com/",
    "https://www.browserstack.com/",
    "https://www.agoda.com/",
    "https://www.decathlon.com/",
    "https://www.giii.com/",
    "https://us.eastpak.com/",
    "https://www.carrier.com/",
    "https://www.claytonhomes.com/",
    "https://www.blueair.com/",
    "https://www.equinox.com/",
    "https://www.emerson.com/",
    "https://arvato.com/",
    "https://www.cigna.com/",
    "https://www.disneyholidays.com/",
    "https://www.ubisoft.com/",
    "https://www.wmg.com/",
    "https://www.jagex.com/",
    "https://cxl.com/",
];

async function monitorVWO(url: string) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const responses:string[] = []
    await page.setRequestInterception(true);
    page.on('request', request => {
        const requestUrl = request.url();
        if (requestUrl.includes('visualwebsiteoptimizer.com')) {
            console.log(`VWO Request URL: ${requestUrl}`);
        }
        request.continue();
    });

    page.on('response', async response => {
        
        const responseUrl = response.url();
        if (responseUrl.includes('visualwebsiteoptimizer.com')) {
            // console.log(`VWO Response URL: ${responseUrl}`);
            const responseBody = await response.text();
            // console.log(`VWO Response Body: ${responseBody}`);
            const cleanString = parseVWOResponse(responseBody);
            responses.push(cleanString)
        }
    });

    try {
        await page.goto(url, { waitUntil: 'networkidle2' });
        console.log(`Visited ${url}`);
    } catch (error) {
        console.error(`Failed to visit ${url}:`, error);
    }

    await browser.close();
    return responses;
}

function parseVWOResponse(responseBody: string): string {
    const regex = /window\.VWO\.push\(\['updateSettings',(.*?)\]\);/s;
    const match = responseBody.match(regex);
    if (match) {
        const settingsStr = match[1];
        const cleanedSettingsStr = settingsStr
            .replace(/([{,]\s*)([a-zA-Z_]\w*)(\s*:)/g, '$1"$2"$3') // Add quotes around keys
            .replace(/:\s*([0-9.]+)([,\}\]])/g, ': $1$2') // Leave numbers as numbers
            .replace(/:\s*(true|false)([,\}\]])/g, ': $1$2') // Leave booleans as booleans
            .replace(/:\s*\[([^\]]*)\]/g, ': [$1]') // Leave arrays as arrays
            .replace(/,\s*([\}\]])/g, '$1') // Remove trailing commas
            .replace(/'/g, '"'); // Replace single quotes with double quotes
        return cleanedSettingsStr

    }
    return "No Matches Found";
}

async function main() {
    for (const url of urls) {
        const responses = await monitorVWO(url);
        console.log(`Aggregated Responses: ${responses}`)
    }
}

main().catch(console.error);
