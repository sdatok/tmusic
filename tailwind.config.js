import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import lineClamp from '@tailwindcss/line-clamp';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'midnight': '#121212',
                'spotifygray': '#373a3d',
                'tmu': '#1e1e1e',
            }
        },

    },
    plugins: [forms, lineClamp],
};


// module.exports = {
//     content: ["./src/**/*.{js,jsx,ts,tsx}"],
//     theme: {
//         extend: {
//             colors: {
//                 white: "#fff",
//                 gainsboro: "#dfdcdc",
//                 black: "#000",
//                 darkslategray: "#353434",
//                 silver: "#c2bfbf",
//             },
//             spacing: {},
//             fontFamily: {
//                 "nunito-sans": "'Nunito Sans'",
//                 inter: "Inter",
//             },
//         },
//         fontSize: {
//             base: "16px",
//             xs: "12px",
//             xl: "20px",
//             inherit: "inherit",
//         },
//     },
//     corePlugins: {
//         preflight: false,
//     },
// };
