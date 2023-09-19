
//User type afer fetch from --> GetPlayerSummaries: "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/"
export type SteamUserData = {
    steamid: string;
    communityvisibilitystate: number;
    profilestate: number;
    personaname: string;
    profileurl: string;
    avatar: string;
    avatarmedium: string;
    avatarfull: string;
    avatarhash: string;
    lastlogoff: number;
    personastate: number;
    realname: string;
    primaryclanid: string;
    timecreated: number;
    personastateflags: number;
    loccountrycode: string;
  };
  
export interface SteamItemData {
    success: boolean;
    average_price: string;
    median_price: string;
    amount_sold: string;
    standard_deviation: string;
    lowest_price: string;
    highest_price: string;
    first_sale_date: string;
    time: string;
    icon: string;
    currency: string;
  }
  
  
  
  