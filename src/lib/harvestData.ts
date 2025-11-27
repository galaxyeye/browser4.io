export interface HarvestSummary {
    pagesVisited: number;
    dataGroups: number;
    totalFields: number;
    currentGroup: number;
    fieldsInGroup: number;
    targetRegion: string;
}

export interface HarvestRow {
    id: number;
    url: string;
    urlText: string;
    title: string;
    byLabel?: string;
    brand?: string;
    stars?: string;
    ratings?: string;
    divider?: string;
    questions?: string;
    fees?: string;
    otherSellers?: string;
    price?: string;
    note?: string;
}

export const harvestSummary: HarvestSummary = {
    pagesVisited: 120,
    dataGroups: 8,
    totalFields: 142,
    currentGroup: 2,
    fieldsInGroup: 10,
    targetRegion: '#centerCol'
};

export const harvestRows: HarvestRow[] = [
    {
        id: 1,
        url: 'https://www.amazon.com/BLACK-DECKER-Stainless-Multi-Cooker-PR100/dp/B01LZZA5S4/ref=sr_1_24?qid=1577342483&s=kitchen&sr=1-24',
        urlText: 'Amazon.com: BLACK+DECKER 6 quart 11-in-1 Cooking Pot, Stainless Steel, Pressure Cooker, Slow Cooker, Multi-Cooker, PR100',
        title: 'BLACK+DECKER 6 quart 11-in-1 Cooking Pot, Stainless Steel, Pressure Cooker, Slow Cooker, Multi-Cooker, PR100',
        byLabel: 'by',
        brand: 'BLACK+DECKER',
        stars: '4.2 out of 5 stars',
        ratings: '129 ratings',
        divider: '|',
        questions: '89 answered questions',
        fees: 'No import fees deposit + CNY 40.72 shipping to Hong Kong',
        otherSellers: 'New (5) from',
        price: 'CNY 54.17'
    },
    {
        id: 2,
        url: 'https://www.amazon.com/BLACK-DECKER-Stainless-Multi-Cooker-PR100/dp/B01LZZA5S4/ref=sr_1_24?qid=1577370142&s=kitchen&sr=1-24',
        urlText: 'Amazon.com: BLACK+DECKER 6 quart 11-in-1 Cooking Pot, Stainless Steel, Pressure Cooker, Slow Cooker, Multi-Cooker, PR100',
        title: 'BLACK+DECKER 6 quart 11-in-1 Cooking Pot, Stainless Steel, Pressure Cooker, Slow Cooker, Multi-Cooker, PR100',
        byLabel: 'by',
        brand: 'BLACK+DECKER',
        stars: '4.2 out of 5 stars',
        ratings: '129 ratings',
        divider: '|',
        questions: '89 answered questions',
        fees: 'No import fees deposit + CNY 40.72 shipping to Hong Kong',
        otherSellers: 'New (5) from',
        price: 'CNY 54.17'
    },
    {
        id: 3,
        url: 'https://www.amazon.com/Crock-Pot-Multi-Use-Programmable-Stainless-SCCPPC600-V1/dp/B074PHL51Y/ref=sr_1_21?qid=1577343218&s=kitchen&sr=1-21',
        urlText: 'Amazon.com: Crock Pot 6 Quart 8 in 1 Multi Use Express Crock Programmable Pressure Cooker, Slow Cooker, Sauté & Steamer | Stainless Steel (SCCPPC600 V1)',
        title: 'Crock Pot 6 Quart 8 in 1 Multi Use Express Crock Programmable Pressure Cooker, Slow Cooker, Sauté & Steamer | Stainless Steel (SCCPPC600 V1)',
        byLabel: 'by',
        brand: 'Crockpot',
        stars: '4.2 out of 5 stars',
        ratings: '2,086 ratings',
        divider: '|',
        questions: '670 answered questions',
        fees: 'There is a newer model of this item:',
        otherSellers: 'New (31) from',
        price: 'CNY 74.79'
    },
    {
        id: 4,
        url: 'https://www.amazon.com/Crockpot-SCCPCT600-B-Thermoshield-Cooker-Quart/dp/B07CS96DXS/ref=sr_1_28?qid=1577343218&s=kitchen&sr=1-28',
        urlText: 'Amazon.com: Crockpot Thermoshield 6 Quart Manual Slow Cooker, Black',
        title: 'Crockpot Thermoshield 6 Quart Manual Slow Cooker, Black',
        byLabel: 'by',
        brand: 'Crockpot',
        stars: '4.1 out of 5 stars',
        ratings: '150 ratings',
        divider: '|',
        questions: '47 answered questions',
        fees: 'No import fees deposit + CNY 47.40 shipping to Hong Kong',
        otherSellers: 'New & Used (12) from',
        price: 'CNY 59.99'
    },
    {
        id: 5,
        url: 'https://www.amazon.com/GoWISE-USA-GW22637-4th-Generation-measuring/dp/B01LVZY19H/ref=sr_1_32?qid=1577342483&s=kitchen&sr=1-32',
        urlText: 'Amazon.com: GoWISE USA GW22637 4th-Generation Electric Pressure Cooker with rice scooper, and measuring cup, 14 QT',
        title: 'GoWISE USA GW22637 4th-Generation Electric Pressure Cooker with rice scooper, and measuring cup, 14 QT',
        byLabel: 'by',
        brand: 'GoWISE USA',
        stars: '3.9 out of 5 stars',
        ratings: '927 ratings',
        divider: '|',
        questions: '498 answered questions',
        fees: 'No import fees deposit + CNY 70.96 shipping to Hong Kong',
        otherSellers: 'New & Used (4) from',
        price: 'CNY 113.18'
    },
    {
        id: 6,
        url: 'https://www.amazon.com/GoWISE-USA-GW22637-4th-Generation-measuring/dp/B01LVZY19H/ref=sr_1_32?qid=1577343218&s=kitchen&sr=1-32',
        urlText: 'Amazon.com: GoWISE USA GW22637 4th-Generation Electric Pressure Cooker with rice scooper, and measuring cup, 14 QT',
        title: 'GoWISE USA GW22637 4th-Generation Electric Pressure Cooker with rice scooper, and measuring cup, 14 QT',
        byLabel: 'by',
        brand: 'GoWISE USA',
        stars: '3.9 out of 5 stars',
        ratings: '927 ratings',
        divider: '|',
        questions: '498 answered questions',
        fees: 'No import fees deposit + CNY 70.96 shipping to Hong Kong',
        otherSellers: 'New & Used (4) from',
        price: 'CNY 113.18'
    },
    {
        id: 7,
        url: 'https://www.amazon.com/GoWISE-USA-GW22637-4th-Generation-measuring/dp/B01LVZY19H/ref=sr_1_32?qid=1577353748&s=kitchen&sr=1-32',
        urlText: 'Amazon.com: GoWISE USA GW22637 4th-Generation Electric Pressure Cooker with rice scooper, and measuring cup, 14 QT',
        title: 'GoWISE USA GW22637 4th-Generation Electric Pressure Cooker with rice scooper, and measuring cup, 14 QT',
        byLabel: 'by',
        brand: 'GoWISE USA',
        stars: '3.9 out of 5 stars',
        ratings: '927 ratings',
        divider: '|',
        questions: '498 answered questions',
        fees: 'No import fees deposit + CNY 70.96 shipping to Hong Kong',
        otherSellers: 'New & Used (4) from',
        price: 'CNY 113.18'
    },
    {
        id: 8,
        url: 'https://www.amazon.com/Gourmia-Multi-Mode-SmartPot-Removable-Automatic/dp/B07KJQKB22/ref=sr_1_20?qid=1577341334&s=kitchen&sr=1-20',
        urlText: 'Amazon.com: Gourmia GPC400 4 Qt Digital Multi-Mode SmartPot Pressure Cooker - 13 Cook Modes - Removable Pot - 24-Hour Delay Timer - Automatic Keep Warm - LCD Display - Pressure Sensor Lid Lock - Recipe Book',
        title: 'Gourmia GPC400 4 Qt Digital Multi-Mode SmartPot Pressure Cooker',
        byLabel: 'by',
        brand: 'Gourmia',
        stars: '4.2 out of 5 stars',
        ratings: '363 ratings',
        divider: '|',
        questions: '171 answered questions',
        fees: 'No import fees deposit + CNY 31.80 shipping to Hong Kong'
    },
    {
        id: 9,
        url: 'https://www.amazon.com/Mealthy-MultiPot-Programmable-Pressure-Stainless/dp/B076QJNK8G/ref=sr_1_26?qid=1577370142&s=kitchen&sr=1-26',
        urlText: 'Amazon.com: Mealthy MultiPot 9-in-1 Programmable Pressure Cooker 6 Quarts with Stainless Steel Pot, Steamer Basket, instant access to recipe app. Pressure cook, slow cook, sauté, rice cooker, yogurt, steam',
        title: 'Mealthy MultiPot 9-in-1 Programmable Pressure Cooker 6 Quarts',
        byLabel: 'by',
        brand: 'Mealthy',
        stars: '4.7 out of 5 stars',
        ratings: '1,593 ratings',
        divider: '|',
        questions: '934 answered questions',
        otherSellers: 'New & Used (3) from',
        price: 'CNY 169.99'
    },
    {
        id: 10,
        url: 'https://www.amazon.com/Ninja-Instant-1000-Watt-Pressure-PC101/dp/B07FDNBSNT/ref=sr_1_23?qid=1577371163&s=kitchen&sr=1-23',
        urlText: 'Amazon.com: Ninja Instant, 1000-Watt Pressure, Slow, Multi Cooker, and Steamer with 6-Quart Ceramic Coated Pot & Steam Rack (PC101), Black/Silver',
        title: 'Ninja Instant, 1000-Watt Pressure, Slow, Multi Cooker, and Steamer with 6-Quart Ceramic Coated Pot & Steam Rack (PC101), Black/Silver',
        byLabel: 'by',
        brand: 'Ninja',
        stars: '4.7 out of 5 stars',
        ratings: '120 ratings',
        divider: '|',
        questions: '65 answered questions',
        fees: 'This product is available as Renewed.',
        otherSellers: 'New & Used (11) from',
        price: 'CNY 54.95'
    },
    {
        id: 11,
        url: 'https://www.amazon.com/Power-Pressure-Cooker-XL-10/dp/B01BVV07KO/ref=sr_1_25?qid=1577371163&s=kitchen&sr=1-25',
        urlText: 'Amazon.com: Power Pressure Cooker XL 10 Qt',
        title: 'Power Pressure Cooker XL 10 Qt',
        byLabel: 'by',
        brand: 'Power Pressure Cooker XL',
        stars: '4.1 out of 5 stars',
        ratings: '2,977 ratings',
        divider: '|',
        questions: '1000+ answered questions',
        fees: 'No import fees deposit + CNY 51.68 shipping to Hong Kong',
        otherSellers: 'New & Used (6) from',
        price: 'CNY 159.00'
    },
    {
        id: 12,
        url: 'https://www.amazon.com/Presto-02141-Electric-Pressure-Stainless/dp/B01LZZ4WOK/ref=sr_1_29?qid=1577341334&s=kitchen&sr=1-29',
        urlText: 'Amazon.com: Presto 02141 6-Quart Electric Pressure Cooker, Stainless, Black, Silver',
        title: 'Presto 02141 6-Quart Electric Pressure Cooker, Stainless, Black, Silver',
        byLabel: 'by',
        brand: 'Presto',
        stars: '4.2 out of 5 stars',
        ratings: '54 ratings',
        divider: '|',
        questions: '17 answered questions',
        fees: 'No import fees deposit + CNY 38.45 shipping to Hong Kong',
        otherSellers: 'New & Used (33) from',
        price: 'CNY 59.99'
    }
];

