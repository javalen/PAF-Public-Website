// was set to below for storybook but broke on render
// const tokens = {

module.exports = {
colors: {
        // LIGHT MODE
        //Main background colors
        backgroundPrimary: "#FAFAFA",
        backgroundSecondary: "#FFFFFF",
       
       
        //Misc background colors
        backgroundTertiary: "#F5F5F5",
        backgroundHover: "#1890FF1A",
        backgroundSelected: "#1890FF08",
        backgroundSea: "#E6FFFB",
        backgroundExpandable: "#FFFFFF",


        //Main text colors
        textPrimary: "#141414",
        textSecondary: "#595959",
        textTertiary: "#8c8c8c",
        textSelected: "#0050B3",

        //Main border colors
        borderPrimary: "#F0F0F0",
        borderSecondary: "#D9D9D9",

        //Main braind colors
        brandPrimary: "#0050B3",
        brandSecondary: "#1890FF",
        brandTertiary: "#002766",
      
        //Tags States
        textTagTrue: "#0A553E",
        textTagFalse: "#A8071A",
        textTagWarning: "#8A3C00",
        backgroundTagTrue: "#EAFDF4",
        backgroundTagFalse: "#FFF1F0",
        backgroundTagBlue: "#E6F7FF",
        backgroundTagWarning: "#FFFBE6",
        borderTagTrue: "#9BF1C8",
        borderTagFalse: "#FFA39E",
        colorError: "#EF4444",
        colorSuccess: "#11AE74",
        colorSun: "#F59E0B",

        //Misc colors
        brandTertiary: "#002766",
        colorHilight: "#F4FFA3",
        textLogoTitle: "#003A8C",
        textLogoSub: "#1890FF",
        colorDisabled: "#D9D9D9",
        colorSea: "#13C2C2",
        colorForest: "#0A553E",


        // DARK MODE 
        //Main background colors darkmode
        "backgroundPrimary-dark": "#000000",
        "backgroundSecondary-dark": "#1F1F1F",
   


        //Misc background colors darkmode
        "backgroundTertiary-dark": "#0F0F0F",
        "backgroundExpandable-dark": "#141414",
        "backgroundHover-dark": "#1890FF1A",
        "backgroundSelected-dark": "#1890FF08",


        //Main text colors darkmode
        "textPrimary-dark": "#F5F5F5",
        "textSecondary-dark": "#BFBFBF",
        "colorDisabled-dark": "#8c8c8c",
        "textSelected-dark": "#FFFFFF",

        //Main border colors darkmode
        "borderPrimary-dark": "#262626",
        "borderSecondary-dark": "#595959",
        // "borderSecondary-dark": "#262626",
        
        
        //Main braind colors -dark
        "brandPrimary-dark": "#FFFFFF",  
        "brandSecondary-dark": "#69C0FF",
        "brandTertiary-dark": "#E6F7FF",

        //Misc colors -dark
        "textLogoTitle-dark": "#FFFFFF",
        "textLogoSub-dark": "#69C0FF",
        "colorDisabled-dark": "#8c8c8c",
        "textTagFalse-dark": "#BFBFBF",
        "colorHilight-dark": "rgba(244, 255, 163, 0.8)", // 40% opacity



    },
    
    // // Add typography section with tracking defaults
    // typography: {
    //     // Letter spacing (tracking) defaults
    //     tracking: {
    //         tighter: "-0.05em",
    //         tight: "-0.025em", 
    //         normal: "0em",
    //         wide: "0.025em",
    //         wider: "0.05em",
    //         widest: "0.1em"
    //     },
        
    //     // Font family defaults
    //     fontFamily: {
    //         roboto: ["Roboto", "sans-serif"],
    //         mulish: ["Mulish", "sans-serif"]
    //     }
    // }
};
// export default tokens;

// Add typography tokens for Storybook docs and component usage come back to this as need to confirm works on render
// module.exports.typography = {
//     // Letter spacing (tracking) defaults
//     tracking: {
//         tighter: "-0.05em",
//         tight: "-0.025em",
//         normal: "0em",
//         wide: "0.025em",
//         wider: "0.05em",
//         widest: "0.1em",
//     },
//     // Font family defaults
//     fontFamily: {
//         roboto: ["Roboto", "sans-serif"],
//         mulish: ["Mulish", "sans-serif"],
//     },
// };

// // Provide ESM-compatible default export for Vite/Storybook
// module.exports.default = module.exports;